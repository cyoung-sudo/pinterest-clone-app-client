import "./App.css";
// Routing
import { Outlet } from "react-router-dom";
// Components
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";

function App() {
  return (
    <div id="app">
      <Navbar/>
      <div id="app-content">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
