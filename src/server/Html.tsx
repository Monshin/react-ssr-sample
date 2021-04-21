import { Response } from 'express';
import { FilledContext as HelmetContext } from 'react-helmet-async';

const renderHTMLBefore = (res: Response): void => {
  res.write('<!DOCTYPE html><html lang="zh-TW"><head>');
  res.write('<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />');
  res.write('<link rel="icon" href="/favicon.ico" type="image/x-icon" />');
  res.write(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">',
  );
  res.write('<meta http-equiv="X-UA-Compatible" content="IE=edge">');
  res.write('<meta http-equiv="content-type" content="text/html; charset=utf-8">');
  res.write('<link rel="apple-touch-icon" href="/favicon.ico">');
  res.write('<link rel="manifest" href="/manifest.json" />');
};

const renderHTML = (
  res: Response,
  body: string,
  helmet: HelmetContext['helmet'],
  css: string,
  preloadedState: any,
): void => {
  res.write(helmet.title.toString());
  res.write(helmet.meta.toString());
  res.write(helmet.script.toString());
  res.write(helmet.link.toString());
  res.write(`<style id="jss-server-side">${css}</style>`);
  res.write(
    `<link async rel="stylesheet" type="text/css" href="/static/vendors.bundle.css?v=${_CONFIG_.VERSION}">`,
  );
  res.write(
    `<link async rel="stylesheet" type="text/css" href="/static/main.bundle.css?v=${_CONFIG_.VERSION}">`,
  );
  res.write(
    `<script>
      var $ = document.querySelector.bind(document);
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>`,
  );

  res.write(`</head><body><div id="myRoot">${body}</div>`);
  res.write(_CONFIG_.EXTERNALS_SCRIPTS.join(''));
  res.write(`<script async src="/static/main.bundle.js?version=${_CONFIG_.VERSION}"></script>`);
  res.write(`<script async src="/static/vendors.bundle.js?version=${_CONFIG_.VERSION}"></script>`);
  res.write(`<script async src="/static/material.bundle.js?version=${_CONFIG_.VERSION}"></script>`);
};

const renderHTMLEnd = (res: Response): void => {
  res.write('</body></html>');
  res.end();
};

export { renderHTMLBefore, renderHTML, renderHTMLEnd };
