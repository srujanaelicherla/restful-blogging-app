import { useEffect, useState } from 'react'
import api from '../api/api'
import { Link } from 'react-router-dom'
import { PenSquare } from 'lucide-react'
import { motion } from 'framer-motion'

interface Post {
  id: number
  title: string
  content: string
  author: {
    name: string
  }
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    api.get('/posts').then((res) => {
      setPosts(res.data)
    })
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white'>
      
      {/* Navbar */}
      <nav className='flex items-center justify-between px-10 py-6 border-b border-white/10'>
        <h1 className='text-3xl font-bold tracking-wide'>
          BlogSphere
        </h1>

        <div className='flex gap-4'>
          <Link
            to='/login'
            className='px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition'
          >
            Login
          </Link>

          <Link
            to='/register'
            className='px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition'
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className='text-center py-24 px-6'>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-6xl font-extrabold leading-tight'
        >
          Share Your Ideas <br />
          With The World
        </motion.h1>

        <p className='mt-6 text-slate-400 max-w-2xl mx-auto text-lg'>
          A modern RESTful blogging platform built with
          React, TypeScript, Express, Prisma, and PostgreSQL.
        </p>

        <Link
          to='/create'
          className='inline-flex items-center gap-2 mt-10 bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl text-lg font-semibold transition'
        >
          <PenSquare size={22} />
          Create Blog
        </Link>
      </section>

      {/* Posts */}
      <section className='max-w-6xl mx-auto px-6 pb-20'>
        <h2 className='text-3xl font-bold mb-10'>
          Latest Blogs
        </h2>

        {posts.length === 0 ? (
          <div className='text-center text-slate-400 py-20 border border-dashed border-white/20 rounded-3xl'>
            No blog posts yet.
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className='bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-6 hover:scale-[1.02] transition'
              >
                <h3 className='text-2xl font-bold mb-4'>
                  {post.title}
                </h3>

                <p className='text-slate-300 line-clamp-4'>
                  {post.content}
                </p>

                <div className='mt-6 text-sm text-slate-400'>
                  By {post.author.name}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home