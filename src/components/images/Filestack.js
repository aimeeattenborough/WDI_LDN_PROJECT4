import React from 'react';
import ReactFilestack from 'react-filestack'

class Filestack extends React.Component {

  state = {
    image: ''
  }

  options = {
    accept: 'image/*',
    maxFiles: 1,
    // transformations: { crop: { force: true, aspectRatio: 4/4 } },
    storeTo: {
      location: 's3',
    }
  }

  api = {
    api: 'Ah2KpY6HNTrWeqrIKMLcwz'
  }

  onSuccess = (result) => {
    this.setState({ image: result.filesUploaded.url }, () => console.log(result));
  }

  render() {
    return (
      <ReactFilestack
        apikey={this.api.api}
        options={this.options}
        onSuccess={this.onSuccess}
        // onError={onError}
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
