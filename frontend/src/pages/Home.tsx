import { useEffect, useState } from 'react'
import api from '../api/api'
import { Link } from 'react-router-dom'
import { PenSquare, ArrowUpRight } from 'lucide-react'
import { motion, type Transition } from 'framer-motion'

interface Post {
  id: number
  title: string
  content: string
  author: {
    name: string
  }
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5,
    delay,
    ease: [0.22, 1, 0.36, 1],
  } as Transition,
})

function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/posts')
      .then((res) => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e8e4dc]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 md:px-14 py-6 border-b border-white/[0.06]">
        <motion.div {...fadeUp(0)}>
          <span
            className="text-2xl font-black tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}
          >
            Blog<span className="text-amber-400">Sphere</span>
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-[#a09a8e] hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm font-semibold bg-amber-400 text-black rounded-lg hover:bg-amber-300 transition-colors"
          >
            Get started
          </Link>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 md:px-14 pt-24 pb-20">
        <motion.p
          {...fadeUp(0.1)}
          className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-5"
        >
          A place to think out loud
        </motion.p>

        <motion.h1
          {...fadeUp(0.18)}
          className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-white mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ideas worth
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
            writing down.
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.26)} className="text-[#a09a8e] text-lg max-w-xl leading-relaxed mb-10">
          A minimal blogging platform for people who care about words.
          Write, publish, and let your ideas travel.
        </motion.p>

        <motion.div {...fadeUp(0.32)}>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors text-sm group"
          >
            <PenSquare size={16} />
            Write a post
            <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Divider */}
        <div className="mt-20 border-t border-white/[0.06]" />
      </section>

      {/* Posts */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 md:px-14 pb-28">
        <motion.div {...fadeUp(0.38)} className="flex items-center justify-between mb-10">
          <h2
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Latest posts
          </h2>
          <span className="text-xs text-[#5a5450] uppercase tracking-widest">
            {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
          </span>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/5 rounded w-full mb-2" />
                <div className="h-3 bg-white/5 rounded w-5/6 mb-2" />
                <div className="h-3 bg-white/5 rounded w-4/6" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            {...fadeUp(0.42)}
            className="text-center py-24 border border-dashed border-white/10 rounded-3xl"
          >
            <div className="text-4xl mb-4">✦</div>
            <p className="text-[#5a5450] text-sm">No posts yet. Be the first to write something.</p>
            <Link to="/create" className="mt-4 inline-block text-amber-400 text-sm hover:underline">
              Write the first post →
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                {...fadeUp(0.1 + index * 0.07)}
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-amber-400/20 rounded-2xl p-6 transition-all duration-300 cursor-pointer"
              >
                {/* Corner accent */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={14} className="text-amber-400" />
                </div>

                {/* Author chip */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-bold text-black">
                    {post.author.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-[#6a6460]">{post.author.name}</span>
                </div>

                <h3
                  className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-amber-100 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {post.title}
                </h3>

                <p className="text-sm text-[#7a7470] line-clamp-3 leading-relaxed">
                  {post.content}
                </p>

                {/* Bottom rule */}
                <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-xs text-[#4a4440] uppercase tracking-wider">Read more</span>
                  <div className="w-4 h-px bg-amber-400/40 group-hover:w-8 transition-all duration-300" />
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-8 md:px-14 py-8 flex items-center justify-between">
        <span className="text-xs text-[#3a3430]">© {new Date().getFullYear()} BlogSphere</span>
        <span className="text-xs text-[#3a3430]">Built with React & TypeScript</span>
      </footer>
    </div>
  )
}

export default Home