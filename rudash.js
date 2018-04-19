(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.rudash = factory()
}(this, function () { 
    function hasIn(obj, prop) {

    }
    function isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }
    function isNumber(v) {
        return typeof v == 'number'
    }
    function isObject(v) {
        return typeof v == 'object'
    }
    function isString(v) {
        return typeof v == 'string'
    }
    function isUndefined(v) {
        return typeof v == 'undefined'
    }
    return {
        isArray
    }
}));