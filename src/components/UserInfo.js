
const UserInfo = ({handleLogout, username}) => {
	return(
		<div className="user-info">
			<h3>{username}</h3>
			<button className="button logout-btn" onClick={handleLogout}>Logout</button>
		</div>
	)
}

export default UserInfo