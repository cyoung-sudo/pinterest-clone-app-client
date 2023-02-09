// App
import App from "../App";
//Features
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
// Components
import HomePage from "../components/static/HomePage";
import NotFound from "../components/errors/NotFound";

const routesConfig = [
  {
    path: "/", 
    element: <App/>,
    errorElement: <NotFound/>,
    children:[
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      }
    ]
  }
];

export default routesConfig;