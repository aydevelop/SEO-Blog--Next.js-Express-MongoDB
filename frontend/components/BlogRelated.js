import Link from 'next/link'
import renderHTML from 'react-render-html'
import moment from 'moment'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API, APP_NAME, DOMAIN },
} = getConfig()

const BlogRelated = ({ blog }) => {
  return (
    <div className='card'>
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className='img img-fluid'
              style={{ maxHeight: 'auto', width: '100%' }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </a>
        </Link>
      </section>

      <div className='card-body'>
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className='card-title'>{blog.title}</h5>
            </a>
          </Link>
          <p className='card-text'>{renderHTML(blog.excerpt)}</p>
        </section>
      </div>

      <div className='card-body'>
        <small>
          <p>
            Posted {moment(blog.updatedAt).fromNow()} by
            <Link href={`/`}>
              <a className='float-right'>{blog.postedBy.name}</a>
            </Link>
          </p>
        </small>
      </div>
    </div>
  )
}

export default BlogRelated
