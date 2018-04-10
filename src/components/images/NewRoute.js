import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';


import Filestack from './Filestack';
import css from '../../assets/scss/components/new-page.scss';


class NewRoute extends React.Component {

  state = {
    caption: '',
    image: '',
    user: '',
    errors: {}
  }

  handleChange = ({ target: { name, value } }) => {
    const user = User.getUser();
    // destructuring e.target.name
  const errors = Object.assign({}, this.state.errors, { [name]: '' });
  // clearing the errors
  this.setState({ [name]: value, errors, user: user }, () => console.log('this.state in handelchange', this.state));
  // name in [] makes it a variable. Otherwise it would look for 'name' in state.
}

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: '/api/images',
      headers: { Authorization: `Bearer ${Auth.getToken()}`},
      data: this.state
    })
      .then(() => this.props.history.push('/images'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  onSuccess = (result) => {
    this.setState({ image: result.filesUploaded[0].url }, () => console.log(this.state.image));
  }

  render() {
    return (
      <form className="upload-form" onSubmit={this.handleSubmit}>
        <Filestack onSuccess={this.onSuccess} />
        <div className="field">
          <label htmlFor="caption">Caption</label>
          <input
            className="input"
            placeholder="caption"
            value={this.state.caption}
            name="caption"
            onChange={this.handleChange}
          />
        </div>
        {this.state.image && <img src={this.state.image} />}
      <button className="button is-primary">Submit</button>
      </form>
    )
  }
}

export default NewRoute;
