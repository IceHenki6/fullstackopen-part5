import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const blogLikes = blog.likes + 1

    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blogLikes
    }

    likeBlog(likedBlog, blog.id)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  return (
    <div className="blog">
      <div className="blog-preview">
        <p className="blog-title">{blog.title}</p> <p className="blog-author">by {blog.author}</p>
        <button className="view-btn button" onClick={toggleVisibility} style={hide}>View</button>
        <button className="view-btn button" onClick={toggleVisibility} style={show}>Hide</button>
      </div>

      <div className="blog-info" style={show}>
        <p>{blog.url}</p>
        <div className="likes"><p>{blog.likes}</p> <button onClick={addLike} className="button like-btn">Like</button></div>
        <p>{blog.user.name}</p>
        {user && (user.username === blog.user.username && <button className="delete-blog__btn" onClick={handleDelete}>Delete</button>)}
      </div>
    </div>
  )
}

export default Blog