import React from "react"
import $ from 'jquery';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';


class Message extends React.Component{
  constructor(props) {
    super(props)
    this.submitDelTodo = this.submitDelTodo.bind(this)
    this.openEditTodo = this.openEditTodo.bind(this)
    this.submitEditTodo = this.submitEditTodo.bind(this)
    this.editMsg = this.editMsg.bind(this)
    this.clearMod= this.clearMod.bind(this)
    this.state = ({normalMode:1,oriMsg:this.props.content})
  }
  submitDelTodo(){
    /* something should to-do:
      set state and change display
      del backend DB
    */
    var tempUrl='http://localhost:3001/todo/'+this.props.id;    
    var delSendMsg;
    if(this.props.deltag)//recovery
    {
     delSendMsg={deltag:0,id:this.props.id}
     $.ajax({
        type: "POST",
        url: tempUrl,
       })
      .done(function( msg ) {
             this.props.delTodo(delSendMsg);  
       }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        if(jqXHR.responseText){
            alert(textStatus+': '+jqXHR.responseText);
        }
        else{
            alert(textStatus+': '+errorThrown);
        }
       });
    }else //delete
    {     
     delSendMsg={deltag:1,id:this.props.id};
     $.ajax({
        type: "DELETE",
        url: tempUrl,
       })
      .done(function( msg ) {
         this.props.delTodo(delSendMsg);
       }.bind(this))
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
  openEditTodo(){
    this.setState({normalMode:0});
  }
  submitEditTodo(){
    /* something should to-do:
      set state and change display
      del backend DB
    */
    var tempUrl='http://localhost:3001/todo/'+this.props.id; 
    var modSendMsg;
    var text=this.state;
    console.log('text: '+text);
    if(this.state.oriMsg){
      this.setState({normalMode:1});
     modSendMsg={id:this.props.id, content:this.state.oriMsg};
   
     $.ajax({
        type: "PUT",
        url: tempUrl,
        data: text,
       })
      .done(function( msg ) {
        console.log(msg);
        this.props.modTodo(modSendMsg);  
       }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        if(jqXHR.responseText){
            alert(textStatus+': '+jqXHR.responseText);
        }
        else{
            alert(textStatus+': '+errorThrown);
        }
       });
    }
    else{alert('Please input data');}
  }
  editMsg(e){
        this.setState({oriMsg:e.target.value});
  }
  clearMod() {
        window.location.reload();
      }
  render(){
   
    let msgStyle={}
    let editText={};
    let editButton={};
    let displayDate=(this.props.createdAt).substr(0,10) ;

    if(this.props.deltag)
    {
      msgStyle={textDecorationLine:'line-through'}
      editButton={display:'none'}  
    }
    if(this.state.normalMode){
      editText={display:'none'}
    }
    else{
      editText={display:''}
      msgStyle={display:'none'}
      editButton={display:'none'}
    }
    return(
      <div>
          {/* display mode */}
          <span id="disTodo"style={msgStyle}>
            <Checkbox
              checked={this.props.deltag}
              onChange={this.submitDelTodo}
              color="primary" 
            />                  
            {this.props.content}
          </span>
          <IconButton onClick={this.openEditTodo} style={editButton} color="primary"><EditIcon></EditIcon></IconButton>

          {/* edit mode */} 
          <span id="editTodo" style={editText}>
            <Checkbox
            checked={this.props.deltag}
            onChange={this.submitDelTodo}
            color="primary" disabled
            />           
            <TextField type="text" value={this.state.oriMsg} onChange={this.editMsg}/>
            <IconButton onClick={this.submitEditTodo} color="secondary"><AddCircleIcon></AddCircleIcon></IconButton>
            <IconButton onClick={this.clearMod} color="secondary"><CancelIcon></CancelIcon></IconButton>
          </span> 
          <div style={{paddingLeft:'5%',}}>{displayDate}post.</div>     
      </div>    
    )
  }
}

export { Message }