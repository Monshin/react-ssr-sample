import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory, createMemoryHistory } from 'history';

import rootReducer from './reducers';
import rootEpic from './epics';

export default function configureStore(initialState: any = {}, fromServer = false) {
  const epicMiddleware = createEpicMiddleware();

  let history;
  let composeEnhancers;
  if (fromServer) {
    history = createMemoryHistory();
    composeEnhancers = compose;
  } else {
    history = createBrowserHistory();
    composeEnhancers = _CONFIG_.IS_PRODUCTION
      ? compose
      : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    initialState = window.__PRELOADED_STATE__;

    delete window.__PRELOADED_STATE__;
  }

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return { store, history };
}
