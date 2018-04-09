import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';
import _ from 'lodash';
// link specific to react router dom. We use this so we don't have to use an <a> tag (which would reload the page), to link our banger to the show page.
import { Link } from 'react-router-dom';

import CommentInput from './CommentInput';

import Sidebar from './sidebarMenu.js'
import css from '../../assets/scss/components/index-page.scss';


class IndexRoute extends React.Component {

  state = {
    posts: []

  };

  componentDidMount() {
    axios.get('/api/images')
    .then(res => this.setState({ posts: res.data }, () => console.log(this.state)));
  }

  likeImage = (post) => {
    const user = User.getUser();
    const index = this.state.posts.indexOf(post);
    // finding index of current post clicked on
    const posts = this.state.posts.slice();
    // making a copy of posts
    posts[index].like = !posts[index].like;
    axios.post(`/api/images/${this.state.posts[index]._id}/likes`, null, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
    // .then(() => console.log('user after like', user))
      .then(res => {
        User.setUser(res.data)
        this.setState({ posts: posts })
      });
  }

  unlikeImage = (post) => {
    const user = User.getUser();
    const index = this.state.posts.indexOf(post);
    const posts = this.state.posts.slice();
    posts[index].like = !posts[index].like;
    axios.delete(`/api/images/${this.state.posts[index]._id}/likes`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => User.setUser(res.data))
      .then(() => this.setState({ posts: posts }));
  }

  commentButton = (post) => {
    const index = this.state.posts.indexOf(post);
    console.log(index);
    document.getElementById(index).focus();
  }

  render() {
    const user = User.getUser();
    console.log(user);
    return (
      <main>
      <div className="posts">
        <ul className="columns is-multiline">
          {this.state.posts.map((post, i) =>
            <li key={i} className="column">
              <Link to={`/images/${post._id}`}>
              <div className="card post-image">
                <div className="card-image" style={{backgroundImage: `url(${post.image})`}}>
                </div>
              </div>
              </Link>
                <div className="card">
                  <div className="card-content">
                    {user.likes.includes(post._id) ? (
                      <button className="icon" onClick={() => this.unlikeImage(post)}>
                        <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/heart-icon.png" />
                      </button>
                  ) : (
                      <button className="icon" onClick={() => this.likeImage(post)}>
                        <img src="https://png.icons8.com/metro/1600/like.png" />
                      </button>
                  )}
                      <button className="icon" onClick={() => this.commentButton(post)}>
                        <img src="http://icons.iconarchive.com/icons/icons8/ios7/512/Very-Basic-Speech-Bubble-icon.png" />
                      </button>

                      <h4 className="subtitle">{post.caption}</h4>
                    </div>
                  </div>
                  <CommentInput id={i} />
                </li>
              )}
            </ul>
          </div>
        <Sidebar />
      </main>
    )
  }
}

export default IndexRoute;
