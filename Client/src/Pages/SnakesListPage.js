import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getSnakes, gotSnakes, startFetching, doneFetching } from '../Redux/actions';

class SnakesListPage extends Component {

  componentWillMount(){
    this.props.dispatch(getSnakes());
  }

  render() {
    return (
      <div>
        { this.props.fetching ?
          <div> Getting snakes... </div> :
          <ul>
          {
            this.props.snakes.map(snake => {
              return (
                <li>
                  {snake.name } | length: {snake.length} | deadly: { snake.deadly ? 'Yes!' : 'No.' }
                </li>
              )
            })
          }
          </ul>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authData.authenticated,
    fetching: state.application.fetching,
    snakes: state.snakeListPage.snakes
  }
}

export default connect(mapStateToProps)(SnakesListPage);
