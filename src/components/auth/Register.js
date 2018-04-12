import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';
import Filestack from '../images/Filestack';

import scrollTo from 'scroll-to';


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

  scrollRegistrationForm = () => {
    scrollTo(300, 900, {
      ease: 'out-bounce',
      duration: 1200
    });
  }

  render() {
    return (
    // REGISTER
      <main>
        <div className="blurb">
          <h1 className="title unsta-rev">Celebrate the Mundane</h1>
          <h1 className="title h1-reg">It’s time for the Unstagram revolution</h1>
          <p>Have you had enough of carefully curating your social feeds to make your utterly dull life look more interesting than it is? Are you tired of scrolling through beautiful people in exotic locations selling you lifestyle junk and telling you to feel #soblessed 🙏</p>

          <h1 className="title h1-reg">Be your worst self</h1>
          <p>Unstagram is a new social network that celebrates the exceptionally ordinary and the visually mediocre. It’s a place to share your most boring snaps and most uninspiring memories. No sunset vistas, beach bodies and humblebrags. Just the tediousness of existence.</p>

          <h1 className="title h1-reg">It’s hip to be square</h1>
          <p>Upvote the dull and downvote anything that looks too interesting. Paint drying 👍 An off-cut of a beige carpet in a bin 👍 A rubbish photo of Norwich, that’s all blurry 👍 </p>

          <h1 className="title h1-reg">Need some unspo?</h1>
          <p>It’s not easy being down-right mundane, so check out our unfluencers. They’ve got millions of followers and they barely know or care. No one will be hawking your artisan green tea here. They’ll show you how to make normal look unexceptional. </p>
        </div>
        <button className="button main-button" onClick={this.scrollRegistrationForm}>Join Now</button>

        <div className="testimonials">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <article className="tile is-child box review-box">
                <p className="reviews">“The most boring thing I’ve ever seen”</p>
                <p className="reviews"><i>- The New York Times</i></p>
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child box review-box">
                <p className="reviews">“Hideously dull”</p>
                <p className="reviews"><i>- The Guardian</i></p>
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child box review-box">
                <p className="reviews">“A banal waste of time”</p>
                <p className="reviews"><i>- Dazed & Confused</i></p>
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child box review-box">
                <p className="reviews">“A fascinatingly interesting site with much to explore”</p>
                <p className="reviews"><i>- Gnome Collector Monthly</i></p>
              </article>
            </div>
          </div>


        </div>

        <div className="registration-form">
          <img className="logo-form" src="../../assets/scss/images/Unstagram_logo_colour.png" />

          <form onSubmit={this.handleSubmitRegister}>
            <div className="field">
              {/* <label htmlFor="username">Username</label> */}
              <input className="input is-primary"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              {/* <label htmlFor="email">Email</label> */}
              <input
                className="input is-primary"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              {/* <label htmlFor="password">Password</label> */}
              <input
                type="password"
                className="input is-primary"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              {/* <label htmlFor="passwordConfirmation">Password Confirmation</label> */}
              <input
                type="password"
                className="input is-primary"
                placeholder="Password Confirmation"
                name="passwordConfirmation"
                onChange={this.handleChange}
              />
            </div>

            <Filestack onSuccess={this.onSuccess} />

            <div className="profile-pic">
              <img src={this.state.profilePicture} />
            </div>

            <button className="button submit">Submit</button>
            <p className="already-have-account">Already have an account?<a onClick={this.loginPageRedirect}> Login here</a> </p>
          </form>
        </div>
      </main>
    );
  }
}

export default Register;
