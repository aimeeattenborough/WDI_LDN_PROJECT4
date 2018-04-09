import React from 'react';
import axios from 'axios';
import _ from 'lodash';
// link specific to react router dom. We use this so we don't have to use an <a> tag (which would reload the page), to link our banger to the show page.
import { Link } from 'react-router-dom';

import css from '../../assets/scss/components/sidebar-menu.scss';


class sidebarMenu extends React.Component {

  state = {
    users: []
  };
  //
  // componentDidMount() {
  //   axios.get('/api/images')
  //   .then(res => this.setState({ posts: res.data }, () => console.log(this.state)));
  // }

  render() {
    return (
      <aside className="aside column is-sidebar-menu is-fullheight section is-hidden-mobile">
        <ul>
          <li>
            <div className="card">
              <div className="card-image">
                <img src="http://180days.floparis.net/wp-content/uploads/2014/01/polls_chicken_clothes_2638_353887_answer_2_xlarge.jpeg"></img>
                <img src="http://180days.floparis.net/wp-content/uploads/2014/01/polls_chicken_clothes_2638_353887_answer_2_xlarge.jpeg"></img>
                <img src="http://180days.floparis.net/wp-content/uploads/2014/01/polls_chicken_clothes_2638_353887_answer_2_xlarge.jpeg"></img>
              </div>
            </div>
          </li>
        </ul>
      </aside>
    )
  }
}

export default sidebarMenu;
