import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../actions';
import Login from './login';
import UserPage from './user-page';
import AdminPage from './admin-page';
import QuizPage from './quiz-page';
import AdminView from './admin-view';
import '../CSS/app.css';

class App extends Component {

  signOut(e) {
    this.props.dispatch(signOut());
  }

  render() {
    if(this.props.userId) {
      return (
        <Router>
        <div className="App">
          <header>
            <div className="logo"><Link to="/"><div className="logo"></div></Link></div>
          </header>
          <main>
            <Route exact path="/" component={Login}/>
            <Route exact path="/admin/:adminId" component={AdminPage} />
            <Route exact path="/user/:userId" component={UserPage} />
            <Route exact path="/quizzes/:quizId" component={QuizPage} />
            <Route exact path="/admin/:adminId/:userIndex" component={AdminView} />
            <div className="sign-out-button">
              <button type="submit" onClick={e => this.signOut(e)}>Sign Out</button>
            </div>
          </main>
        </div>
        </Router>
      );
    }else {
      return (
        <Router>
        <div className="App">
          <header>
            <div className="logo"><Link to="/"><div className="logo"></div></Link></div>
          </header>
          <main>
            <Route exact path="/" component={Login}/>
            <Route exact path="/admin/:adminId" component={AdminPage} />
            <Route exact path="/user/:userId" component={UserPage} />
            <Route exact path="/quizzes/:quizId" component={QuizPage} />
            <Route exact path="/admin/:adminId/:userIndex" component={AdminView} />
          </main>
        </div>
        </Router>
      );
    }

  }
}

const mapStateToProps= state =>({
  userId: state.userId,
})

export default connect(mapStateToProps)(App);
