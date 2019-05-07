import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {Redirect, withRouter} from 'react-router'
import {loginUserAction, setTokenAction, fetchCurrentUserAction} from '../actions'

export default function (WrappedComponent) {
  class WithAuth extends React.Component {

    // constructor(props) {
    //   super(props)
    // }

    componentDidMount() {
      console.log(this.props)
      if (!!this.props.auth.jwt_token && !this.props.user.id) {
        console.log("in if statement")
       this.props.fetchCurrentUserAction(this.props.auth.jwt_token)
      }
      else {
        console.log("hi")
      }
    }

    render() {
      if (!!this.props.auth.jwt_token && !!this.props.user.id) {
        return (
           <WrappedComponent {...this.props} />
        )
      } else if (!!this.props.auth.jwt_token) {
        return <div>loading...</div>
      } else {
        return (
          <Redirect to="/login" />
        )
      }
    }

  }

function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.auth
  }
}


  return connect(mapStateToProps, {fetchCurrentUserAction})(WithAuth)
}
