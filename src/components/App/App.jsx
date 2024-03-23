import { useState } from 'react';
import TaskToDo from '../TaskToDo/TaskToDo';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>TO DO APP</h1>
      <TaskToDo />
    </div>
  );
}

export default App;
