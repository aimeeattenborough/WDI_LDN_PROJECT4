import React from 'react';
import axios from 'axios';
import User from '../../lib/User';

import _ from 'lodash';
// link specific to react router dom. We use this so we don't have to use an <a> tag (which would reload the page), to link our banger to the show page.
import { Link } from 'react-router-dom';

import css from '../../assets/scss/components/sidebar-menu.scss';


class Sidebar extends React.Component {

  state = {
    currentUser: null,
    allUsers: [],
    users: []
  };

  componentDidMount() {
    const user = User.getUser();
    this.setState({ currentUser: user }, () => console.log('current yooo', this.state.currentUser));
    // get unfluencers
    axios.get('/api/users')
      .then(res => this.setState({ allUsers: res.data }, () => (console.log('all users', this.state.allUsers))));
  }


  render() {
    return (
      this.state.currentUser && (
        <aside className="column is-two-fifths-desktop is-one-fifth-tablet is-hidden-mobile">
          <ul>
            <li>
              <div className="">
                <Link to={`/users/${this.state.currentUser._id}`}>

                  <div className="profile-pic">
                    <img src={this.state.currentUser.profilePicture} className="profile-pic-image"/>
                  </div>
                  <div className="username">
                    <p className="username-p">{this.state.currentUser.username}</p>
                  </div>

                  <hr className="hr" />
                </Link>
                <h1 className="unfluencers">Top Unfluencers:</h1>
                <div className="card-content">
                  {this.state.allUsers.map((user, i) =>
                    user.isUnfluencer &&
                    <div key={i}>
                      <Link to={`/users/${user._id}`}>
                        <div className="profile-pic">
                          <img src={user.profilePicture} className="profile-pic-image"/>
                        </div>
                        <div className="username">
                          <p className="username-p">{user.username}</p>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </aside>
      )
    );
  }
}

export default Sidebar;
