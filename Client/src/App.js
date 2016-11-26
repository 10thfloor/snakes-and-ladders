import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import './App.css';

import LayoutComponent from './Layouts/AppLayout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import SnakesListPage from './Pages/SnakesListPage';

import store from './Redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={LayoutComponent}>
            <Route path='/' component={HomePage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={SignupPage} />
            <Route path='/snakes' component={SnakesListPage} />
            <Route path='*' component={() => <div> 404 Not Found ... </div>} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
export default App;
