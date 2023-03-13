import "./Users.css";
// React
import { useState, useEffect } from "react";
// Components
import UsersDisplay from "../../components/displays/UsersDisplay";
import Loading from "../../components/static/Loading";
// APIs
import * as userAPI from "../../apis/userAPI";
import * as imageAPI from "../../apis/imageAPI";

export default function Users() {
  // Requested data
  const [users, setUsers] = useState(null);
  const [imageCount, setImageCount] = useState(null);

  //----- Retrieve all users & image-count on load
  useEffect(() => {
    // Retrieve all users
    userAPI.getAll()
    .then(res => {
      if(res.data.success) {
        // Set from newest -> oldest
        let reversedUsers = res.data.users.reverse();
        setUsers(reversedUsers);
        return { users: reversedUsers };
      } else {
        return { users: [] };
      }
    })
    .then(res => {
      let promises = [];

      // Retrieve images for each user
      res.users.forEach(user => {
        promises.push(imageAPI.getForUser(user._id));
      });

      return Promise.all(promises);
    })
    .then(res => {
      // Save image-counts
      res.forEach((response, idx) => {
        let count = response.data.images.length;
        if(idx === 0) {
          setImageCount([count]);
        } else {
          setImageCount(state => [...state, count]);
        }
      });
    })
    .catch(err => console.log(err));
  }, []);

  if(users && imageCount) {
    return (
      <div id="users">
        <div id="users-header">
          <h1>Users</h1>
        </div>
  
        <div id="users-list-wrapper">
          <UsersDisplay
            users={ users }
            imageCount={ imageCount }/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};