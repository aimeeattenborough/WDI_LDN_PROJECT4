import React from 'react';
import axios from 'axios';
import _ from 'lodash';
// link specific to react router dom. We use this so we don't have to use an <a> tag (which would reload the page), to link our banger to the show page.
import { Link } from 'react-router-dom';


class IndexRoute extends React.Component {

  state = {
    posts: []
  };

  componentDidMount() {
    axios.get('/api/images')
    .then(res => this.setState({ posts: res.data }, () => console.log(this.state)));
  }

  render() {
    return (
      <div>
        <ul className="columns is-multiline">
          {this.state.posts.map((post, i) =>
            <li key={i} className="column is-one-third">
              <Link to={`/images/${post._id}`}>
                <div className="card">
                  <div className="card-content">
                    <img src={post.image}></img>
                    <h4 className="subtitle">{post.caption}</h4>
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default IndexRoute;
