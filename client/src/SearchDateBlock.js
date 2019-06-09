import React from 'react';
import TextField from '@material-ui/core/TextField';

const _propType = require('prop-types');

export const SearchDateBlock = ({ changeDState }) => (
  <div>
    <TextField
      id="bookdate"
      label="Search by date"
      type="date"
      InputLabelProps={{ shrink: true }}
      onChange={changeDState}
    />
  </div>
);
SearchDateBlock.propTypes = {
  changeDState: _propType.string,
};
SearchDateBlock.defaultProps = {
  changeDState: '',
};
export default SearchDateBlock;
