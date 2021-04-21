"use strict";
// 修改此檔案(config.ts)者 修改完請重新編譯此檔 -> config.js
// yarn compile:config
exports.__esModule = true;
var getConfig = function () {
    var envVars = {
        NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'debug'
    };
    if (!['debug', 'production'].includes(envVars.NODE_ENV)) {
        throw new Error('Config validation error');
    }
    var API_URL = {
        debug: 'http://192.168.2.203:8080',
        production: 'https://app.bc3ts.net'
    };
    var SHARE_DOMAIN = {
        debug: '192.168.2.203:8100',
        production: 'www.example.com'
    };
    var SHARE_PROTOCOL = {
        debug: 'http',
        production: 'https'
    };
    var isProduction = envVars.NODE_ENV === 'production';
    var domainUrl = isProduction ? ['.example.com'] : ['192.168.2.203', 'localhost'];
    var externalsScripts = isProduction
        ? [
            '<script crossorigin src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>',
            '<script crossorigin src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>',
        ]
        : [
            '<script crossorigin src="https://unpkg.com/react@17.0.2/umd/react.development.js"></script>',
            '<script crossorigin src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js"></script>',
        ];
    return {
        PROJECT_NAME: 'react-ssr-sample',
        ENV: envVars.NODE_ENV,
        IS_PRODUCTION: isProduction,
        VERSION: '1.0.0',
        PORT: 8100,
        HOST: '0.0.0.0',
        SITE_NAME: 'React_SSR_Sample',
        API_URL: API_URL[envVars.NODE_ENV],
        SHARE_DOMAIN: SHARE_DOMAIN[envVars.NODE_ENV],
        SHARE_URL: SHARE_PROTOCOL[envVars.NODE_ENV] + "://" + SHARE_DOMAIN[envVars.NODE_ENV],
        DOMAIN_URL: domainUrl,
        EXTERNALS_SCRIPTS: externalsScripts
    };
};
var config = getConfig();
exports["default"] = config;
