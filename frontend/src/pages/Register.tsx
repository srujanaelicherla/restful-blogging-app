import { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    await api.post('/auth/register', form)

    navigate('/login')
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='w-96 border p-8 rounded-xl shadow'
      >
        <h1 className='text-3xl font-bold mb-6'>
          Register
        </h1>

        <input
          type='text'
          placeholder='Name'
          className='w-full border p-3 mb-4 rounded'
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          type='email'
          placeholder='Email'
          className='w-full border p-3 mb-4 rounded'
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type='password'
          placeholder='Password'
          className='w-full border p-3 mb-4 rounded'
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button className='bg-black text-white w-full p-3 rounded'>
          Register
        </button>
      </form>
    </div>
  )
}

export default Register