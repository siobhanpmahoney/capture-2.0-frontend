import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router'
import {loginUserAction} from '../actions'
import withAuth from '../wrappers/WithAuth'

class Home extends React.Component {

  constructor(props) {
    super(props)

  }
  render() {
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
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loginUserAction}, dispatch)
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Home))
