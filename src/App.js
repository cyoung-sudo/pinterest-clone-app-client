import "./App.css";
// React
import { useState, useEffect } from "react";
// Routing
import { Outlet } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "./appSlice";
// APIs
import * as authAPI from "./apis/authAPI";
// Components
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import Popup from "./components/popup/Popup";

function App() {
  // Loading status
  const [loaded, setLoaded] = useState(false);
  // State
  const { authUser }  = useSelector((state) => state.app);
  const { message, type } = useSelector((state) => state.popup);
  // Hooks
  const dispatch = useDispatch();

  //----- Retrieve authenticated user on load
  useEffect(() => {
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        dispatch(setAuthUser(res.data.user));
      }

      setLoaded(true);
    })
    .catch(err => console.log(err));
  }, []);

  if(loaded) {
    return (
      <div id="app">
        <Navbar authUser={ authUser }/>
        <div id="app-content">
          <Popup
            message={ message }
            type={ type }
            delay={ 3000 }/>
          <Outlet/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
