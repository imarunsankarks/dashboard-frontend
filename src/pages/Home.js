import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TasksContext } from "../context/TaskContext";
import Dashboard from "../components/Dashboard";
import AllTasks from "../components/AllTasks";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
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
  const [toggle, setToggle] = useState(user.role === 'manager' ? true : false);
  const [name, setName] = useState("");
  const handleToggle = (val = "") => {
    setToggle(!toggle);
    setName(val);
  };
  const names = tasks.map((task) => task.employee);
  const uniqueNames = [...new Set(names)];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/routes/${id}`);
      dispatch({ type: "REMOVE_TASK", payload: id });
      console.log(`Task with id ${id} deleted permanantly`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = (updatedtask) => {
    console.log(updatedtask._id);
    dispatch({ type: "EDIT_TASK", payload: updatedtask })
  }

  return (
    <div className="home">
      <h1>
        Hi <span>{user.name}</span>
      </h1>
      {toggle && (
        <Dashboard uniqueNames={uniqueNames} handleToggle={handleToggle} />
      )}
      {!toggle && (
        <AllTasks
          tasks={tasks}
          name={name || user.name}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Home;
