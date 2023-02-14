import "./App.css";
// React
import { useState, useEffect } from "react";
// Routing
import { Outlet } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setUser } from "./appSlice";
// APIs
import * as authAPI from "./apis/authAPI";
// Components
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import Popup from "./components/popup/Popup";
import Loading from "./components/static/Loading";

function App() {
  // Loading status
  const [loaded, setLoaded] = useState(false);
  // Hooks
  const dispatch = useDispatch();

  //----- Retrieve authenticated user on load
  useEffect(() => {
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        dispatch(setUser(res.data.user));
      }

      setLoaded(true);
    })
    .catch(err => console.log(err));
  }, []);

  if(loaded) {
    return (
      <div id="app">
        <Navbar/>
        <div id="app-content">
          <Popup/>
          <Outlet/>
        </div>
        <Footer/>
      </div>
    );
  } else {
    return <Loading/>;
  }
}

export default App;
