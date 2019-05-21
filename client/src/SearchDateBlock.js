import React from "react"
import TextField from '@material-ui/core/TextField';

class SearchDateBlock extends React.Component{
    render(){
        return(
          <div>
              <TextField id="bookdate" label="Search by date" type="date" 
              defaultValue="2018-05-24"
        	  InputLabelProps={{shrink: true,}}        	  
              value={this.props.searchDate}
              onChange={this.props.changeDState}/>
          </div>
        )
    }
}
export { SearchDateBlock }