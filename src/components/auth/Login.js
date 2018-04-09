import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';

import css from '../../assets/scss/components/login-form.scss';


class Login extends React.Component {

  state = {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value}, () => console.log(this.state));
  }

handleSubmitLogin = (e) => {
  // prevent default behaviour
  // make a post request to /api/register
  // send the form data
  e.preventDefault();
  axios.post('/api/login', this.state) // this.state is the form data, we are storing the form data in state
    // the response has the user, token and message. We need to put it in local storage.
    .then(res => {
      Auth.setToken(res.data.token);
      User.setUser(res.data.user);
    })
    // .then(() => Flash.setMessage('success', 'Welcome back!'))
    .then(() => this.props.history.push('/images'));
  }

  registerPageRedirect = () => {
    this.props.history.push('/register');
  }

    render() {
      return (
// LOGIN
      <div className="login-form">
        <form onSubmit={this.handleSubmitLogin}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
          </div>

          <button className="button is-primary">Submit</button>

          <p>Don't have an account yet?<a onClick={this.registerPageRedirect}> Sign up here.</a> </p>

        </form>
      </div>
    )
  }
}

export default Login;
