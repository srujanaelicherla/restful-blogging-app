import { useState } from 'react'
import api from '../api/api'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const res = await api.post('/auth/login', {
      email,
      password
    })

    localStorage.setItem(
      'token',
      res.data.token
    )

    navigate('/')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950 text-white'>
      <form
        onSubmit={handleSubmit}
        className='w-[400px] bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl'
      >
        <h1 className='text-4xl font-bold mb-8 text-center'>
          Welcome Back
        </h1>

        <input
          type='email'
          placeholder='Email'
          className='w-full p-4 rounded-xl bg-white/10 border border-white/10 mb-5 outline-none'
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Password'
          className='w-full p-4 rounded-xl bg-white/10 border border-white/10 mb-6 outline-none'
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className='w-full bg-indigo-600 hover:bg-indigo-500 transition p-4 rounded-xl font-semibold'>
          Login
        </button>

        <p className='text-center text-slate-400 mt-6'>
          Don’t have an account?{' '}
          <Link
            to='/register'
            className='text-indigo-400'
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login