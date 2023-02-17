import "./UsersDisplay.css";
// React
import { useState } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Pagination from "../pagination/Pagination";

export default function UsersDisplay({ users, imageCount }) {
  // Pagination
  const [pageContent, setPageContent] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <div id="usersDisplay">
      <div id="usersDisplay-pagination-wrapper">
        <Pagination 
          items={ users }
          itemsPerPage={ 10 }
          page={ page }
          setPage={ setPage }
          setPageContent={ setPageContent }/>
      </div>

      {(pageContent.length > 0) &&
        <ul id="usersDisplay-list">
          {pageContent.map((user, idx) => (
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
      }
    </div>
  );
};