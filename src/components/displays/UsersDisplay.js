import "./UsersDisplay.css";
// Routing
import { Link } from "react-router-dom";

export default function UsersDisplay({ users, imageCount }) {
  return (
    <div id="usersDisplay">
      <ul id="usersDisplay-list">
        {users.map((user, idx) => (
          <li key={ idx }>
            <div className="usersDisplay-username">{ user.username }</div>
            <div className="usersDisplay-badges">
              <span>Images: { imageCount[idx] }</span>
            </div>
            <div className="usersDisplay-date">Joined: { new Date(user.createdAt).toDateString() }</div>
            <div className="usersDisplay-links">
              <Link to={`/users/${user._id}`}>View Profile</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};