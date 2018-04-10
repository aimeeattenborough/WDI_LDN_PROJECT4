import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';
import Filestack from '../images/Filestack';

import css from '../../assets/scss/components/registration-form.scss';


class Register extends React.Component {

  state = {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value}, () => console.log(this.state));
  }

  handleSubmitRegister = (e) => {
  // prevent default behaviour
  // make a post request to /api/register
  // send the form data
  e.preventDefault();
  axios.post('/api/register', this.state) // this.state is the form data, we are storing the form data in state
    // the response has the user, token and message. We need to put it in local storage.
    .then(res => {
      Auth.setToken(res.data.token);
      User.setUser(res.data.user);
    })
    .then(() => this.props.history.push('/images'));
}
  onSuccess = (result) => {
    console.log('result', result);
    const results = Object.assign({}, this.state, { profilePicture: result.filesUploaded[0].url});
    console.log('results', results);
    this.setState({ profilePicture: results.profilePicture }, () => console.log(this.state));
}

  loginPageRedirect = () => {
    this.props.history.push('/login');
  }

    render() {
      return (
// REGISTER
      <div className="registration-form">
        <form onSubmit={this.handleSubmitRegister}>
            <div className="field">
              <label htmlFor="username">Username</label>
              <input className="input"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
              />
            </div>
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
            <div className="field">
              <label htmlFor="passwordConfirmation">Password Confirmation</label>
              <input
                type="password"
                className="input"
                placeholder="Password Confirmation"
                name="passwordConfirmation"
                onChange={this.handleChange}
              />
            </div>
            <Filestack onSuccess={this.onSuccess} />

            <button className="button is-primary">Submit</button>
            <p>Already have an account?<a onClick={this.loginPageRedirect}> Login here</a> </p>
          </form>
        </div>
    );
  }
}

export default Register;
