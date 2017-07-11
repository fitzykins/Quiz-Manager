import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../actions';



class AdminPage extends Component {
  componentDidMount() {
    this.props.dispatch(getUser(this.props.match.params.adminId));
  }

  render () {
      return (
        <h3>{this.props.admin}</h3>
      )
    }
  }

const mapStateToProps= state =>({
  admin: state.username
});

export default connect(mapStateToProps)(AdminPage);
