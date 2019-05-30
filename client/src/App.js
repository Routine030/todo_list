import React from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';
import { MessageBlock } from "./MessageBlock"
import { InputBlock } from "./InputBlock"
import { MainTitle } from "./MainTitle"
import { BottomAppBar }  from "./BottomAppBar"
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./theme/muiTheme"
import $ from 'jquery';

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
    this.handleSearchList=this.handleSearchList.bind(this)
    this.handleSearchTodoItem=this.handleSearchTodoItem.bind(this)
    this.handleAddTodoItem= this.handleAddTodoItem.bind(this)
    this.handleDelTodoItem= this.handleDelTodoItem.bind(this)
    this.handleModTodoItem= this.handleModTodoItem.bind(this)
  }
  changeState(event){
      var self = this;
      var searchValue=event.target.value;
    var searchBar = this.state.searchData;
      searchBar.content = searchValue;
      this.setState({searchData: searchBar})
      if(searchValue===''){
        //console.log('del search');
        self.handleSearchList('','text');
        self.handleSearchTodoItem();              
      }
      else{
             $.ajax({
                method: "GET",
                url: "http://localhost:3001/todo?text="+searchValue,
               })
                .done(function( msg ) {
                  self.handleSearchList(msg,'text');
                  self.handleSearchTodoItem();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                  if(jqXHR.responseText){
                      alert(textStatus+': '+jqXHR.responseText);
                  }
                  else{
                      alert(textStatus+': '+errorThrown);
                  }
      });    
  }
  }  
  changeDState(event){
      var self = this;
      var searchValue=event.target.value;
      if(searchValue===''){
        //console.log('del date');
        self.handleSearchList('','date');
        self.handleSearchTodoItem();
      }
      else{
             $.ajax({
                method: "GET",
                url: "http://localhost:3001/todo?date="+searchValue,
               })
                .done(function( msg ) {
                  self.handleSearchList(msg,'date');
                  self.handleSearchTodoItem();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                  if(jqXHR.responseText){
                      alert(textStatus+': '+jqXHR.responseText);
                  }
                  else{
                      alert(textStatus+': '+errorThrown);
                  }
                });
      }
  }
  handleSearchList(arr,type){
    var searchBar = this.state.searchData;
    if(type==='date'){
      searchBar.createdAt = arr;
    }
    else if(type==='text'){
      searchBar.content = arr;
    }
    else{
      console.log('something wrong.');  
    }
    this.setState({searchData: searchBar})
  }
  handleSearchTodoItem() {
      var old_todo = this.props.dbData;
      var arr = [];
      var datelist= this.state.searchData.createdAt;
      var textlist= this.state.searchData.content;
      var dislist=[];

      if(textlist.length&&datelist.length)//search date&& content
      {
        dislist= datelist.filter(function(val) {
        return textlist.indexOf(val) !== -1;
        });
      }
      else if((textlist.length)&&(datelist===''))//search content
      {
        dislist = textlist.slice();
      }
      else if(datelist.length&&(textlist===''))//search date
      {
        dislist = datelist.slice();
      }
      else
      {
        if((datelist==='')&&(textlist===''))//del all search
        {
          this.setState({list: old_todo});
          return;
        }
        //else not find
      }
      //create new display list
      for(var i=0;i<old_todo.length;i++){
        for(var j=0;j<dislist.length;j++){
          if(old_todo[i].id===dislist[j]){
            arr.push({
              id: old_todo[i].id,
              createdAt: old_todo[i].createdAt,
              content: old_todo[i].content,
              deltag: old_todo[i].deltag
      });
            break;
          }
        }
      }
      this.setState({list: arr});
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
        changeDState={this.changeDState}
        changeState={this.changeState}/>  
      <hr/>
      <MessageBlock dbData={this.state.list} 
                    delTodo={this.handleDelTodoItem}
                    modTodo={this.handleModTodoItem} />
      <BottomAppBar />
             
</MuiThemeProvider>
      </Grid>
    )
  }
}

export default App;
