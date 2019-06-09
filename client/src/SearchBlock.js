import React from 'react';
import TextField from '@material-ui/core/TextField';

const _propType = require('prop-types');

export const SearchBlock = ({ changeState }) => (
  <div>
    <TextField
      id="input-search"
      label="Search field"
      type="search"
      margin="normal"
      onChange={changeState}
    />
  </div>
);
SearchBlock.propTypes = {
  changeState: _propType.string,
};
SearchBlock.defaultProps = {
  changeState: '',
};
export default SearchBlock;
