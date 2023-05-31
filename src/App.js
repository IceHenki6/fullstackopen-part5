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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const blogFormRef = useRef()

  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {

    const getAllBlogs = async () => {
      try {
        const response = await blogService.getAll()
        response.sort((a, b) => b.likes - a.likes)
        setBlogs(response)
      } catch (error) {
        console.log(error)
      }
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
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
    } catch (exception) {
      setErrorMessage('Invalid username or password')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const createBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObj)
      // setBlogs(blogs.concat(newBlog))
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      setNotification(`Blog '${newBlog.title}' created successfully`)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    } catch (error) {
      setErrorMessage('A title and a url must be provided')

      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    } catch (error) {
      console.log(error)
    }
  }

  const likeBlog = async (blogObj, id) => {
    try {
      const updatedBlog = await blogService.update(blogObj, id)

      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      setNotification(`Blog '${updatedBlog.title}' was successfully updated`)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    } catch (error) {
      setErrorMessage('A title and a url must be provided')

      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }


  return (
    <div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {notification && <Notification notification={notification} />}

      {
        user === null
        &&
        <Toggleable buttonLabel='login'>
          <Login handleLogin={handleLogin} handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange} />
        </Toggleable>
      }

      {user !== null && <UserInfo handleLogout={handleLogout} username={user.username} />}

      {
        user !== null
        &&
        <Toggleable buttonLabel='new blog' ref={blogFormRef}>
          <NewBlog createBlog={createBlog} />
        </Toggleable>
      }
      <h2>blogs</h2>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
        )
      }
    </div>
  )
}

export default App