import React from 'react';
import { Link, withRouter } from 'react-router-dom'; // with router allows us to pass in the props
import Auth from '../../lib/Auth';
import User from '../../lib/User';

import css from '../../assets/scss/components/navbar.scss';


class Navbar extends React.Component {

// we've created a property called state
  state = {
    navIsOpen: false,
    currentUser: ''
  }

  componentDidMount() {
    const user = User.getUser();
    this.setState({ currentUser: user}, () => console.log('currentuse', this.state.currentUser));
  }

  handleLogout = () => {
    Auth.logout();
    User.clearUser();
    this.props.history.push('/images');
  }

  handleToggle = () => {
    // if the nav is false we set to true. This is the equivalent of us binding to the constructor, we just make a function. It's now "handleToggle: () =>" and the function is an anonymous function within handleToggle:
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }
  // if state or props changes, react re-renders. So this fires everytime the navbar receives new props, which will change when props or state changes, so cus we've moved page, the url changes, so browser router sends new props, so we can get the component will update to listen for the prop change to close the navbar.
  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }

  render() {
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/images">
          Unstagram
          </Link>
          <div
            className={`navbar-burger ${this.state.navIsOpen ? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link className="navbar-item" to="/images"><i className="fas fa-camera-retro"></i></Link>
            <Link className="navbar-item" to={`/users/${this.state.currentUser._id}`}><i className="fas fa-child"></i></Link>
            <Link className="navbar-item" to="/tv"><i className="fas fa-tv"></i></Link>

            {Auth.isAuthenticated() && <Link className="navbar-item" to="/images/new"><i className="fas fa-plus"></i></Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i></a>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login"><i className="fas fa-sign-in-alt"></i></Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register"><i className="fas fa-user-plus"></i></Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
