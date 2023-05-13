
const Blog = ({blog}) => (
  <div className="blog">
    <p className="blog-title">{blog.title}</p> <p className="blog-author">by {blog.author}</p>
  </div>  
)

export default Blog