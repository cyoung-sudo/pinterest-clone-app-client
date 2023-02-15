import "./UsersDisplay.css";
// Routing
import { Link } from "react-router-dom";

export default function UsersDisplay({ users, imageCount }) {
  return (
    <div id="usersDisplay">
      <ul id="usersDisplay-list">
        {users.map((user, idx) => (
          <li key={ idx }>
            <div>{ user.username }</div>
            <div>Images: { imageCount[idx] }</div>
            <div>Joined: { new Date(user.createdAt).toDateString() }</div>
            <div>
              <Link to={`/users/${user._id}`}>View Profile</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};