import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ls from 'local-storage'
import {Redirect, withRouter} from 'react-router'
import {loginCurrentUser} from '../services/api_calls'
// import {loginUserAction,fetchCurrentUserAction} from '../actions'
import {fetchCurrentUserAction} from '../actions'

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
  // componentDidUpdate(prevProps) {
  //   if (!!this.props.auth.jwt_token) {
  //     console.log("in login")
  //     console.log("prevProps.auth.jwt_token ,", prevProps.auth.jwt_token)
  //      // return <Redirect to='/' />
  //     this.props.history.push("/")
  //   } else {
  //     console.log("no change?")
  //     console.log("this.props.auth", this.props.auth)
  //   }
  // }


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
    //.then (get user's apps)
    .then(res => {
      if (this.props.user.id) {
        return this.props.history.push("/")
      }
    })
  }

  // export function loginUserAction(login_credentials) {
  //   return (dispatch) => {
  //     return loginCurrentUser(login_credentials)
  //     .then(json => {
  //       // ls.set("jwt_token", json.jwt)
  //       // console.log(ls.get('jwt_token'))
  //       dispatch({
  //         type: SET_TOKEN,
  //         payload: json.jwt
  //       });
  //       return json.jwt;
  //     });
  //   }
  // }


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
    user: state.user,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchCurrentUserAction}, dispatch)
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoAuth(Login)))
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
