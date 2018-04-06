import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class ShowRoute extends React.Component {

  state = {
    post: null
  }

  componentDidMount() {
    axios.get(`/api/images/${this.props.match.params.id}`)
    .then(res => this.setState({ post: res.data }, () => console.log(this.state.post)));
  }


    render() {
      return (
        this.state.post && (
        <div className="container">
          <img src={this.state.post.image}></img>
          <h1 className="title">{this.state.post.caption}</h1>
        </div>
      )
    )
  }
}

export default ShowRoute;
