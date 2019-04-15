import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => {
              return <Home />
            }} />

          <Route exact path='/login' render={() => {
              return <Login />
            }} />


      </Switch>
    </div>
  );
}
}

export default App;
