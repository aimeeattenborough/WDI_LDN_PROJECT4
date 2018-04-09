import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class ProfileRoute extends React.Component {

  state = {
    user: null
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
    .then(res => this.setState({ user: res.data }));
  }

    render() {
      return (
        // this.state.user && (
        <div className="container">
          <h1>hello</h1>
          {/* <img src={this.state.post.image}></img>
          <h1 className="title">{this.state.post.caption}</h1>
          <a onClick={this.editPost}>Edit</a> */}
        </div>
      // )
    )
  }
}

export default ProfileRoute;
