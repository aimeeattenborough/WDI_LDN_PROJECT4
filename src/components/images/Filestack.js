import React from 'react';
import ReactFilestack from 'react-filestack'

class Filestack extends React.Component {

  state = {
    api: 'Ah2KpY6HNTrWeqrIKMLcwz'
  }

  options = {
    accept: 'image/*',
    maxFiles: 1,
      transformations: {
        crop: {aspectRatio: 4 / 4}
      },
  }

  render() {
    return (
      <ReactFilestack
        apikey={this.state.api}
        options={this.options}
        onSuccess={this.props.onSuccess}
        render={({ onPick }) => (
          <div>
            <strong>Upload an image</strong>
            <button onClick={onPick}>Pick</button>
          </div>
        )}
      />
    );
  }

}

export default Filestack;
