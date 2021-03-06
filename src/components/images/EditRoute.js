import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import Filestack from './Filestack';


class EditRoute extends React.Component {

  state = {
    image: '',
    caption: '',
    errors: {}
  }

  componentDidMount() {
    axios.get(`/api/images/${this.props.match.params.id}`)
      .then(res => this.setState(res.data, () => console.log(this.state)));
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
      method: 'PUT',
      url: `/api/images/${this.props.match.params.id}`,
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
      <form onSubmit={this.handleSubmit}>
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

    );
  }
}

export default EditRoute;
