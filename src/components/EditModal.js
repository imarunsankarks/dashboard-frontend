import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const EditModal = ({ show, task, handleClose, handleUpdate }) => {
  // const { state } = useContext(TasksContext);
  // const { tasks } = state;
  // const task = tasks.find((task) => task._id === taskId);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    recurrence: "none",
    deadline: new Date(),
  });

  useEffect(() => {
    if (task) {
      setFormValues({
        title: task.title,
        description: task.description,
        recurrence: task.recurrence,
        deadline: new Date(task.deadline),
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormValues((prevState) => ({
      ...prevState,
      deadline: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = {
        ...task,
        ...formValues,
        deadline: formValues.deadline.toISOString(),
      };
      await axios.patch(
        `http://localhost:4000/api/routes/${task._id}`,
        updatedTask
      );
      handleUpdate(updatedTask);
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Body>
        <h4 className="modal-header">Edit Task</h4>
        <form className="update" onSubmit={handleSubmit}>
          <div className="each-label">
            <label>Task</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={formValues.title}
              required
            />
          </div>
          <div className="">
            <label>Description</label>
            <textarea
              rows="5"
              cols="50"
              name="description"
              onChange={handleChange}
              value={formValues.description}
              required
            ></textarea>
          </div>
          {!task.recurrence.includes(" ") && (
            <>
              <div className="each-label">
                <label>Recurrence </label>
                <select
                  name="recurrence"
                  value={formValues.recurrence}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="each-label">
                <label>Deadline </label>
                <DatePicker
                  selected={formValues.deadline}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </>
          )}
          <div className="buttons">
            <Button
              variant="secondary"
              className="close"
              onClick={() => handleClose(true)}
            >
              Close
            </Button>
            <button className="update">Update</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
