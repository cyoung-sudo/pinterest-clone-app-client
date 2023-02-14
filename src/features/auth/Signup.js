import "./Signup.css";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// Components
import AuthForm from "../../components/forms/AuthForm";
// APIs
import * as userAPI from "../../apis/userAPI";

export default function Signup() {
  // Controlled input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const navigate = useNavigate();

  //----- Signup user
  const handleSubmit = e => {
    e.preventDefault();

    // Validations
    if(username === "" || password === "") {
      console.log("Fill out all input fields");
    } else {
      // Create user
      userAPI.create(username, password)
      .then(res => {
        if(res.data.success) {
          console.log("Signed up");

          // Redirect to login page
          navigate("/login");
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div id="signup">
      <div id="signup-header">
        <h1>Signup</h1>
      </div>

      <div id="signup-form-wrapper">
        <AuthForm
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit={ handleSubmit }/>
      </div>
    </div>
  );
};