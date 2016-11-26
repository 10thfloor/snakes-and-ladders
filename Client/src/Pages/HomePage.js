import React, {Component} from 'react';
import { Link } from 'react-router';

class HomePage extends Component {
  render() {
    return (
      <div>
        Home!
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        <h1><Link to="/snakes">Snakes...</Link></h1>
      </div>
    );
  }
}

export default HomePage;
