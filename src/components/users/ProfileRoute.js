import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';
import { Link } from 'react-router-dom';

import css from '../../assets/scss/components/profile-page.scss';


class ProfileRoute extends React.Component {

  state = {
    user: '',
    currentUser: ''
  }

  componentDidMount() {
    const user = User.getUser();
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }, () => console.log('user', this.state.user)))
      .then(() => this.setState({ currentUser: user }, () => console.log('current user', this.state.currentUser)));
  }

  isCurrentUser = () => {
    const user = User.getUser();
    return user && user._id === this.state.user._id;
  }

  followUser = () => {
    console.log('follow...');
    // get the current user
    const user = User.getUser();
    // push user to follow's ID into the current user's following array
    if(user.following.includes(this.state.user._id)) return false;
    user.following.push(this.state.user._id);
    // make a put request to /api/users/:id with the current user data
    axios.put(`/api/users/${user._id}`, user)
      .then(res => User.setUser(res.data))
      .then(() => this.setState({ currentUser: User.getUser() }));

    // set the user with User.setUser again

    // change the button to unfollow...
  }

  unfollowUser = () => {
    // get the current user
    const user = User.getUser();
    // remove the user to unfollow's ID from the current user's following array
    user.following = user.following.filter(userId => userId !== this.state.user._id);
    // make a put request to /api/users/:id with the current user data
    axios.put(`/api/users/${user._id}`, user)
      .then(res => User.setUser(res.data))
      .then(() => this.setState({ currentUser: User.getUser() }));
  }

  viewProfile = (id) => {
    axios.get(`/api/users/${id}`)
      .then(res => this.setState({ user: res.data }))
      .then(() => this.props.history.push(`/users/${id}`));
  }


  render() {
    return (
      <div className="container">
        {!this.isCurrentUser() && <div>
          {this.state.currentUser && this.state.user && this.state.currentUser.following.includes(this.state.user._id) ? (
            // if it's not the current user, and there is a current user, and user, and their following includes the same user, then display unfollow
            <button className="button" onClick={this.unfollowUser}>Unfollow</button>
          ) : (
            <button className="button" onClick={this.followUser}>Follow</button>
          )}
        </div>}

        <br />
        <div className="tile is-ancestor">
          <div className="tile is-4 is-vertical is-parent">
            <div className="tile is-child box">
              <p className="title">{this.state.user.username}</p>
              <img src={this.state.user.profilePicture} />
            </div>
            <div className="tile is-child box">
              <p className="title sub">Following:</p>
              {this.state.user && this.state.user.following.map((following, i) =>

                <li key={i} className="column users">
                  <Link to={`/users/${following._id}`}>
                    <div className="profile-pic" onClick={() => this.viewProfile(following._id)}>
                      <img src={following.profilePicture} className="profile-pic-image"/>
                    </div>
                    <div className="username">
                      <h4>{following.username}</h4>
                    </div>
                  </Link>
                </li>
              )}
            </div>
          </div>
          <div className="tile is-parent is-vertical">
            <div className="tile is-child box">
              <p className="title sub">Liked:</p>

              {this.state.user && this.state.user.likes.map((like, i) =>
                <img className="liked" key={i} src={like.image} />
              )}
            </div>
            <div className="tile is-child box">
              <p className="title sub">Disliked:</p>
              {this.state.user && this.state.user.dislikes.map((dislike, i) =>
                <img className="disliked" key={i} src={dislike.image} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileRoute;
