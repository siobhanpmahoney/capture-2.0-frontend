import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ls from 'local-storage'
import {Redirect, withRouter} from 'react-router'
import {loginCurrentUser} from '../services/api_calls'
// import {loginUserAction,fetchCurrentUserAction} from '../actions'
import {fetchCurrentUserAction,fetchJobAppsAction, fetchJobAppsAction2} from '../actions'

// import NoAuth from '../wrappers/NoAuth'


class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  //
  // componentDidMount() {
  //   if (ls.get("jwt_token")) {
  //     // return <Redirect to='/' />
  //     return this.props.history.push("/")
  //   }
  // }
  //

  componentDidMount() {
    if (ls.get('jwt_token') && !this.props.user.id) {
      this.props.fetchCurrentUserAction(ls.get('jwt_token'))
    } else if (ls.get('jwt_token') && this.props.user.id) {
      this.props.history.push("/")
    }
  }

  componentDidUpdate(prevProps) {
    if (ls.get('jwt_token') && this.props.user.id) {
      this.props.history.push("/")
    }
  }

  onInput = (event) => {
    const name = event.target.name
    const val = event.target.value
    this.setState({
      [name]: val
    })
  }

  // onSubmit = (event) => {
  //   event.preventDefault()
  //   const user_info = Object.assign({}, this.state);
  //   this.props.loginUserAction(user_info).then(jwtToken => {
  //     if (jwtToken) {
  //       ls.set('jwt_token', jwtToken)
  //       return this.props.history.push("/")
  //     }
  //   })
  // }

  onSubmit = (event) => {
    event.preventDefault()
    const user_info = Object.assign({}, this.state);
    loginCurrentUser(user_info)
    .then(response => response.jwt)
    .then(jwtToken => {
      if (jwtToken) {
        ls.set('jwt_token', jwtToken)
        return ls.get('jwt_token')
      } else {
        return window.alert('error')
      }
    })
    .then(jwt => this.props.fetchCurrentUserAction(jwt)) // returns user info
    // .then(user_id => this.props.fetchJobAppsAction(user_id)) // fetches user job data
    .then(user_id => this.props.fetchJobAppsAction2())
    .then(res => {
      if (this.props.user.id) {
        return this.props.history.push("/")
      }
    })
  }

  render() {
    if (ls.get('jwt_token') && this.props.user.id) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form>
          <input type="text" name="username" onChange={this.onInput} />
          <input type="password" name="password" onChange={this.onInput} />
          <button onClick={this.onSubmit}>click me</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchCurrentUserAction,fetchJobAppsAction, fetchJobAppsAction2}, dispatch)
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoAuth(Login)))
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
