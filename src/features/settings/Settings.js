import "./Settings.css";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../appSlice";
import { setPopup } from "../../components/popup/slices/popupSlice";
// APIs
import * as authAPI from "../../apis/authAPI";
import * as userAPI from "../../apis/userAPI";
import * as imageAPI from "../../apis/imageAPI";

export default function Settings() {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Delete user and relevant images
  const handleDelete = () => {
    // Check session status
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        let result = window.confirm("Are you sure you want to delete this account?");
        if(result) {
          let authUser = res.data.user;

          // Delete images for given user
          imageAPI.deleteForUser(authUser._id)
          .then(res2 => {
            if(res2.data.success) {
              // Delete given user
              return userAPI.deleteUser(authUser._id);
            } else {
              return { message: res2.data.message };
            }
          })
          .then(res2 => {
            if(res2.message) {
              return { message: res2.message };
            } else if(res2.data.success) {
              // Logout user
              return authAPI.logout();
            } else {
              return { message: res2.data.message };
            }
          })
          .then(res2 => {
            if(res2.message) {
              dispatch(setPopup({
                message: res2.message,
                type: "error"
              }));
            } else if(res2.data.success) {
              dispatch(setAuthUser(null));
              dispatch(setPopup({
                message: "Successfully deleted account",
                type: "success"
              }));

              // Redirect to home page
              navigate("/");
            }
          })
          .catch(err => console.log(err));
        }
      } else {
        // Expired session
        expiredSession();
      }
    })
    .catch(err => console.log(err));
  };

  //----- Handle expired sessions
  const expiredSession = () => {
    dispatch(setAuthUser(null));
    dispatch(setPopup({
      message: "Session has expired",
      type: "error"
    }));

    // Redirect to home page
    navigate("/");
  };

  return (
    <div id="settings">
      <div id="settings-header">
        <h1>Settings</h1>
      </div>

      <div id="settings-actions">
        <div className="settings-action">
          <div>Delete Account?</div>
          <button onClick={ handleDelete }>Delete</button>
        </div>
      </div>
    </div>
  );
};