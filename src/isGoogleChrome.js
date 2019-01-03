
const getUserAgent = require('./getUserAgent');

/**
 * @param ua
 * @returns {boolean}
 *
 * If you want to make it works in node and browser then do:
 *
 * isGoogleChrome((function () {try {return staticContext.req.headers['user-agent']}catch(e){}}()))
 */
module.exports = function (ua) {

    const {
        u,l
    } = getUserAgent(ua);

    return /chrome/.test(l)
        && /chromium/.test(l)
        && l.indexOf('opr') === -1
    ;
};