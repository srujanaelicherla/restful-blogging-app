import { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

function CreatePost() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    await api.post(
      '/posts',
      {
        title,
        content
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    navigate('/')
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='w-[600px] border p-8 rounded-xl shadow'
      >
        <h1 className='text-3xl font-bold mb-6'>
          Create Post
        </h1>

        <input
          type='text'
          placeholder='Title'
          className='w-full border p-3 mb-4 rounded'
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder='Content'
          className='w-full border p-3 mb-4 rounded h-40'
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <button className='bg-black text-white w-full p-3 rounded'>
          Publish
        </button>
      </form>
    </div>
  )
}

export default CreatePost