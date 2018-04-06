import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import Filestack from './Filestack';

class NewRoute extends React.Component {

  state = {
    caption: '',
    errors: {}
  }

  handleChange = ({ target: { name, value } }) => {
    // destructuring e.target.name
  const errors = Object.assign({}, this.state.errors, { [name]: '' });
  // clearing the errors
  this.setState({ [name]: value, errors }, () => console.log(this.state));
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


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Filestack />
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
      <button className="button is-primary">Submit</button>
      </form>

    )
  }
}

export default NewRoute;
