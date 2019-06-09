import React from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from '@material-ui/core/styles';
import $ from 'jquery';
import { MessageBlock } from './MessageBlock';
import InputBlock from './InputBlock';
import MainTitle from './MainTitle';
import BottomAppBar from './BottomAppBar';
import theme from './theme/muiTheme';
import initWebDB from './initWebDB';

class App extends React.Component {
  constructor(props) {
    super(props);
    const INITIAL_STATE = {
      list: [],
      searchData: { content: '', createdAt: '' },
    };
    this.state = INITIAL_STATE;
    this.changeState = this.changeState.bind(this);
    this.changeDState = this.changeDState.bind(this);
    this.handleSearchList = this.handleSearchList.bind(this);
    this.handleSearchTodoItem = this.handleSearchTodoItem.bind(this);
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleDelTodoItem = this.handleDelTodoItem.bind(this);
    this.handleModTodoItem = this.handleModTodoItem.bind(this);
  }

  async componentWillMount() {
    let initTodo;
    try {
      initTodo = await initWebDB();
    } catch (err) {
      if (err.responseText) {
        alert(`error: ${err.responseText}`);
      } else {
        alert(`error: ${err.statusText}`);
      }
      return;
    }
    this.setState({ list: initTodo });
  }

  async changeState(event) {
    const searchValue = event.target.value;
    const { searchData } = this.state;
    const searchBar = searchData;

    searchBar.content = searchValue;
    this.setState({ searchData: searchBar });

    if (searchValue === '') {
      this.handleSearchList('', 'text');
      this.handleSearchTodoItem();
    } else {
      let ret;
      try {
        ret = await $.ajax({
          method: 'GET',
          url: `http://localhost:3001/todo?text=${searchValue}`,
        });
      } catch (err) {
        if (err.responseText) {
          alert(`error: ${err.responseText}`);
        } else {
          alert(`error: ${err.statusText}`);
        }
        return;
      }
      this.handleSearchList(ret, 'text');
      this.handleSearchTodoItem();
    }
  }

  async changeDState(event) {
    const searchValue = event.target.value;
    if (searchValue === '') {
      this.handleSearchList('', 'date');
      this.handleSearchTodoItem();
    } else {
      let ret;
      try {
        ret = await $.ajax({
          method: 'GET',
          url: `http://localhost:3001/todo?date=${searchValue}`,
        });
      } catch (err) {
        if (err.responseText) {
          alert(`error: ${err.responseText}`);
        } else {
          alert(`error: ${err.statusText}`);
        }
        return;
      }
      this.handleSearchList(ret, 'date');
      this.handleSearchTodoItem();
    }
  }

  handleSearchList(arr, type) {
    const { searchData } = this.state;
    const searchBar = searchData;
    if (type === 'date') {
      searchBar.createdAt = arr;
    } else if (type === 'text') {
      searchBar.content = arr;
    } else {
      console.log('something wrong.');
    }
    this.setState({ searchData: searchBar });
  }

  async handleSearchTodoItem() {
    let oldTodo;
    try {
      oldTodo = await initWebDB();
    } catch (err) {
      if (err.responseText) {
        alert(`error: ${err.responseText}`);
      } else {
        alert(`error: ${err.statusText}`);
      }
      return;
    }
    const arr = [];
    const { searchData } = this.state;
    const datelist = searchData.createdAt;
    const textlist = searchData.content;

    let dislist = [];

    if (textlist.length && datelist.length) { // search date&& content
      dislist = datelist.filter(val => textlist.indexOf(val) !== -1);
    } else if ((textlist.length) && (datelist === '')) { // search content
      dislist = textlist.slice();
    } else if (datelist.length && (textlist === '')) { // search date
      dislist = datelist.slice();
    } else {
      if ((datelist === '') && (textlist === '')) { // del all search
        this.setState({ list: oldTodo });
        return;
      }
      // else not find
    }
    // create new display list
    oldTodo.forEach((x) => {
      dislist.forEach((y) => {
        if (x.id === y) {
          arr.push({
            id: x.id,
            createdAt: x.createdAt,
            content: x.content,
            deltag: x.deltag,
          });
        }
      });
    });
    this.setState({ list: arr });
  }

  handleAddTodoItem(todoText) {
    const { list } = this.state;
    const todos = list;
    todos.push({
      id: todoText.id,
      createdAt: todoText.createdAt,
      content: todoText.content,
      deltag: 0,
    });
    this.setState({ list: todos });
  }

  handleDelTodoItem(todoText) {
    const { list } = this.state;
    const todos = list;
    const index = todos.findIndex(obj => obj.id === todoText.id);
    todos[index].deltag = todoText.deltag;
    this.setState({ list: todos }, () => {
    });
  }

  handleModTodoItem(todoText) {
    const { list } = this.state;
    const todos = list;
    const index = todos.findIndex(obj => obj.id === todoText.id);
    todos[index].content = todoText.content;
    this.setState({ list: todos }, () => {
    });
  }

  render() {
    const { list } = this.state;
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <MuiThemeProvider theme={theme}>
          <MainTitle />
          <InputBlock
            addTodo={this.handleAddTodoItem}
            changeDState={this.changeDState}
            changeState={this.changeState}
          />
          <hr />
          <MessageBlock
            dbData={list}
            delTodo={this.handleDelTodoItem}
            modTodo={this.handleModTodoItem}
          />
          <BottomAppBar />
        </MuiThemeProvider>
      </Grid>
    );
  }
}

export default App;
