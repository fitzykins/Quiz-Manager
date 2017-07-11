import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './login';
import UserPage from './user-page';
import AdminPage from './admin-page';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header>
          <h1><Link to="/"> Quiz Manager</Link></h1>
        </header>
        <main>
          <Route exact path="/" component={Login}/>
          <Route exact path="/admin/:adminId" component={AdminPage} />
          <Route exact path="/user/:userId" component={UserPage} />
        </main>
      </div>
      </Router>
    );
  }
}

export default App;
