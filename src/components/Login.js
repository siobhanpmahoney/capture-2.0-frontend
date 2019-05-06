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
    if (!!this.props.auth.jwt_token) {
      return <Redirect to='/' />
    }
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if (!prevProps.auth.jwt_token && !!this.props.auth.jwt_token) {
       return <Redirect to='/' />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
