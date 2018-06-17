import React, { Component } from 'react';
import './App.css';
import './Todo';
import Todo from './Todo';
import cors from 'cors';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    
    return (
      <div
      className='center'
      >
        <Todo/>
      </div>
    )
  }
}

export default App;
