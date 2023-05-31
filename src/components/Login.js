
const Login = ({ handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div className="login">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="username">Username:
          <input type="text" name="username" id="username" onChange={handleUsernameChange} />
        </label>

        <label htmlFor="password">Password:
          <input type="password" name="password" id="password" onChange={handlePasswordChange} />
        </label>

        <button className="button" id="login-btn" type="submit">Login</button>
      </form>
    </div>
  )
}


export default Login