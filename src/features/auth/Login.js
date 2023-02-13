import "./Login.css";

export default function Login() {

  //----- Handle github authentication
  const handleGithubAuth = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  return (
    <div id="login">
      <div id="login-header">
        <h1>Login</h1>
      </div>

      <button onClick={handleGithubAuth}>Login using Github</button>
    </div>
  );
};