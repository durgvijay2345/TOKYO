const express = require('express');
const router = express.Router();
const contributorController = require('../controllers/contributorController');

/**
 * GET /api/contributors/:analysisId
 * Retrieves only the contributor profiles for a specific repository analysis.
 */
router.get('/:analysisId', contributorController.getContributorsByAnalysisId);

module.exports = router;
