import "./Profile.css";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// APIs
import * as userAPI from "../../apis/userAPI";

export default function Profile() {
  // Requested data
  const [user, setUser] = useState(null);
  // Hooks
  const { id } = useParams();

  //----- Retrieve given user on load
  useEffect(() => {
    userAPI.getUser(id)
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(user) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{ user.username }'s Profile</h1>
        </div>
      </div>
    );
  }
};