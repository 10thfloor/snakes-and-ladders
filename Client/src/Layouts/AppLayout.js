import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
  startLoadingApp,
  doneLoadingApp,
  authDone,
  authError
} from '../Redux/actions';

class LayoutComponent extends Component {

  componentWillMount() {
    this.props.dispatch(startLoadingApp())
      .then((response) => {
        if(response.status === 403) {
          this.props.dispatch(doneLoadingApp())
          this.props.dispatch(authError())
        } else {
          this.props.dispatch(doneLoadingApp())
          this.props.dispatch(authDone())
        }
    });
  }

  render() {
    return (
      <div>
        { this.props.loading ?
        <div>Loading ... </div> :
        <div>
          <Link to="/">Snakes!</Link>
          I am signed in? { this.props.authenticated ? 'Yes!' : 'Nope!'  }
          { this.props.children }
        </div> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authData.authenticated,
    loading: state.application.loading
  }
}

export default connect(mapStateToProps)(LayoutComponent);

