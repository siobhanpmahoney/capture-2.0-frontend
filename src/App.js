import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import './App.css';

class App extends Component {
  render() {
    console.log("in App")
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={(routerProps) => {
              return <Home history={routerProps.history} />
            }} />

          <Route exact path='/login' render={(routerProps) => {
              return <Login history={routerProps.history} />
            }} />


      </Switch>
    </div>
  );
}
}

export default withRouter(App);
