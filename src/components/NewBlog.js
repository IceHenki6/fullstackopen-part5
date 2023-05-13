
const NewBlog = ({createBlog, handleTitleChange, handleAuthorChange, handleUrlChange}) => {
	return (
		<div className="create-blog">
			<form className="create-blog__form" onSubmit={createBlog}>
				<label htmlFor="title">Title: 
					<input type="text" id="title" name="title" onChange={handleTitleChange}/>
				</label>
				<label htmlFor="author">Author: 
					<input type="text" id="author" name="author" onChange={handleAuthorChange}/>
				</label>
				<label htmlFor="url">Url: 
					<input type="text" id="url" name="url" onChange={handleUrlChange}/>
				</label>
				<button className="button" type="submit">Create</button>
			</form>
		</div>
	)
}

export default NewBlog