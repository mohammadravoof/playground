const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "url required"});
    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({id: shortId});
}

async function handleRedirectURL(req,res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: { timestamp: Date.now() } ,
            },
        }
    );
    res.redirect(entry.redirectURL);
}

async function handleAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = { handleGenerateNewURL, handleRedirectURL, handleAnalytics };