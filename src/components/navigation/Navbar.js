import "./Navbar.css";
// Routing
import { Link, NavLink, useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../appSlice";
// APIs
import * as authAPI from "../../apis/authAPI";

export default function Navbar() {
  // State
  const authUser = useSelector((state) => state.app.authUser);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Handle user logout
  const handleLogout = () => {
    authAPI.logout()
    .then(res => {
      if(res.data.success) {
        console.log("Logged out");

        dispatch(setUser(null));

        // Redirect to home page
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div id="navbar">
      <div id="navbar-logo">
        <Link to="/">Pinterest Clone</Link>
      </div>

      <ul id="navbar-links">
        {!authUser &&
          <li>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? "navbar-link-active" : undefined}>
              Login
            </NavLink>
          </li>
        }

        {!authUser &&
          <li>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? "navbar-link-active" : undefined}>
              Signup
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <NavLink
              to={`users/${authUser._id}`}
              className={({ isActive }) =>
                isActive ? "navbar-link-active" : undefined}>
              Profile
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        }
      </ul>
    </div>
  );
};