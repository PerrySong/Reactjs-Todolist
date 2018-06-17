import React, { Component } from 'react';
import axios from 'axios';

class todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos.Todos,
      curTodo: {}
    }
    this.selectTodo = this.selectTodo.bind(this)
  } 

  get = () => {

    
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

    // const curTodo = this.state.todos.filter((todo) => {
    //   return todo.id === id
    // })
    // this.setState({
    //   curTodo: curTodo
    // }) 
   
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
                <ul>
                  {this.state.curTodo.todoItems.map(item => (
                    <li>{item.content}</li>
                  ))}
                </ul>
              }
            </li>)
        )}
      </ul>
    );
  }
}


export default todolist;