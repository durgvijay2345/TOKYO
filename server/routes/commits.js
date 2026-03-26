const express = require('express');
const router = express.Router();
const commitController = require('../controllers/commitController');

/**
 * GET /api/commits/:analysisId
 * Retrieves only the AI-analyzed commits for a specific repository analysis.
 */
router.get('/:analysisId', commitController.getCommitsByAnalysisId);

module.exports = router;
