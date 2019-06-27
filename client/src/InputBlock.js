import React from 'react';
import $ from 'jquery';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/PlaylistAdd';
import DateIcon from '@material-ui/icons/DateRange';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { SearchBlock } from './SearchBlock';
import { SearchDateBlock } from './SearchDateBlock';

const _propType = require('prop-types');

class InputBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ createtodo: '', displaysearchtext: 0, displaysearchdate: 0 });
    this.changeState = this.changeState.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.searchByText = this.searchByText.bind(this);
    this.searchByDate = this.searchByDate.bind(this);
  }

  changeState(event) {
    this.setState({ createtodo: event.target.value });
  }

  async createTodo() {
    const { createtodo } = this.state;
    const { addTodo } = this.props;
    const tempUrl = 'http://localhost:3001/';

    if (createtodo === '') {
      alert('Please input data');
    } else {
      const text = (this.state);
      let ret;
      try {
        ret = await $.ajax({
          method: 'POST',
          url: tempUrl,
          data: text,
        });
      } catch (err) {
        if (err.responseText) {
          alert(`error: ${err.responseText}`);
        } else {
          alert(`error: ${err.statusText}`);
        }
        return;
      }
      addTodo(ret[0]);// set state
      this.setState({ createtodo: '' });// change display
    }
  }

  searchByText() {
    const { displaysearchtext } = this.state;
    if (displaysearchtext) {
      this.setState({ displaysearchtext: 0 });
    } else {
      this.setState({ displaysearchtext: 1 });
    }
  }

  searchByDate() {
    const { displaysearchdate } = this.state;
    if (displaysearchdate) {
      this.setState({ displaysearchdate: 0 });
    } else {
      this.setState({ displaysearchdate: 1 });
    }
  }

  render() {
    let distext = {};
    let disdate = {};
    const { displaysearchtext, displaysearchdate, createtodo } = this.state;
    const { changeState, changeDState } = this.props;
    if (displaysearchtext) {
      distext = { display: '' };
    } else {
      distext = { display: 'none' };
    }
    if (displaysearchdate) {
      disdate = { display: '' };
    } else {
      disdate = { display: 'none' };
    }
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <TextField
              id="input-addto"
              label="add to-do"
              type="text"
              margin="normal"
              variant="outlined"
              value={createtodo}
              onChange={this.changeState}
            />
          </Grid>
          <Grid item>
            <IconButton type="button" onClick={this.createTodo} color="primary"><AddIcon fontSize="large" /></IconButton>
            <IconButton type="button" onClick={this.searchByText} color="primary"><SearchIcon fontSize="large">Search</SearchIcon></IconButton>
            <IconButton type="button" onClick={this.searchByDate} color="primary"><DateIcon fontSize="large">Date</DateIcon></IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <div id="searchByText" style={distext}>
              <SearchBlock changeState={changeState} />
            </div>
          </Grid>
          <Grid item>
            <div id="searchByDate" style={disdate}>
              <SearchDateBlock changeDState={changeDState} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
InputBlock.propTypes = {
  addTodo: _propType.node,
  changeDState: _propType.string,
  changeState: _propType.string,
};
InputBlock.defaultProps = {
  addTodo: {
    id: '1',
    createdAt: '0',
    content: 'test',
    deltag: 0,
  },
  changeDState: '',
  changeState: '',
};
export default InputBlock;
