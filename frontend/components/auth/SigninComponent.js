import { useState, useEffect } from 'react'
import axios from '../../axios.config'
import Router from 'next/router'
import { signin, isAuth } from '../../actions/auth'
import Link from 'next/link'

const SignupComponent = () => {
  const [values, setValues] = useState({
    email: 'tom@mail.com',
    password: 'tom@mail.com',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  })

  const { email, password, error, loading, message, showForm } = values

  useEffect(() => {
    isAuth() && Router.push(`/`)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, loading: true, error: false })
    const user = { email, password }

    axios
      .post('/signin', user)
      .then(({ data }) => {
        signin(data, () => {
          if (isAuth()?.role === 1) {
            Router.push(`/admin`)
          } else {
            Router.push(`/user`)
          }
        })
      })
      .catch((e) => {
        console.error(e)
        setValues({ ...values, error: e.response?.data?.error, loading: false })
      })
  }

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const showLoading = () => <div className='alert alert-info'>Loading...</div>
  const showError = () => <div className='alert alert-danger'>{error}</div>
  const showMessage = () => <div className='alert alert-info'>{message}</div>

  const signupForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          value={email}
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          placeholder='Type your email'
        />
      </div>

      <div className='form-group'>
        <input
          value={password}
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          placeholder='Type your password'
        />
      </div>

      <div>
        <button disabled={loading} className='btn btn-primary mr-4'>
          Signin
        </button>
        <Link href='/signup'>
          <a>Signup</a>
        </Link>
      </div>
    </form>
  )

  return (
    <>
      {loading && showLoading()}
      {message && showMessage()}
      {error && showError()}
      {showForm && signupForm()}
      <br />
      <Link href='/auth/forgot'>
        <a className='btn btn-outline-danger btn-sm'>Forgot password</a>
      </Link>
    </>
  )
}

export default SignupComponent
