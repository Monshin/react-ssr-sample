// 修改此檔案(config.ts)者 修改完請重新編譯此檔 -> config.js
// yarn compile:config

type EnvStringType = 'debug' | 'production';
type EnvDicObjectType = { [propName in EnvStringType]: string };

const getConfig = () => {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV ? (process.env.NODE_ENV as EnvStringType) : 'debug',
  };

  if (!['debug', 'production'].includes(envVars.NODE_ENV)) {
    throw new Error('Config validation error');
  }

  const API_URL: EnvDicObjectType = {
    debug: 'http://192.168.2.203:8080',
    production: 'https://app.bc3ts.net',
  };

  const SHARE_DOMAIN: EnvDicObjectType = {
    debug: '192.168.2.203:8100',
    production: 'www.example.com',
  };

  const SHARE_PROTOCOL: EnvDicObjectType = {
    debug: 'http',
    production: 'https',
  };

  const isProduction = envVars.NODE_ENV === 'production';

  const domainUrl = isProduction ? ['.example.com'] : ['192.168.2.203', 'localhost'];

  const externalsScripts = isProduction
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
    SHARE_URL: `${SHARE_PROTOCOL[envVars.NODE_ENV]}://${SHARE_DOMAIN[envVars.NODE_ENV]}`,
    DOMAIN_URL: domainUrl,
    EXTERNALS_SCRIPTS: externalsScripts,
  };
};

const config = getConfig();

export default config;
