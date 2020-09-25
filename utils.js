const dns = require('dns');

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