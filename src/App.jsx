import React, { useEffect, useState } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header';
import TaskDetails from './components/TaskDetails';
import "./App.css";
import AddTask from "./components/AddTask";

import Tasks from "./components/Tasks"

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Estudar Programação',
      comleted: false,
    },
    {
      id: '2',
      title: 'Estudar Figma',
      comleted: false,
    },
    {
      id: '3',
      title: 'HTML e CSS',
      comleted: false,
    }

  ]);

  useEffect(() => {
    const fetchTasks = async () => {
      const {data} = await axios.get(
        "https://jsonplaceholder.cypress.io/todos?_limit=10"
        ); 
        setTasks(data)
    };
    fetchTasks();
  }, []);

  const handleAddTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed }

      return task;
    });

    setTasks(newTasks);
  };

  const handleTaskAddition = (taskTitle) => {
      const newTasks = [
        ...tasks, 
        {
          title: taskTitle,
          id: uuidv4(),
          completed: false,
      },
    ];
    setTasks(newTasks);
  };

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter( task => task.id != taskId)

    setTasks(newTasks)
  }

  return(
    <Router>
        <div className="container">
          <Header/>
          <Route
              path="/"
              exact
              render={() => (
                <>
                          <AddTask handleTaskAddition={handleTaskAddition}/>
                          <Tasks 
                              tasks={tasks} 
                              handleAddTaskClick = {handleAddTaskClick}
                              handleTaskDeletion={handleTaskDeletion}
                          />
                </>
              )}
          />
          <Route path="/:taskTitle" exact component={TaskDetails}/>
        </div>
        
    </Router>
    
  );
};
export default App;