import "./Navbar.css";
// React
import { useState } from "react";
// Routing
import { Link, NavLink, useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../appSlice";
import { setPopup } from "../popup/slices/popupSlice";
// APIs
import * as authAPI from "../../apis/authAPI";
// Icons
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar({ authUser }) {
  // Collapse toggle
  const [collapse, setCollapse] = useState(true);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Handle user logout
  const handleLogout = () => {
    authAPI.logout()
    .then(res => {
      if(res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setPopup({
          message: "Successfully logged-out",
          type: "success"
        }));

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

      <div 
        id="navbar-collapse-toggle"
        className={collapse ? undefined : "navbar-link-active"}>
        <button onClick={() => setCollapse(state => !state)}>
          <GiHamburgerMenu size={25}/>
        </button>
      </div>

      {/*----- Expanded links -----*/}
      <ul id="navbar-links">
        <li>
          <NavLink
            end
            to="users"
            className={({ isActive }) =>
              isActive ? "navbar-link-active" : undefined}>
            Users
          </NavLink>
        </li>

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
              end
              to={`users/${authUser._id}`}
              className={({ isActive }) =>
                isActive ? "navbar-link-active" : undefined}>
              Profile
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <NavLink
              end
              to="settings"
              className={({ isActive }) =>
                isActive ? "navbar-link-active" : undefined}>
              Settings
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        }
      </ul>
      {/*----- /Expanded links -----*/}

      {/*----- Collapsed links -----*/}
      {!collapse &&
        <ul id="navbar-collapsed-links">
          <li>
            <NavLink
              end
              to="users"
              className={({ isActive }) =>
                isActive ? "navbar-link-active2" : undefined}>
              Users
            </NavLink>
          </li>

          {!authUser &&
            <li>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? "navbar-link-active2" : undefined}>
                Login
              </NavLink>
            </li>
          }

          {!authUser &&
            <li>
              <NavLink
                to="signup"
                className={({ isActive }) =>
                  isActive ? "navbar-link-active2" : undefined}>
                Signup
              </NavLink>
            </li>
          }

          {authUser &&
            <li>
              <NavLink
                end
                to={`users/${authUser._id}`}
                className={({ isActive }) =>
                  isActive ? "navbar-link-active2" : undefined}>
                Profile
              </NavLink>
            </li>
          }

          {authUser &&
            <li>
              <NavLink
                end
                to="settings"
                className={({ isActive }) =>
                  isActive ? "navbar-link-active2" : undefined}>
                Settings
              </NavLink>
            </li>
          }

          {authUser &&
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          }
        </ul>
      }
      {/*----- /Collapsed links -----*/}
    </div>
  );
};