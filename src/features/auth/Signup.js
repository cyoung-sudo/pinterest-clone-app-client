import "./Signup.css";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../../components/popup/slices/popupSlice";
// Components
import AuthForm from "../../components/forms/AuthForm";
// APIs
import * as userAPI from "../../apis/userAPI";

export default function Signup() {
  // Controlled input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Signup user
  const handleSubmit = e => {
    e.preventDefault();

    // Validations
    if(username === "" || password === "") {
      dispatch(setPopup({
        message: "Missing input field",
        type: "error"
      }));
    } else {
      // Create user
      userAPI.create(username, password)
      .then(res => {
        if(res.data.success) {
          dispatch(setPopup({
            message: "Successfully signed-up",
            type: "success"
          }));

          // Redirect to login page
          navigate("/login");
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