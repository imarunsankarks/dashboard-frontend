import { useState, useContext } from "react";
import { TasksContext } from "../context/TaskContext";
import axios from "axios";
const Add = () => {
  const { dispatch } = useContext(TasksContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employee, setEmployee] = useState("Satish");
  const [status, setStatus] = useState("pending");
  const [recur, setRecur] = useState("none");
  const [deadline, setDeadline] = useState(new Date());

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title: taskTitle,
        description,
        employee,
        status,
        recurrence:recur,
        deadline,
      };
      const addedTask = await axios.post(
        "http://localhost:4000/api/routes",
        newTask
      );
      dispatch({ type: "ADD_TASK", payload: addedTask.data });
      setTaskTitle("");
      setDescription("");
      setEmployee("Satish");
      setStatus("pending");
      setRecur("none");
      setDeadline(new Date());
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <div className="add">
      <h1>
        Hi <span>Manager</span>
      </h1>
      <p className="sub-head">Assign a new tasks</p>
      <form onSubmit={addTask}>
        <div className="each-field">
          <label>Task</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div className="each-field">
          <label>Description</label>
          <textarea
          rows={5}
          column={15}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="each-field">
          <label>Assigned to</label>
          <select name="" id="" onChange={(e)=>{setEmployee(e.target.value)}} value={employee}>
            <option value="Satish">Satish</option>
            <option value="Navya">Navya</option>
            <option value="Arun">Arun</option>
          </select>
        </div>
        <div className="each-field">
          <label>Recurrence</label>
          <select name="" id="" onChange={(e)=>{setRecur(e.target.value)}} value={recur}>
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
       <div className="add-btn">
        <button>Add Task</button>

       </div>
      </form>
    </div>
  );
};

export default Add;
