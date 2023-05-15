import { useState } from "react"

const Blog = ({blog}) => {
	const [visible, setVisible] = useState(false)
	
	const hide = {display: visible ? 'none' : ''}
	const show = {display: visible ? '' : 'none'}

	const toggleVisibility = () => {
		setVisible(!visible)
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
				<p>{blog.likes}</p>
				<p>{blog.user.name}</p>
			</div> 
		</div>  
	)
}

export default Blog