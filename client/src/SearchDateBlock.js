import React from "react"
import TextField from '@material-ui/core/TextField';
class SearchDateBlock extends React.Component{
    render(){
        return(
          <div>
              <TextField id="bookdate" label="Search by date" type="date" 
        	  InputLabelProps={{shrink: true,}}
              onChange={this.props.changeDState}/>
          </div>
        )
    }
}
export { SearchDateBlock }