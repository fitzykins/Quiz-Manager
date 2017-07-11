import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../actions';



class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch(getUser(this.props.match.params.userId));
  }

  render () {
      return (
        <h3>{this.props.username}</h3>
      )
    }
  }

const mapStateToProps= state =>({
  username: state.username
});

export default connect(mapStateToProps)(UserPage);
