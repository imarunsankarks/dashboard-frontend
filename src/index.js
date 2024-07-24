import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TasksProvider } from './context/TaskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TasksProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TasksProvider>
);


