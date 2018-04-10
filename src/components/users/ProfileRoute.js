import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';


class ProfileRoute extends React.Component {

  state = {
    user: ''
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }));
  }

  isCurrentUser = () => {
    const user = User.getUser();
    return user && user._id === this.state.user._id;
  }

  followUser = () => {
    // get the current user
    const user = User.getUser();
    // push user to follow's ID into the current user's following array
    user.following.push(this.state.user._id);
    // make a put request to /api/users/:id with the current user data
    axios.put(`/api/users/${user._id}`, user)
      .then(res => User.setUser(res.data));
    // set the user with User.setUser again

    // change the button to unfollow...
  }

  render() {
    return (
      <div className="container">
        <h1>{this.state.user.username}</h1>

        {!this.isCurrentUser() && <button onClick={this.followUser}>Follow</button>}

        <h1>Following:</h1>
        
      </div>
    );
  }
}

export default ProfileRoute;
