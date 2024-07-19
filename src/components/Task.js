// components/Task.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {task.title}
    </div>
  );
};

export default Task;
