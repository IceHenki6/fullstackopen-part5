import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import UserInfo from './components/UserInfo'
import NewBlog from './components/NewBlog'
import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)

	// const [title, setTitle] = useState("")
	// const [author, setAuthor] = useState("")
	// const [url, setUrl] = useState("")

	const blogFormRef = useRef()

	const [errorMessage, setErrorMessage] = useState(null)
	const [notification, setNotification] = useState(null)

  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )
		const getAllBlogs = async () => {
			try{
				const response = await blogService.getAll()
				setBlogs(response)
			}catch(error){
				console.log(error)
			}
		}
		
		getAllBlogs()
  }, [])

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedBloglistUser')
		if(loggedUserJson){
			const user = JSON.parse(loggedUserJson)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleUsernameChange = ({target}) => {
		setUsername(target.value)
	}

	const handlePasswordChange = ({target}) => {
		setPassword(target.value)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		
		try{
			const user = await loginService.login({
				username,
				password
			})
			
			window.localStorage.setItem(
				'loggedBloglistUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		}catch(exception){
			setErrorMessage("Invalid username or password")

			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBloglistUser')
		setUser(null)
	}

	const createBlog = async (blogObj) => {
		blogFormRef.current.toggleVisibility()
		try{
			const newBlog = await blogService.create(blogObj)

			// setBlogs(blogs.concat(newBlog))
			const blogs = await blogService.getAll()
			setBlogs(blogs)
			setNotification(`Blog '${newBlog.title}' created successfully`)
			setTimeout(() => {
				setNotification(null)
			}, 4000)
		}catch(error){
			setErrorMessage("A title and a url must be provided")

			setTimeout(() => {
				setErrorMessage(null)
			}, 4000)
		}
	}

	// const handleTitleChange = ({target}) => {
	// 	setTitle(target.value)
	// }

	// const handleAuthorChange = ({target}) => {
	// 	setAuthor(target.value)
	// }

	// const handleUrlChange = ({target}) => {
	// 	setUrl(target.value)
	// }

  return (
    <div>
			{errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
			{notification && <Notification notification={notification}/>}

			{
				user === null 
				&&
				<Toggleable buttonLabel='login'>
					<Login handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} 
					handlePasswordChange={handlePasswordChange}/>
				</Toggleable> 
			}

			{user != null && <UserInfo handleLogout={handleLogout} username={user.username}/>}

			{
				user != null 
				&& 
				<Toggleable buttonLabel='new blog' ref={blogFormRef}>
					<NewBlog createBlog={createBlog}/>
				</Toggleable>
			}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App