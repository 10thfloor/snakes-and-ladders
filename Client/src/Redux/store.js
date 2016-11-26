import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  registerForm,
  loginForm,
  authData,
  application,
  snakeListPage
} from './reducers';

export default createStore(
  combineReducers({
    application,
    snakeListPage,
    authData,
    registerForm,
    loginForm
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
