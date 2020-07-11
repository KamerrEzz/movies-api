const { config } = require('../config');

function cacheReponse(res, seconds){
    if(!config.dev){
        res.set('Cache-Control', `public, max-age=${seconds}`);
    }
}

module.exports = cacheReponse;