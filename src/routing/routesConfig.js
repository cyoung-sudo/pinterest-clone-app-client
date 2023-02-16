// App
import App from "../App";
//Features
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Profile from "../features/users/Profile";
import Users from "../features/users/Users";
import Settings from "../features/settings/Settings";
// Components
import HomePage from "../components/static/HomePage";
import NotFound from "../components/errors/NotFound";
import AuthWrapper from "../components/wrappers/AuthWrapper";

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
      },
      {
        path: "/users",
        children:[
          {
            index: true,
            element: <Users/>
          },
          {
            path: ":id",
            element: <Profile/>
          }
        ]
      },
      {
        path: "/settings",
        element: (
          <AuthWrapper>
            <Settings/>
          </AuthWrapper>
        )
      },
    ]
  }
];

export default routesConfig;