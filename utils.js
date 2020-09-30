const dns = require('dns');
const screenshot = require("node-server-screenshot");
const path = require('path');

exports.extractHostname = function(url) {
    var hostname;

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
}

exports.lookupPromise = async function(url){
    return new Promise((resolve, reject) => {
        dns.lookup(url, (err, address, family) => {
            if(err) reject(err);
            resolve(address);
        });
   });
};

exports.getScreenshot = async function(domain, ssl){
    return new Promise((resolve) => {
        screenshot.fromURL(`${ssl ? 'https://' : 'http://'}${domain}`, path.join(__dirname, 'screenshots', `${domain}.png`), (err) => {
            if(!err){
                resolve(`/screenshots/${domain}.png`);
            }else{
                console.log(err)
                resolve(null);
            }
        });
    });
};