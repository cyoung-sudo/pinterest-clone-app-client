// React
import { useEffect, useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../appSlice";
import { setPopup } from "../popup/slices/popupSlice";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";

export default function AuthWrapper({ children }) {
  // Requested data
  const [access, setAccess] = useState(false);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Check authentication on load
  useEffect(() => {
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        setAccess(true);
      } else {
        dispatch(setPopup({
          message: "Authentication required",
          type: "error"
        }));
        dispatch(setAuthUser(null));
  
        // Redirect to home page
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(access) {
    return children;
  }
};