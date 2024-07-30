import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/images/resurgent.webp" alt="" />
      </div>
      <div className="nav-links">
        <p>
          <Link to="/">Home</Link>
        </p>

        <p>
          <Link to="/add">Add Task</Link>
        </p>
        <p>Add member</p>
      </div>
      <div className="logout">
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Navbar;
