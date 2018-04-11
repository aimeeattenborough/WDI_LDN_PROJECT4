import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';
import { Link } from 'react-router-dom';


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
            <button onClick={this.unfollowUser}>Unfollow</button>
          ) : (
            <button onClick={this.followUser}>Follow</button>
          )}
        </div>}

        <h1>{this.state.user.username}</h1>

        <h1>Following:</h1>
        {this.state.user && this.state.user.following.map((following, i) =>
          <li key={i} className="column">
            <Link to={`/users/${following._id}`}>
              <div className="card" onClick={() => this.viewProfile(following._id)}>
                <div className="card-content">
                  <img src={following.profilePicture} className="profile-pic"/>
                  <h4 className="subtitle">{following.username}</h4>
                </div>
              </div>
            </Link>
          </li>
        )}
        <h1>Likes:</h1>
        {this.state.user && this.state.user.likes.map((like, i) =>
          <img className="liked" key={i} src={like.image} />
        )}
      </div>
    );
  }
}

export default ProfileRoute;
