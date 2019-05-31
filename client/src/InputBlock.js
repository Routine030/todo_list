import React from "react"
import $ from 'jquery';
import TextField from '@material-ui/core/TextField';
import { SearchBlock } from "./SearchBlock"
import { SearchDateBlock } from "./SearchDateBlock"
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/PlaylistAdd';
import DateIcon from '@material-ui/icons/DateRange';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

class InputBlock extends React.Component{
  constructor(props){
    super(props)
    this.state = ({createtodo:'',displaysearchtext:0,displaysearchdate:0})
    this.changeState = this.changeState.bind(this)
    this.submitTodo = this.submitTodo.bind(this)
    this.searchByText = this.searchByText.bind(this)
    this.searchByDate = this.searchByDate.bind(this)
  }
  changeState(event){
    this.setState({createtodo:event.target.value})
  }    
async submitTodo(){
      /* something should to-do:*/ 
      if(this.state.createtodo===''){
          alert('Please input data')
      }
      else{
        var text=(this.state);
        let ret;
        try{
          ret = await $.ajax({
                  method: "POST",
                  url: "http://localhost:3001/",
                  data: text,
                })
        }
        catch(err){
          if(err.responseText){
            alert('error: '+err.responseText);
          }
          else{
           alert('error: '+err.statusText);
          }          
          return;
        }
        this.props.addTodo(ret[0]);//set state
        this.setState({createtodo:''});//change display
      }
  }
  searchByText(){
  	if(this.state.displaysearchtext){
  		this.setState({displaysearchtext:0});
  	}else{
    	this.setState({displaysearchtext:1});
    }
  }
  searchByDate(){
  	if(this.state.displaysearchdate){
  		this.setState({displaysearchdate:0});
  	}else{
   		this.setState({displaysearchdate:1});
   	}
  }          
  render(){

  	let distext={};
  	let disdate={};

	if(this.state.displaysearchtext){
      distext={display:''}
    }
    else{
      distext={display:'none'}
    }
    if(this.state.displaysearchdate){
      disdate={display:''}
    }
    else{
      disdate={display:'none'}
    }
    return(       	
    <div>
      <Grid container
	  		direction="row"
	  		justify="center"
	  		alignItems="center">
	  		<Grid item>
	      		<TextField
	         		id="input-addto"
	          		label="add to-do"
	          		type="text"
	          		className={this.props.textField}
	          		margin="normal"
	          		variant="outlined"
	          		value={this.state.createtodo}
	          		onChange={this.changeState}
	      		/>
   			</Grid>
			<Grid item>
				<IconButton type="button" onClick={this.submitTodo} color="primary"><AddIcon fontSize="large"></AddIcon></IconButton>
				<IconButton type="button" onClick={this.searchByText} color="primary"><SearchIcon fontSize="large">Search</SearchIcon></IconButton>
				<IconButton type="button" onClick={this.searchByDate} color="primary"><DateIcon fontSize="large">Date</DateIcon></IconButton >
			</Grid>
	  </Grid>
	  <Grid
		container
		direction="column"
		justify="center"
		alignItems="center">
			<Grid item>
				<div id="searchByText" style={distext}>
			    <SearchBlock changeState={this.props.changeState}/>
				</div>
			</Grid>
			<Grid item>
				<div id="searchByDate" style={disdate}>
				<SearchDateBlock changeDState={this.props.changeDState}/>
        		</div>
        	</Grid>
      </Grid>
    </div>
    )
  }
}

export { InputBlock }
