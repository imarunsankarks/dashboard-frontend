import React, { useState, useEffect } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useAuthContext } from "../hooks/useAuthContext";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", {
    month: "short",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
};

const AllTasks = ({
  tasks,
  name,
  handleToggle,
  handleDelete,
  handleUpdate,
}) => {
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [filter, setFilter] = useState("recur");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [del, setDel] = useState('');
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleClose = () => setShow(false);
  const handleShow = (val) => {
    setShow(true)
    setDel(val)
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = (val) => {
    setShowEdit(true)
    setDel(val)
  };
  return (
    <div className="all-tasks-container">
      <button className="back-home-btn" onClick={handleToggle}>
        <ArrowBackRoundedIcon /> Go back
      </button>
      <p>Here is the list of all the tasks assigned to {name}</p>
      <div className="all-filters">
        <div className="recur-filter">
          <span>Recurrence filter</span>
          <select
            name=""
            className="form-select task-filter"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
          >
            <option value="recur">All</option>
            {user.role === 'manager' &&
              <>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>

              </>
            }
            <option value="none">Non-Scheduled</option>
          </select>
        </div>
        <input
          type="date"
          onChange={(e) => {
            setMonth('');
            if (e.target.value) {
              setFilteredTasks(tasks.filter((task) => (task.deadline.split('T')[0] === e.target.value)));
              setDay(e.target.value);
            } else {
              setFilteredTasks(tasks);
              setDay('');
            }

          }}
          id="day-filter"
          value={day}
        />
        <input
          type="month"
          onChange={(e) => {
            setDay('');
            if (e.target.value) {
              setFilteredTasks(tasks.filter((task) => (task.deadline.split('T')[0].substring(0, 7) === e.target.value)));
              setMonth(e.target.value);
            } else {
              setFilteredTasks(tasks);
              setMonth('')
            }

          }}
          id="month-filter"
          value={month}
        />
        <input type="week"
          onChange={(e) => {
            console.log(e.target.value);

          }}
          id="weekInput" name="weekInput" />
      </div>
      <p className="sub-head">
        {filter === "none"
          ? "Non-Scheduled"
          : filter === "recur"
            ? "All"
            : filter}{" "}
        Tasks
      </p>
      {filteredTasks
        .filter((task) =>
          task.employee === name && filter === "recur"
            ? task.recurrence.includes(filter)
            : task.recurrence === filter && task.employee === name
        )
        .map((task) => (
          <div className="task" key={task._id}>
            <p>{task.title}</p>
            <div className="full-description">
              <span className="description">{task.description}</span>
            </div>
            <span
              className="status"
              style={{
                backgroundColor:
                  task.status === "pending"
                    ? "#18bcf3"
                    : task.status === "in progress"
                      ? "Orange"
                      : task.status === "completed"
                        ? "Green"
                        : "Red",
              }}
            >
              {task.status}
            </span>
            <span className="date">{formatDate(task.deadline)}</span>
            <span className="edit" onClick={() => { handleShowEdit(task._id) }}>
              <EditRoundedIcon /> Edit
            </span>
            <EditModal
              show={del === task._id ? showEdit : false}
              task={task}
              handleClose={handleCloseEdit}
              handleUpdate={handleUpdate}
            />
            <span onClick={() => { handleShow(task._id) }}>
              <DeleteForeverRoundedIcon />
            </span>
            <DeleteModal
              show={del === task._id ? show : false}
              handleClose={handleClose}
              handleDelete={handleDelete}
              task={task}
            />
          </div>
        ))}
    </div>
  );
};

export default AllTasks;
