import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import css from '../../assets/scss/components/show-page.scss';


class ShowRoute extends React.Component {

  state = {
    post: null
  }

  componentDidMount() {
    axios.get(`/api/images/${this.props.match.params.id}`)
    .then(res => this.setState({ post: res.data }));
  }

  editPost = () => {
  axios.get(`/api/images/${this.props.match.params.id}`)
    .then(() => this.props.history.push(`/images/${this.props.match.params.id}/edit`));
  }


    render() {
      return (
        this.state.post && (
        <div className="container">
          <div className="card">
            <img src={this.state.post.image}></img>
            <h1 className="title">{this.state.post.caption}</h1>
          </div>
          <a onClick={this.editPost}>Edit</a>
        </div>
      )
    )
  }
}

export default ShowRoute;
