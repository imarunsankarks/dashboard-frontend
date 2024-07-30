import React, { useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate(); 
  const month = date.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
  const year = date.getUTCFullYear(); 
  return `${day} ${month} ${year}`;
};

const AllTasks = ({ tasks, name, handleToggle, handleDelete }) => {
  const [filter, setFilter]= useState('recur');
  return (
    <div className="all-tasks-container">
      <button onClick={handleToggle}>Go back</button>
      <p>Here is the list of all the tasks assigned to {name}</p>
      <select
            name=""
            className="form-select"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
          >
            <option value="recur">All</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="none">Non-Scheduled</option>
          </select>
      <p className="sub-head">All Tasks</p>
      {tasks.filter((task) => task.employee === name && filter==='recur'?task.recurrence.includes(filter):task.recurrence === filter ).map((task) => (
        <div className="task" key={task._id}>
          <h3>{task.title}</h3>
          <div className="full-description">
            <span className="description">{task.description}</span>
          </div>
          <span
            className="status"
            style={{ backgroundColor: task.status === 'pending' ? '#18bcf3' : (task.status === 'in progress' ? 'Orange' : (task.status === 'completed' ? 'Green' : 'Red')) }}
          >
            {task.status}
          </span>
          <span className='date'>{formatDate(task.deadline)}</span>
          <span className="edit"><EditRoundedIcon /> Edit</span>
          <span className="edit" onClick={()=>{handleDelete(task._id)}}><DeleteForeverRoundedIcon /></span>
        </div>
      ))}
    </div>
  );
};

export default AllTasks;
