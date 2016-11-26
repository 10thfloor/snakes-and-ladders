import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateLoginForm, updateRegisterForm, doLogin, doRegister } from '../Redux/actions';
import { Link } from 'react-router';

class Login extends Component {

  doLogin(e){
    e.preventDefault();
    this.props.dispatch(doLogin());
  }

  render() {
    return (
      <div>
        <form id="loginform" onSubmit={this.doLogin.bind(this)}>
          <p>Login</p>
          <input type="email" onChange={(e)=> this.props.dispatch(updateLoginForm({ email: e.target.value }))}/>
          <input type="password" onChange={(e)=> this.props.dispatch(updateLoginForm({ password: e.target.value }))}/>
          <button type="submit">Login</button>
          <div><Link to="/register">Not a snake handler? Register here</Link></div>
        </form>
      </div>
    );
  }
}

class Register extends Component {

  doRegister(e) {
    e.preventDefault();
    this.props.dispatch(doRegister());
  }

  render() {
    return (
      <div>
        <form id="registerform" onSubmit={this.doRegister.bind(this)}>
          <p>Register</p>
          <input type="email" onChange={(e)=> this.props.dispatch(updateRegisterForm({ email: e.target.value }))}/>
          <input type="password" onChange={(e)=> this.props.dispatch(updateRegisterForm({ password: e.target.value }))}/>
          <button type="submit">Register</button>
          <div><Link to="/login">Already a snake handler? Login here</Link></div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.authData.authError
  }
}

export const LoginForm = connect(mapStateToProps)(Login);
export const RegisterForm = connect()(Register);

