
import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';
import axios from 'axios';

const Column = ({ status, tasks, setTasks }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: async (item) => {
      await axios.patch(`http://localhost:4000/api/routes/${item.id}`, { status });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === item.id ? { ...task, status } : task
        )
      );
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={{ background: isOver ? 'lightgray' : 'white' }}>
      <h2>{status}</h2>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task._id} task={task} />
        ))}
    </div>
  );
};

export default Column;
