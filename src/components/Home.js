import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router'
import {fetchJobAppsAction} from '../actions'
import WithAuth from '../wrappers/WithAuth'

class Home extends React.Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    if(this.props.user.id) {
      this.props.fetchJobAppsAction(this.props.user.id)
      .then(res => console.log("in home props", this.props))
    }
  }

  render() {

      this.props.fetchJobAppsAction(this.props.user.id)
      .then(res => console.log("in home props", this.props))

    return (
      <div>
        Home
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    job_apps: state.job_apps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchJobAppsAction}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(Home)))
