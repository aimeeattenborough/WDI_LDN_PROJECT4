import React from 'react';
import axios from 'axios';
import User from '../../lib/User';

import _ from 'lodash';
// link specific to react router dom. We use this so we don't have to use an <a> tag (which would reload the page), to link our banger to the show page.
import { Link } from 'react-router-dom';

import css from '../../assets/scss/components/sidebar-menu.scss';


class sidebarMenu extends React.Component {

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
        <aside className="aside column is-sidebar-menu is-fullheight section is-hidden-mobile">
          <ul>
            <li>
              <div className="card">
                <div className="card-content">
                  <h1>{this.state.currentUser.username}</h1>
                  <img className="profile-pic" src={this.state.currentUser.profilePicture} />
                </div>
                <div className="card-content">
                  {/* <h1>{this.state.currentUser.username}</h1>
                  <img className="profile-pic" src={this.state.currentUser.profilePicture} /> */}
                  {this.state.allUsers.map((user, i) =>  user.isUnfluencer && <p key={i}>{user.username}</p> )}
                </div>
              </div>
            </li>
          </ul>
        </aside>
      )
    )
  }
}

export default sidebarMenu;
