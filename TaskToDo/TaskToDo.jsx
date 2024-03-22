import React, { useState, useEffect } from 'react';
import './TaskToDo.css';
import axios from 'axios';

function TaskToDo() {
  let [taskToDoTaskName, setTaskToDo] = useState('');
  let [taskToDoArray, setTaskToDoArray] = useState([]);

  const fetchTask = () => {
    axios
      .get('/api/todo')
      .then((response) => {
        console.log('Data:', response.data);
        setTaskToDoArray(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Something went wrong');
      });
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const addTask = (evt) => {
    evt.preventDefault();
    console.log(`The add task to do is ${taskToDoTaskName}`);
    const data = { taskName: taskToDoTaskName };
    axios
      .post('/api/todo', data)
      .then((response) => {
        fetchTask();
        setTaskToDo('');
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong!');
      });
  };

  return (
    <section className="new-task-section">
      <form onSubmit={addTask}>
        <label htmlFor="task-input">New Task</label>
        <input
          id="task-input"
          onChange={(e) => setTaskToDo(e.target.value)}
          value={taskToDoTaskName}
        />

        <button type="submit">Submit New Task</button>
      </form>
      <p>Please complete the following task ${addTask}</p>
      <ul>
        {taskToDoArray.map((task) => {
          return <li key={task.id}>{task.taskName}</li>;
        })}
      </ul>
    </section>
  );
}
