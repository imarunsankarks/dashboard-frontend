import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout()
  const handleClick = () => {
    logout();
  }
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/images/resurgent.webp" alt="" />
      </div>
      {user.role === 'manager' && <div className="nav-links">
        <p>
          <Link to="/">Home</Link>
        </p>

        <p>
          <Link to="/add">Add Task</Link>
        </p>
        <p><Link to="/new-member">Add Member</Link></p>
      </div>}
      <div className="logout">
        <p onClick={handleClick}><LogoutIcon /> Logout</p>
      </div>
    </div>
  );
};

export default Navbar;
