import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { ReducerState } from '../redux/types';

export default (history: History) =>
  combineReducers<ReducerState>({
    router: connectRouter(history),
  });
