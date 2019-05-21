import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

import Grid from '@material-ui/core/Grid';
import { MessageBlock } from "./MessageBlock"
import { InputBlock } from "./InputBlock"
import { MainTitle } from "./MainTitle"
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./theme/muiTheme"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { BottomAppBar }  from "./BottomAppBar"
class App extends React.Component{
  constructor(props){
    super(props)
    const INITIAL_STATE = {
      list: this.props.dbData,
      searchData: {content:'',createdAt:''}
    };
    this.state = INITIAL_STATE;
    this.changeState = this.changeState.bind(this)
    this.changeDState= this.changeDState.bind(this)
    this.handleAddTodoItem= this.handleAddTodoItem.bind(this)
    this.handleDelTodoItem= this.handleDelTodoItem.bind(this)
    this.handleModTodoItem= this.handleModTodoItem.bind(this)
  }
  changeState(event){
    var searchBar = this.state.searchData;
      searchBar.content = event.target.value;
      this.setState({searchData: searchBar}, () => {
        console.log(this.state.searchData); 
      });    
  }
  changeDState(event){
    var searchBar = this.state.searchData;
      searchBar.createdAt = event.target.value;
      this.setState({searchData: searchBar}, () => {
      });
  }
  handleAddTodoItem(todoText) {
    var todos = this.state.list;
    todos.push({
      id: todoText.id,
      createdAt: todoText.createdAt,
      content: todoText.content,
      deltag: 0
    });
    this.setState({list: todos});
  }
  handleDelTodoItem(todoText) {
      var todos = this.state.list;
      var index = todos.findIndex(obj => obj.id === todoText.id);
      todos[index].deltag = todoText.deltag;
      this.setState({list: todos}, () => {
        //console.log(todos); 
      });
  }  
  handleModTodoItem(todoText) {
      var todos = this.state.list;
      var index = todos.findIndex(obj => obj.id === todoText.id);
      todos[index].content = todoText.content;
      this.setState({list: todos}, () => {
        console.log(todos); 
      });
  }            
  render(){
    return(
      <Grid
  container
  direction="column"
  justify="flex-start"
  alignItems="stretch"
>
<MuiThemeProvider theme={theme}>    

     <MainTitle />
      <InputBlock addTodo={this.handleAddTodoItem}      
        searchDate={this.state.searchData.createdAt}
        changeDState={this.changeDState}
        searchContent={this.state.searchData.content}
        changeState={this.changeState}/>  
      <hr/>
      <MessageBlock dbData={this.state.list} 
                    searchContent={this.state.searchData.content}
                    searchDate={this.state.searchData.createdAt}
                    delTodo={this.handleDelTodoItem}
                    modTodo={this.handleModTodoItem} />
      <BottomAppBar />
             
</MuiThemeProvider>
      </Grid>
    )
  }
}

export default App;
