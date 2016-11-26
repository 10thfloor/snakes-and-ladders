// ACTIONS
export const AUTH_DONE = 'AUTH_DONE';
export const POST_LOGOUT = 'POST_LOGOUT';
export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';
export const UPDATE_REGISTER_FORM = 'UPDATE_REGISTER_FORM';
export const AUTH_ERROR = 'AUTH_ERROR';
export const START_LOADING_APP = 'START_LOADING_APP';
export const DONE_LOADING_APP = 'DONE_LOADING_APP';
export const START_FETCHING = 'START_FETCHING';
export const DONE_FETCHING = 'DONE_FETCHING';
export const GOT_SNAKES = 'GOT_SNAKES';

// ACTION CREATORS
export const authDone = () => ({ type: AUTH_DONE });
export const authError = () => ({ type: AUTH_ERROR });
export const logout = () => ({ type: POST_LOGOUT });

export const doneLoadingApp = () => ({ type: DONE_LOADING_APP });
export const updateLoginForm = (formData) => ({ type: UPDATE_LOGIN_FORM, formData});
export const updateRegisterForm = (formData) => ({ type: UPDATE_REGISTER_FORM, formData});

export const startFetching = () => ({ type: START_FETCHING });
export const doneFetching = () => ({ type: DONE_FETCHING });

export const gotSnakes = (snakes) => ({ type: GOT_SNAKES, snakes })

const postRequest = {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json;charset=UTF-8'
      })
}

const postUrls = {
  // TODO: Add this to configs.
  login: 'http://localhost:8080/auth/login',
  register: 'http://localhost:8080/auth/register'
}

// THUNKS
export const doLogin = () => {
  return function(dispatch, getState) {

    const  { email, password } = getState().loginForm;
    const body = JSON.stringify({ email, password });

    fetch(postUrls.login, {...postRequest, body})
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(authDone());
      } else {
        dispatch(authError());
      }
    });
  }
}

export const doRegister = () => {
  return function(dispatch, getState) {

    const  { email, password } = getState().registerForm;
    const body = JSON.stringify({ email, password });

    fetch(postUrls.register, {...postRequest, body})
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(authDone());
      } else {
        dispatch(authError());
      }
    });
  }
}

export const doLogout = (dispatch) => {
 // TODO: Logout.
}

export const startLoadingApp = () => {
  return function(dispatch) {
    // TODO: Extract this url into configs.
    return fetch('http://localhost:8080/auth/checktoken', {
      method: 'GET',
      credentials: 'include'
    })
  }
}

export const getSnakes = () => {
  return function(dispatch, getState) {
    dispatch(startFetching());
    // TODO: Extract this url into configs.
    fetch('http://localhost:8080/api/snakes', {
      method: 'GET',
      credentials: 'include'
    }).then(response => response.json())
      .then((snakes) => {
        dispatch(doneFetching());
        dispatch(gotSnakes(snakes));
      }, (error) => {
        dispatch(doneFetching());
    });
  }
}
