import React from "react"

class InputTask extends React.Component {
    render() {
        return (
            <div>
            <input type="text" value={this.props.content}/>
            <button onClick={this.props.submitEditTodo}>Fin</button>
            </div>)
    }
}

export { InputTask }