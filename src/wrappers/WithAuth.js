import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {Redirect, withRouter} from 'react-router'
// import {loginUserAction, setTokenAction, fetchCurrentUserAction} from '../actions'
import {fetchCurrentUserAction} from '../actions'
import ls from 'local-storage'


export default function (WrappedComponent) {
  class WithAuth extends React.Component {

    // constructor(props) {
    //   super(props)
    // }

    componentDidMount() {
       if (ls.get('jwt_token') && !this.props.user.id) {
         console.log("in if statement")
        this.props.fetchCurrentUserAction(ls.get('jwt_token'))
       }
    //   else {
    //     console.log("hi")
    //   }
    }

    render() {
      if (ls.get('jwt_token') && !!this.props.user.id) {
        return (
          <WrappedComponent {...this.props} />
        )
      } else if (ls.get('jwt_token')) {
        return <div>Loading</div>;
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
      // auth: state.auth
    }
  }


  return connect(mapStateToProps, {fetchCurrentUserAction})(WithAuth)
}
