import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem'

class todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos.Todos,
      curTodo: {}
    }
    this.selectTodo = this.selectTodo.bind(this)
  } 

  selectTodo = (id) => {
    console.log('id = ' + id)
    axios.get("http://127.0.0.1:8000/api/todos/" + id)
    .then(
      (result) => {
        console.log(result.data);
        this.setState({
            curTodo: result.data
        });
      }
    )
    .catch(err => console.log(err))
  }
  
  render = () => {
    const removeTodo = this.props.remove;
    const updateTodo = this.props.updateTodo;
    
    return (
      <ul>
        {this.props.todos.Todos.map(todo => 
          (<li 
            key={todo.id}
            onMouseEnter={this.selectTodo.bind(this, todo.id)}
            >
            {todo.title}
            <button onClick={removeTodo.bind(this, todo.id)}>delete</button>
            <button onClick={updateTodo.bind(this, todo.id, this.props.newUpdate)}>update</button>
              {this.state.curTodo.id === todo.id &&
                <TodoItem
                curTodo={this.state.curTodo}
                />
              }
            </li>)
        )}
      </ul>
    );
  }
}


export default todolist;