import React, { Component } from 'react';
import TodoList from './TodoList';
import axios from 'axios';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        Todos: [{
            id: Number,
            title: '',  
            createdAt: '',
            updatedAt: ''  
        }]   
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTodo = this.removeTodo.bind(this); // What is that
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentDidMount = () => {

    axios.get("http://127.0.0.1:8000/api/todos")
      .then(
        (result) => {
          this.setState({
              Todos: result.data
          });
        }
      )
      .catch(err => console.log(err))
  }
  

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = (e) => {
    axios.post("http://127.0.0.1:8000/api/todos", {
            title: this.state.text,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      .then(
          res => res.json())
      .then(
        (result) => {
          this.setState({
              Todos: result
              
          });
        })
      .catch(err => console.log(err))  
  }

  removeTodo = (id) => {
    axios.delete("http://127.0.0.1:8000/api/todos/" + id, {
        todoId:id
    })
    .then()
    .catch(err => console.log(err))  

    this.setState({Todos: this.state.Todos.filter((todo) => { 
        return todo.id !== id 
    })})
  }

  updateTodo = (id, newTitle) => {
    if(!newTitle) return;
    axios.put("http://127.0.0.1:8000/api/todos/" + id, {
        todoId:id,
        title:newTitle
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))  
    this.setState({Todos: this.state.Todos.filter((todo) => { 
        return todo.id !== id ? todo : todo.title = newTitle
    })})
  }
  
  


  render() {
    return (
        <div>
          <h3
          className='text-center'
          >TODO</h3>          
          <TodoList
            todos={this.state}
            remove={this.removeTodo}
            updateTodo={this.updateTodo}
            newUpdate={this.state.text}
            listItems={this.listItems}
          />
          
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo">
              What needs to be done?
            </label>
            <div>
                <input
                    onChange={this.handleChange}
                />
                <button>
                 Submit
                </button>
            </div>
          </form>
        </div>
      );
  }
}

export default Todos;