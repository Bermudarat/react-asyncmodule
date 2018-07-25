var LOADED = {};
var getResource = function getResource(rsName) {
    if (typeof window === 'undefined' || !window.ASSETS_CHUNKS) {
        return null;
    }
    var CSSChunks = window.ASSETS_CHUNKS;
    return CSSChunks.css[rsName];
};
var ImportCss = function ImportCss(rsName) {
    var href = getResource(rsName);
    // 不存在、已加载、在node环境
    // 返回一个resolve的Promise
    if (!href || LOADED[href] === true || typeof window === 'undefined') {
        return Promise.resolve();
    }
    LOADED[href] = true;
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = href;
    link.charset = 'utf-8';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.timeout = 20000;
    return new Promise(function (resolve, reject) {
        var timeout = void 0;
        link.onerror = function () {
            link.onerror = null;
            link.onload = null;
            clearTimeout(timeout);
            var message = 'could not load css: ' + rsName;
            reject(new Error(message));
            delete LOADED[href];
        };
        // link.onload doesn't work well enough, but this will handle it
        // since images can't load css (this is a popular fix)
        var img = document.createElement('img');
        img.onerror = function () {
            link.onerror = null;
            img.onerror = null;
            clearTimeout(timeout);
            resolve();
        };
        timeout = setTimeout(link.onerror, link.timeout);
        head.appendChild(link);
        img.src = href;
    });
};
export default ImportCss;