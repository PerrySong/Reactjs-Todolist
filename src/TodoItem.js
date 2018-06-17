import React, { Component } from 'react';
import axios from 'axios';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        todoItems: [],
        curTodo: props.curTodo,
        text: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTodoItem = this.removeTodoItem.bind(this); // What is that
    this.updateTodoItem = this.updateTodoItem.bind(this);
  }

  componentDidMount = () => {

    axios.get("http://127.0.0.1:8000/api/todos/" + this.state.curTodo.id)
      .then(
        (result) => {
          this.setState({
              todoItems: result.data.todoItems
          });
        }
      )
      .catch(err => console.log(err))
  }
  

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = (e) => {
      console.log('url = ' + "http://127.0.0.1:8000/api/todos/" + this.state.curTodo.id + '/items')
    axios.post("http://127.0.0.1:8000/api/todos/" + this.state.curTodo.id + '/items', {
            content: this.state.text,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      .then(
          res => res.json())
      .then(
        (result) => {
          this.setState({
              todoItems: result.data.content
          });
        })
      .catch(err => console.log(err))  
  }

  removeTodoItem = (id) => {
    axios.delete("http://127.0.0.1:8000/api/todos/" + this.state.curTodo.id + '/items/' + id)
    .then()
    .catch(err => console.log(err))  

    this.setState({todoItems: this.state.todoItems.filter((todoItem) => { 
        return todoItem.id !== id 
    })})
  }

  updateTodoItem = (id, newContent) => {
    axios.put("http://127.0.0.1:8000/api/todos/" + id, {
        content:newContent
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))  
    this.setState({todoItems: this.state.todoItems.filter((todoItem) => { 
        return todoItem.id !== id ? todoItem : todoItem.content = newContent
    })})
  }
  
  


  render() {
      console.log('items = ')
      console.log(this.state.todoItems)
    return (
        <ul>
            {this.state.todoItems.map(todoItem => 
                (<li 
                key={todoItem.id}
                >
                    {todoItem.content}
                    <button onClick={this.removeTodoItem.bind(this, todoItem.id)}>delete</button>
                    <button onClick={this.updateTodoItem.bind(this, todoItem.id, this.state.text)}>update</button>
                </li>
            ))}
            <form
            onSubmit={this.handleSubmit}
            >
                <div>
                    <input
                        onChange={this.handleChange}
                    />
                    <button>
                    Submit
                    </button>
                </div>
            </form>    
        </ul>
      );
  }
}

export default TodoItem;