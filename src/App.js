import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/nav/NavBar'
import JobSearchContainer from './components/jobs/JobSearchContainer'
import JobSavedContainer from './components/jobs/JobSavedContainer'
import JobDetail from './components/jobs/JobDetail'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' render={(routerProps) => {
              return <Home history={routerProps.history} />
            }} />

          <Route path="/jobs/search" render={(routerProps) => {
              return <JobSearchContainer history={routerProps.history} />
            }} />

          <Route path="/jobs/search/:museJobId" render={(routerProps) => {
              return <JobDetail museJobId={routerProps.match.params.jobId} history={routerProps.history} />
            }} />

          <Route path="/jobs/saved" render={(routerProps) => {
              return <JobSavedContainer history={routerProps.history} />
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
