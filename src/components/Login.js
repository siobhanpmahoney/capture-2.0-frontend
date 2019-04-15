import React from 'react'
import {login_user} from '../services/api_calls'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
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
    login_user({username: this.state.username, password: this.state.password}).then(response => console.log(response))
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

export default Login
