import "./Login.css";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../appSlice";
import { setPopup } from "../../components/popup/slices/popupSlice";
// Components
import AuthForm from "../../components/forms/AuthForm";
// APIs
import * as authAPI from "../../apis/authAPI";
// Icons
import { BsGithub } from "react-icons/bs";

export default function Login() {
  // Controlled input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Handle user/pass authentication
  const handleSubmit = e => {
    e.preventDefault();

    // Validations
    if(username === "" || password === "") {
      dispatch(setPopup({
        message: "Missing required information",
        type: "error"
      }));
    } else {
      // Login user
      authAPI.login(username, password)
      .then(res => {
        if(res.data.success) {
          dispatch(setAuthUser(res.data.user));
          dispatch(setPopup({
            message: "Successfully logged-in",
            type: "success"
          }));

          // Redirect to profile page
          navigate(`/users/${res.data.user._id}`);
        } else {
          dispatch(setPopup({
            message: res.data.message,
            type: "error"
          }));
        }
      })
      .catch(err => console.log(err));
    }
  };

  //----- Handle github authentication
  const handleGithubAuth = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  return (
    <div id="login">
      <div id="login-header">
        <h1>Login</h1>
      </div>

      <div id="login-form-wrapper">
        <AuthForm
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit={ handleSubmit }/>
      </div>

      <div id="login-divider">
        <hr/>
        or
        <hr/>
      </div>

      <div id="login-alts">
        <button onClick={handleGithubAuth}>
          <span><BsGithub size={ 20 }/></span>Github
        </button>
      </div>
    </div>
  );
};