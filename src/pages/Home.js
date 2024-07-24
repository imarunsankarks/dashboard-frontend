import React, { useContext } from "react";
import { TasksContext } from "../context/TaskContext";
const Home = () => {
    const {state} = useContext(TasksContext); 
    const {tasks} = state; 
  return (
    <div className="home">
      <h1>Home</h1>
      <div>
        {tasks.map((task) => (
          <div key={task._id}>{task.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
