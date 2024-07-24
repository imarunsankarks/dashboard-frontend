import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Create the context
const TasksContext = createContext();

// Define initial state
const initialState = {
  tasks: [],
};

// Define a reducer function
const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create a provider component
const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:4000/api/routes');
      dispatch({ type: 'SET_TASKS', payload: response.data });
    };

    fetchTasks();
    console.log("in useEffect");
  }, []);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksProvider, TasksContext };
