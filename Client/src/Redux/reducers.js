import {
  UPDATE_LOGIN_FORM,
  UPDATE_REGISTER_FORM,
  AUTH_ERROR,
  AUTH_DONE,
  START_LOADING_APP,
  DONE_LOADING_APP,
  START_FETCHING,
  DONE_FETCHING,
  GOT_SNAKES,
  RESET_SNAKES
} from './actions';

// TODO: remove non auth related reducer code.

const initialLoginFormState = {
  email: '',
  password: ''
}

const initialRegisterFormState = {
  email: '',
  password: ''
}

const initalAuthState = {
  authenticated: false,
  authError: false
}

const initialApplicationState = {
  loading: true,
  fetching: false
}

export function loginForm(state = initialLoginFormState, action) {
  switch(action.type) {
    case UPDATE_LOGIN_FORM:
      const { email, password } = action.formData;
      if(email) return {...state, email };
      if(password) return {...state, password };
    break;
    default:
      return state;
  }
}

export function registerForm(state = initialRegisterFormState, action) {
  switch(action.type) {
    case UPDATE_REGISTER_FORM:
      const { email, password } = action.formData;
      if(email) return {...state, email };
      if(password) return {...state, password };
    break;
    default:
      return state;
  }
}

export function authData(state = initalAuthState, action) {
  switch(action.type) {
    case AUTH_DONE:
      return {...state, authenticated: true, authError: false };
    case AUTH_ERROR:
      return {...state, authenticated: false, authError: true }
    default:
      return state;
  }
}

export function application(state = initialApplicationState, action) {
  switch(action.type) {
    case START_LOADING_APP:
      return {...state, loading: true }
    break;
    case DONE_LOADING_APP:
      return {...state, loading: false }
    break;
    case START_FETCHING:
      return {...state, fetching: true }
    break;
    case DONE_FETCHING:
      return {...state, fetching: false }
    break;
    default:
      return state;
  }
}

export function snakeListPage(state = { snakes: [] }, action) {
  switch(action.type) {
    case GOT_SNAKES:
      const { snakes } = action;
      return {...state, snakes };
    case RESET_SNAKES:
      return {...state, snakes: [] }
    default:
      return state;
  }
}

