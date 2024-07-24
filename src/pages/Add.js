import { useState, useContext } from "react";
import { TasksContext } from "../context/TaskContext";
import axios from 'axios';
const Add = () => {
  const { dispatch } = useContext(TasksContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [description,setDescription] =useState("");
  const [employee,setEmployee]=useState('Satish');
  const [status,setStatus] = useState('pending');
  const [recur,setRecur] = useState('none');
  const [deadline,setDeadline] = useState(new Date());

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = { 
        title: taskTitle,
        description,
        employee,
        status,
        recur,
        deadline
       };
      await axios.post("http://localhost:4000/api/routes", newTask);
      dispatch({ type: "ADD_TASK", payload: newTask });
      setTaskTitle("");
      setDescription('');
      setEmployee('Satish');
      setStatus('pending');
      setRecur('none');
      setDeadline(new Date());
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <div className="add">
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add Task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add Task</button>
      </form>
    </div>
  );
};

export default Add;
