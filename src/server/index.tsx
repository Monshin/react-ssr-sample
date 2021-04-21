import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { onLocationChanged } from 'connected-react-router';
import ServerStyleSheets from '@material-ui/styles/ServerStyleSheets';
import createGenerateClassName from '@material-ui/styles/createGenerateClassName';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { HelmetProvider, FilledContext as HelmetContext } from 'react-helmet-async';
import cookieParser from 'cookie-parser';

import createMyTheme from '../client/styles/createMyTheme';
import configureStore from '../client/redux/configureStore';
import App from '../client/containers/App.component';
import { renderHTMLBefore, renderHTML, renderHTMLEnd } from './Html';
import routes from './routes/index.route';

const app = express();

app.use(cors());

/**
 * Cache Time:
 *    7天 -> 604800
 *    30天 -> 2592000
 *    365天 -> 31536000
 */

// js gzip redirect
if (_CONFIG_.IS_PRODUCTION) {
  app.get('*.bundle.js', (req, res, next) => {
    req.url = req.url.replace('.bundle.js', '.bundle.js.gz');
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript; charset=utf-8');
    if (req.query.v && req.query.v === _CONFIG_.VERSION) {
      res.set('Cache-Control', 'public, max-age=2592000');
    }
    next();
  });
  app.get('*.bundle.css', (req, res, next) => {
    if (req.query.v && req.query.v === _CONFIG_.VERSION) {
      res.set('Cache-Control', 'public, max-age=2592000');
    }
    next();
  });
}

// Serve static files
app.use('/static', express.static('build'));
app.use(express.static('public'));

// 排除不存在的靜態檔案下的
app.use('/static', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(404).send('Not found');
});
app.use('/images', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(404).send('Not found');
});

// server 需特別先處理的頁面
app.use(cookieParser()).use(routes);

app.use((req, res) => {
  // set the appropriate HTTP header
  res.setHeader('Content-Type', 'text/html');
  renderHTMLBefore(res);

  try {
    // material-ui
    const theme = createMyTheme();
    const generateClassName = createGenerateClassName({
      disableGlobal: _CONFIG_.IS_PRODUCTION,
      productionPrefix: 'c',
    });
    const sheets = new ServerStyleSheets({ serverGenerateClassName: generateClassName });

    // Create a new Redux store instance
    const { store, history } = configureStore({}, true);

    // Set router to now url
    history.replace(req.url);
    store.dispatch(onLocationChanged(history.location, 'POP'));

    if (req.dispatchScheduler) {
      req.dispatchScheduler.forEach((action) => {
        store.dispatch(action);
      });
    }

    // Helmet context
    const helmetContext = {};

    // StaticRouter context
    const staticContext: any = {};

    // Render the component to a string
    // Not use react-router-redux's ConnectedRouter, because not support StaticRouterContext
    const body = renderToString(
      sheets.collect(
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <HelmetProvider context={helmetContext}>
              <StaticRouter context={staticContext} location={req.path}>
                <App />
              </StaticRouter>
            </HelmetProvider>
          </Provider>
        </ThemeProvider>,
      ),
    );

    if (staticContext.statusCode === 404) {
      res.status(404);
    }

    // Grab the CSS from our sheets.
    const css = sheets.toString();

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    // Start static helmet
    const { helmet } = helmetContext as HelmetContext;

    renderHTML(res, body, helmet, css, preloadedState);
    renderHTMLEnd(res);
  } catch (e) {
    /* eslint-disable no-console */
    console.log(req.originalUrl);
    console.log(e);
    /* eslint-enable no-console */
    res.status(500);
    res.write('<title>系統發生錯誤</title>');
    res.write(`<link rel="stylesheet" href="/static/main.bundle.css?v=${_CONFIG_.VERSION}">`);
    res.write('</head><body>');
    res.write(
      `<div class="CenterContainer">
        <div class="text-center">
          <h1 color="inherit">系統發生錯誤</h1>
        </div>
      </div>`,
    );
    renderHTMLEnd(res);
  }
});

app.listen(_CONFIG_.PORT, _CONFIG_.HOST, () => {
  // eslint-disable-next-line no-console
  console.log(
    `${_CONFIG_.PROJECT_NAME} ${_CONFIG_.ENV} start`,
    `
      Port: ${_CONFIG_.PORT}
      Version: ${_CONFIG_.VERSION}
      Domain:  ${_CONFIG_.DOMAIN_URL.join()}
      Share_Url:  ${_CONFIG_.SHARE_URL}
      API_Url: ${_CONFIG_.API_URL}
    `,
  );
});
