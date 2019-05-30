import React from "react"
import { Message } from "./Message"

class MessageBlock extends React.Component{

  render(){  
    let todo=this.props.dbData.map((item)=>{
      return<Message key={item.id} id={item.id} content={item.content}
       createdAt={item.createdAt} deltag={item.deltag}
       delTodo={this.props.delTodo} modTodo={this.props.modTodo}/>
    })
    return(<div style={{paddingLeft:'5%',paddingBottom:'15%'}}>{todo}</div>);
  }
}
export { MessageBlock }