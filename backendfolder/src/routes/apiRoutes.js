const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const newsController = require('../controllers/newsController');

router.post('/skill-gap', careerController.analyzeSkillGap);
router.post('/roadmap', careerController.getRoadmap);
router.get('/news', newsController.getNews);

module.exports = router;
