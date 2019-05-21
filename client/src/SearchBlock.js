import React from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBlock extends React.Component {

  render() {
    return (
      <div>
        <TextField
          id="input-search"
          label="Search field"
          type="search"
          margin="normal"
          value={this.props.searchContent}
	      onChange={this.props.changeState}
        />
      </div>
    );
  }
}

export { SearchBlock }