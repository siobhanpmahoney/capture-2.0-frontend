import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/nav/NavBar'
import SearchJobsPageContainer from './components/jobs/SearchJobsPageContainer'
import SavedJobsPageContainer from './components/jobs/SavedJobsPageContainer'
import JobItemPageContainer from './components/JobItemPageContainer'
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

          <Route exact path="/jobs/search" render={(routerProps) => {
              return <SearchJobsPageContainer history={routerProps.history} />
            }} />

          <Route path="/jobs/search?:searchParams" render={(routerProps) => {
                return <SearchJobsPageContainer searchParams={routerProps.match.params.searchParams} history={routerProps.history} />
            }} />

          <Route path="/jobs/search/:muse_id" render={(routerProps) => {
              return <JobItemPageContainer muse_id={routerProps.match.params.muse_id} type="search" history={routerProps.history} />
            }} />

          <Route exact path="/jobs/saved" render={(routerProps) => {
              return <SavedJobsPageContainer history={routerProps.history} />
            }} />

          <Route path="/jobs/saved/:id" render={(routerProps) => {
              return <JobItemPageContainer id={routerProps.match.params.id} history={routerProps.history} type="saved" />
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
