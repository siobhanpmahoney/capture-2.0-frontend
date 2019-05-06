import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {Redirect, withRouter} from 'react-router'
import {loginUserAction, setTokenAction, fetchCurrentUserAction} from '../actions'

const withAuth = (WrappedComponent) => {
  class WithAuth extends React.Component {

    // constructor(props) {
    //   super(props)
    // }

    componentDidMount() {

      if (!!this.props.auth.jwt_token && !this.props.user.id) {
        console.log("in if statement")
        return this,props.fetchCurrentUserAction(this,props.auth.jwt_token)
      }
      else {
        console.log("hi")
      }
    }

    render() {
      debugger
      if (!!this.props.auth.jwt_token && !!this.props.user.id) {
        return (
           <WrappedComponent {...this.props}/>
        )
      } else {
        debugger
        return (
          <Redirect to="/login" />
        )
      }
    }

  }

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUserAction: () => dispatch(fetchCurrentUserAction())
  }
  // return bindActionCreators({loginUserAction, fetchCurrentUserAction, setTokenAction}, dispatch)
}


  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
}

export default withAuth
