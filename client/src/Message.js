import React from 'react';
import $ from 'jquery';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const _propType = require('prop-types');

class Message extends React.Component {
  constructor(props) {
    super(props);
    const { content } = this.props;
    this.submitDelTodo = this.submitDelTodo.bind(this);
    this.openEditTodo = this.openEditTodo.bind(this);
    this.submitEditTodo = this.submitEditTodo.bind(this);
    this.editMsg = this.editMsg.bind(this);
    this.clearMod = this.clearMod.bind(this);
    this.state = ({ normalMode: 1, oriMsg: content });
  }

  async submitDelTodo() {
    /* something should to-do:
      set state and change display
      del backend DB
    */
    const { id, deltag, delTodo } = this.props;
    const tempUrl = `http://localhost:3001/todo/${id}`;
    let delSendMsg;
    if (deltag) { // recovery
      delSendMsg = { deltag: 0, id };
      try {
        await $.ajax({
          type: 'POST',
          url: tempUrl,
        });
      } catch (err) {
        if (err.responseText) {
          alert(`error: ${err.responseText}`);
        } else {
          alert(`error: ${err.statusText}`);
        }
        return;
      }
      delTodo(delSendMsg);
    } else { // delete
      delSendMsg = { deltag: 1, id };
      try {
        await $.ajax({
          type: 'DELETE',
          url: tempUrl,
        });
      } catch (err) {
        if (err.responseText) {
          alert(`error: ${err.responseText}`);
        } else {
          alert(`error: ${err.statusText}`);
        }
        return;
      }
      delTodo(delSendMsg);
    }
  }

  openEditTodo() {
    this.setState({ normalMode: 0 });
  }

  async submitEditTodo() {
    /* something should to-do:
      set state and change display
      del backend DB
    */
    const { id, modTodo } = this.props;

    const tempUrl = `http://localhost:3001/todo/${id}`;
    let modSendMsg;
    const { oriMsg } = this.state;
    const text = this.state;
    if (oriMsg) {
      this.setState({ normalMode: 1 });
      modSendMsg = { id, content: oriMsg };
      try {
        await $.ajax({
          type: 'PUT',
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
      modTodo(modSendMsg);
    } else {
      alert('Please input data');
    }
  }

  editMsg(e) {
    this.setState({ oriMsg: e.target.value });
  }

  clearMod() {
    window.location.reload();
  }

  render() {
    const { createdAt, deltag, content } = this.props;
    const { normalMode, oriMsg } = this.state;
    let msgStyle = {};
    let editText = {};
    let editButton = {};
    const displayDate = (createdAt).substr(0, 10);

    if (deltag) {
      msgStyle = { textDecorationLine: 'line-through' };
      editButton = { display: 'none' };
    }
    if (normalMode) {
      editText = { display: 'none' };
    } else {
      editText = { display: '' };
      msgStyle = { display: 'none' };
      editButton = { display: 'none' };
    }
    return (
      <div>
        {/* display mode */}
        <span id="disTodo" style={msgStyle}>
          <Checkbox
            checked={deltag}
            onChange={this.submitDelTodo}
            color="primary"
          />
          {content}
        </span>
        <IconButton onClick={this.openEditTodo} style={editButton} color="primary"><EditIcon /></IconButton>

        {/* edit mode */}
        <span id="editTodo" style={editText}>
          <Checkbox
            checked={deltag}
            onChange={this.submitDelTodo}
            color="primary"
            disabled
          />
          <TextField type="text" value={oriMsg} onChange={this.editMsg} />
          <IconButton onClick={this.submitEditTodo} color="secondary"><AddCircleIcon /></IconButton>
          <IconButton onClick={this.clearMod} color="secondary"><CancelIcon /></IconButton>
        </span>
        <div style={{ paddingLeft: '5%' }}>
          {displayDate}
post.
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  content: _propType.string,
  id: _propType.number,
  deltag: _propType.number,
  delTodo: _propType.node,
  modTodo: _propType.node,
  createdAt: _propType.string,
};

Message.defaultProps = {
  content: 'test',
  id: '1',
  deltag: 0,
  createdAt: '0',
  delTodo: {
    id: '1',
    deltag: 0,
  },
  modTodo: {
    id: '1',
    content: 'test',
  },
};
export default Message;
