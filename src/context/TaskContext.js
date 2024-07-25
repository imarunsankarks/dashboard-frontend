import { createContext, useReducer } from 'react';

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
        tasks: action.payload,
      };
    case 'ADD_TASK':
      return {
        tasks: [ action.payload, ...state.tasks],
      };
    case 'REMOVE_TASK':
      return {
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create a provider component
const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksProvider, TasksContext, tasksReducer };
