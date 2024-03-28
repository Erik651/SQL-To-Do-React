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

  //delete Task
  const removeTask = (id) => {
    console.log(id, 'removeTask');
    axios
      .delete(`/api/todo/${id}`)
      .then((response) => {
        fetchTask();
      })
      .catch((error) => {
        console.log(error, `error`);
        alert(`Something went wrong`);
      });
  };

  // mark task as completed
  const toggleTask = (id) => {
    console.log('toggle', id);
    axios
      .put(`api/todo/${id}`)
      .then((response) => {
        fetchTask();
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong');
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
      <p>
        Click Submit New Task to add, "{taskToDoTaskName}" to Task To DO List
      </p>
      {taskToDoArray.map((task) => (
        <div
          className={task.isCompleted ? 'completed' : 'not-completed'}
          key={task.id}
        >
          {task.taskName} + is + {task.isCompleted}
          <button
            style={{ backgroundColor: 'green' }}
            onClick={() => removeTask(task.id)}
          >
            Delete
          </button>
          {task.isCompleted ? (
            <button
              style={{ backgroundColor: 'blue' }}
              onClick={() => toggleTask(task.id)}
            >
              Undo
            </button> //else
          ) : (
            <button
              style={{ backgroundColor: 'red' }}
              onClick={() => toggleTask(task.id)}
            >
              To Do
            </button>
          )}
          {task.isCompleted && <div>Tasks I've Completed</div>}
          {/*return <li key={task.id}>{task.taskName}</li>;*/}
        </div>
      ))}
    </section>
  );
}

export default TaskToDo;
