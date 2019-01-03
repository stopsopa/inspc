
module.exports = function () {

    /**
     * https://www.npmjs.com/package/detect-node
     */
    return typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';
}