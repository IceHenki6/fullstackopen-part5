import { useState } from "react"

const NewBlog = ({createBlog}) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()

		const newBlog = {
			title: title,
			author: author,
			url: url
		}

		createBlog(newBlog)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div className="create-blog">
			<form className="create-blog__form" onSubmit={addBlog}>
				<label htmlFor="title">Title: 
					<input type="text" id="title" name="title" value={title} onChange={({target}) => setTitle(target.value)}/>
				</label>
				<label htmlFor="author">Author: 
					<input type="text" id="author" name="author" value={author} onChange={({target}) => setAuthor(target.value)}/>
				</label>
				<label htmlFor="url">Url: 
					<input type="text" id="url" name="url" value={url} onChange={({target}) => setUrl(target.value)}/>
				</label>
				<button className="button" type="submit">Create</button>
			</form>
		</div>
	)
}

export default NewBlog