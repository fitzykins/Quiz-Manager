import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';



class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.match.params.userId));
  }

  render () {
    console.log(this.props);
      return (
        <h3>{this.props.userName}</h3>
      )
    }
  }

const mapStateToProps= state =>({
  id: state.id,
  userName: state.userName,
  quizzes: state.quizzes
});

export default connect(mapStateToProps)(UserPage);
