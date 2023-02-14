import "./UsersDisplay.css";

export default function UsersDisplay({ users }) {
  return (
    <div id="usersDisplay">
      <ul id="usersDisplay-list">
        {users.map((user, idx) => (
          <li key={ idx }>
            <div>{ user.username }</div>
          </li>
        ))}
      </ul>
    </div>
  );
};