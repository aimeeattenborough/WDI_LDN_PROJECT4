import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';


class ProfileRoute extends React.Component {
  //
  // state = {
  //   user: ''
  // }
  //
  // componentDidMount() {
  //   const user = User.getUser();
  //   console.log(user.username);
  //   this.setState({ user: user });
  // }

    render() {
      return (
        // const user = User.getUser();

        // this.state.user && (
        <div className="container">
          {/* <h1>{user.username}</h1> */}
          {/* <img src={this.state.post.image}></img>
          <h1 className="title">{this.state.post.caption}</h1>
          <a onClick={this.editPost}>Edit</a> */}
        </div>
      // )
    )
  }
}

export default ProfileRoute;
