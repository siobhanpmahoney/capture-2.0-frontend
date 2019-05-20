import React from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom'
import {loginUserAction, setTokenAction, fetchCurrentUserAction} from '../actions'

import ls from 'local-storage'



export default function (WrappedComponent) {
  class NoAuth extends React.Component {

    componentWillMount() {
       if (ls.get('jwt_token') && !this.props.user.id) {
        this.props.fetchCurrentUserAction(ls.get('jwt_token'))
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.user.id) {
        this.props.history.push('/');
      }
    }

    // render() {
    //   return <WrappedComponent {...this.props} />;
    // }

    render() {
      if (ls.get('jwt_token') && !this.props.user.id) {
       this.props.fetchCurrentUserAction(ls.get('jwt_token'))
     }

     if (!ls.get('jwt_token')) {
       return <WrappedComponent {...this.props} />
     }
    //  if (ls.get('jwt_token') && !!this.props.user.id) {
    //     return (
    //       <Redirect to="/" />
    //     )
    //   } else {
    //     return (
    //       <WrappedComponent {...this.props} />
    //     )
    //   }
    // }
  }

  function mapStateToProps(state) {
    return {
      user: state.user,
    }
  }

  return withRouter(connect(mapStateToProps, {fetchCurrentUserAction})(NoAuth));
}
