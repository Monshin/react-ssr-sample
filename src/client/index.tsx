import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ConnectedRouter } from 'connected-react-router';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import StylesProvider from '@material-ui/styles/StylesProvider';
import createGenerateClassName from '@material-ui/styles/createGenerateClassName';

import createMyTheme from './styles/createMyTheme';
import configureStore from './redux/configureStore';
import App from './containers/App.component';

import './styles/icon.css';
import './styles/button.css';
import './styles/style.css';

const { hostname } = window.location;
if (hostname.startsWith('www')) {
  document.domain = hostname.replace('www.', '');
} else {
  document.domain = hostname;
}

const theme = createMyTheme();
const generateClassName = createGenerateClassName({
  disableGlobal: _CONFIG_.IS_PRODUCTION,
  productionPrefix: 'c',
});

const { store, history } = configureStore();

hydrate(
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HelmetProvider>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </HelmetProvider>
      </Provider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('myRoot'),
);
