import React from 'react'
import {loginUserAction} from '../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    console.log("mounted?")
    if (!!this.props.auth.jwt_token) {
      // return <Redirect to='/' />
      return this.props.history.push("/")
    }
  }

  componentDidUpdate(prevProps) {
    if (!!this.props.auth.jwt_token) {
      console.log("in login")
      console.log("prevProps.auth.jwt_token ,", prevProps.auth.jwt_token)
       // return <Redirect to='/' />
      this.props.history.push("/")
    } else {
      console.log("no change?")
      console.log("this.props.auth", this.props.auth)
    }
  }

  onInput = (event) => {
    const name = event.target.name
    const val = event.target.value
    this.setState({
      [name]: val
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const user_info = Object.assign({}, this.state)
    this.props.loginUserAction(user_info)
  }


  render() {
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
  return bindActionCreators({loginUserAction}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
