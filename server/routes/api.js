const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Health check
router.get('/health', analysisController.checkHealth);

// Analyze a repository
router.post('/analyze', analysisController.analyzeRepository);

// Get analysis history
router.get('/history', analysisController.getHistory);

// Get a stored analysis by ID
router.get('/analysis/:id', analysisController.getAnalysisById);

// Modular sub-routes for specific analysis entities
router.use('/commits', require('./commits'));
router.use('/contributors', require('./contributors'));
router.use('/insights', require('./insights'));

module.exports = router;
