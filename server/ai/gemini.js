const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;

function initializeGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ No GEMINI_API_KEY found in .env. Falling back to heuristic analysis.');
    return false;
  }
  genAI = new GoogleGenerativeAI(apiKey);
  return true;
}

/**
 * Batches commits and sends them to Gemini for classification, impact scoring, and summary.
 * Extracted patches are truncated to fit within reasonable prompt sizes.
 */
async function analyzeCommitsBatch(commits) {
  if (!genAI && !initializeGemini()) {
    return null; // Signals failure, fallback to heuristics
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.1,
    }
  });

  // Prepare minimal data to save tokens
  const payload = commits.map(c => {
    return {
      sha: c.sha,
      message: c.commit?.message || '',
      stats: c.stats || { additions: 0, deletions: 0, total: 0 },
      files: (c.files || []).map(f => ({
        filename: f.filename,
        patch: f.patch ? f.patch.substring(0, 800) : ''  // truncate huge patches
      }))
    };
  });

  const prompt = `
You are an expert GitHub repository analyzer. I am providing you with an array of commit objects. 
Each object contains the commit 'sha', the commit 'message', overall 'stats' (additions/deletions), and the modified 'files' (filename and code patch).

Your task is to analyze each commit and return a JSON array of objects.
For each commit, you must provide EXACTLY these fields:
- "sha": The exact same SHA string from the input.
- "classification": Exactly one of ["Feature", "Bug Fix", "Refactor", "Documentation", "Other"].
- "score": A float between 0.0 and 100.0 representing the impact score of the commit. Consider the size of the diff, the complexity of the changes, and whether critical files were touched.
- "summary": A concise, human-readable 1-line summary of what the commit actually does (max 80 chars).

Analyze the following commits:
${JSON.stringify(payload, null, 2)}
`;

  try {
    console.log(`📡 Sending ${commits.length} commits to Gemini for AI analysis...`);
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Safety check parsing
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) throw new Error('Gemini did not return an array');
    
    console.log('✅ Gemini analysis complete.');
    
    // Convert array to a Map keyed by SHA for fast lookups
    const resultMap = new Map();
    for (const item of parsed) {
      if (item.sha) resultMap.set(item.sha, item);
    }
    return resultMap;
  } catch (error) {
    console.error('❌ Gemini API Error:', error.message);
    return null; // Fallback to heuristics
  }
}

module.exports = { analyzeCommitsBatch, initializeGemini };
