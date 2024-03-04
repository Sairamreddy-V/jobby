import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isShowErrorMsg: false}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    console.log(userDetails)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onApiSuccess(data.jwt_token)
    } else {
      this.failureApi(data.error_msg)
    }
  }

  onApiSuccess = token => {
    Cookies.set('token', `${token}`, {expires: 30})
    const {history} = this.props
    history.replace('/')
    this.setState({isShowErrorMsg: false})
  }

  failureApi = msg => {
    console.log(msg)
    this.setState({
      isShowErrorMsg: true,
      errorMsg: msg,
      username: '',
      password: '',
    })
  }

  render() {
    const {username, password, errorMsg, isShowErrorMsg} = this.state
    const token = Cookies.get('token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <form className="login-card-container" onSubmit={this.onSubmitDetails}>
          <img
            className="login-website-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <div className="input-container">
            <label className="login-label-element" htmlFor="username-input">
              USERNAME
            </label>
            <input
              className="input"
              id="username-input"
              onChange={this.onUsernameChange}
              value={username}
              type="text"
              placeholder="username"
            />
          </div>
          <div className="input-container">
            <label className="login-label-element" htmlFor="password-input">
              PASSWORD
            </label>
            <input
              id="password-input"
              className="input"
              onChange={this.onPasswordChange}
              value={password}
              type="password"
              placeholder="password"
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {isShowErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
