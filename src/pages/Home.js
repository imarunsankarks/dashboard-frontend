import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TasksContext } from "../context/TaskContext";
import Dashboard from "../components/Dashboard";
import AllTasks from "../components/AllTasks";
const Home = () => {
  const { state, dispatch } = useContext(TasksContext);
  const { tasks } = state;
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/routes");
        dispatch({ type: "SET_TASKS", payload: response.data });
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, [dispatch]);
  const [toggle,setToggle]=useState(true);
  const [name,setName] = useState('');
  const handleToggle= (val='')=>{
    setToggle(!toggle);
    setName(val);
  }
  const names = tasks.map((task) => task.employee);
  const uniqueNames = [...new Set(names)];


  return (
    <div className="home">
      <h1>Hi <span>Manager</span></h1>
      {toggle && <Dashboard uniqueNames={uniqueNames} handleToggle={handleToggle} />}
      {!toggle && <AllTasks tasks={tasks} name={name} handleToggle={handleToggle}/>}
    </div>
  );
};

export default Home;
