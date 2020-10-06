const express = require('express');
const utils = require('./utils');
const axios = require('axios').default;
const psl = require('psl');


const router = express.Router();

router.post('/', async (req, res) => {
    var results;
    var responseCode;
    var ipAddr;
    var responseTime;
    var screenshotURL;

    const {site} = req.body;

    try {
        const domain = psl.parse(utils.extractHostname(site)).domain;

        try {
            const start = new Date();
            const getSite = await axios.get(`https://${domain}`,{timeout: 10000});
            responseTime = new Date() - start;
            screenshotURL = await utils.getScreenshot(domain, true);
            results = 'Up';
            responseCode = getSite.status;
            ipAddr = await utils.lookupPromise(domain);
        }catch(err) {
            try {
                const start = new Date();
                const getSite = await axios.get(`http://${domain}`,{timeout: 10000});
                responseTime = new Date() - start;
                screenshotURL = await utils.getScreenshot(domain, true);
                results = 'Up';
                responseCode = getSite.status;
                ipAddr = await utils.lookupPromise(domain);
            } catch (err) {
                console.log(err);
                results = 'Down';
                if(err.response){
                    responseCode = err.response.status;
                }
            }
        }

        res.json({domain, site_status: results, response_code: responseCode, ip_address: ipAddr, response_time: responseTime, screenshotURL});
    } catch(err) {
        console.log('Unable to extract hostname');
        res.json({domain: null, site_status: results, response_code: responseCode, ip_address: ipAddr, response_time: responseTime, screenshotURL});
    }
});

module.exports = router;
