const AllTasks = ({ tasks,name,handleToggle }) => {
  return (
    <div className="all-tasks-container">
        <button onClick={handleToggle}>Go back</button>
        <p>Here is the list of all the tasks assigned to {name}</p>
        <p className="sub-head">All Tasks</p>
      {tasks.filter((task)=>(task.employee === name)).map((task) => (
        <div className="task" key={task._id}>
          <h3>{task.title}</h3>
          <span className="description">{task.description}</span>
          <span className="status" style={{backgroundColor:task.status === 'pending'?'#18bcf3':(task.status === 'ongoing'?'Orange':'Green')}}>{task.status}</span>
        </div>
      ))}
    </div>
  );
};

export default AllTasks;
