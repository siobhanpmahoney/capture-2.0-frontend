import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import JobSearchContainer from './components/searchJobs/JobSearchContainer'
import JobResultDetail from './components/searchJobs/JobResultDetail'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={(routerProps) => {
              return <Home history={routerProps.history} />
            }} />

          <Route path="/jobs/search" render={(routerProps) => {
                return <JobSearchContainer history={routerProps.history} />
              }} />

            <Route path="/jobs/search/:museJobId" render={(routerProps) => {
              return <JobResultDetail museJobId={routerProps.match.params.jobId} history={routerProps.history} />
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
