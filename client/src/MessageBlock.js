import React from 'react';
import Message from './Message';

const _propType = require('prop-types');

export const MessageBlock = (props) => {
  const { delTodo, modTodo, dbData } = props;
  const todo = dbData.map(item => (
    <Message
      key={item.id}
      id={item.id}
      content={item.content}
      createdAt={item.createdAt}
      deltag={item.deltag}
      delTodo={delTodo}
      modTodo={modTodo}
    />
  ));
  return (<div style={{ paddingLeft: '5%', paddingBottom: '15%' }}>{todo}</div>);
};

MessageBlock.propTypes = {
  delTodo: _propType.node,
  modTodo: _propType.node,
  dbData: _propType.node,
};
MessageBlock.defaultProps = {
  delTodo: {
    id: '1',
    deltag: 0,
  },
  modTodo: {
    id: '1',
    content: 'test',
  },
  dbData: {
    id: '1',
    createdAt: '0',
    content: 'test',
    deltag: 0,
  },
};
export default MessageBlock;
