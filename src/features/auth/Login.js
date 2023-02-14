import "./Login.css";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setUser } from "../../appSlice";
// Components
import AuthForm from "../../components/forms/AuthForm";
// APIs
import * as authAPI from "../../apis/authAPI";

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
      console.log("Fill out all input fields");
    } else {
      // Login user
      authAPI.login(username, password)
      .then(res => {
        if(res.data.success) {
          console.log("Logged in");

          dispatch(setUser(res.data.user));

          // Redirect to profile page
          navigate(`/users/${res.data.user._id}`);
        } else {
          console.log(res.data.message);
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

      <button onClick={handleGithubAuth}>Login using Github</button>
    </div>
  );
};