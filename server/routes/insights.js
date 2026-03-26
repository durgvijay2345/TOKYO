const express = require('express');
const router = express.Router();
const insightController = require('../controllers/insightController');

/**
 * GET /api/insights/:analysisId
 * Retrieves only the generated engineering insights for a specific repository analysis.
 */
router.get('/:analysisId', insightController.getInsightsByAnalysisId);

module.exports = router;
