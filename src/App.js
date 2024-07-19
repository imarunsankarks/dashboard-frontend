// App.js
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import Column from './components/Column';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:4000/api/routes');
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Column status="todo" tasks={tasks} setTasks={setTasks} />
        <Column status="ongoing" tasks={tasks} setTasks={setTasks} />
        <Column status="completed" tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default App;
