const express = require('express');
const { handleGenerateNewURL,
        handleRedirectURL,
        handleAnalytics } = require('../controllers/url');
const shortid = require('shortid');

const router = express.Router();

router.route('/').post(handleGenerateNewURL);

router.route('/:shortId').get(handleRedirectURL);

router.route('/analytics/:shortId').get(handleAnalytics)

module.exports = router;