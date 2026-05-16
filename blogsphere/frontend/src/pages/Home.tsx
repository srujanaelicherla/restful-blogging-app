import { useEffect, useState } from 'react'
import api from '../api/api'
import { Link, useNavigate } from 'react-router-dom'
import { PenSquare, ArrowUpRight, LogOut, X, Trash2 } from 'lucide-react'
import { motion, AnimatePresence, type Transition } from 'framer-motion'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  author: { name: string }
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } as Transition,
})

function Home() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  const token = localStorage.getItem('token')
  const userName = localStorage.getItem('userName')

  useEffect(() => {
    api.get('/posts')
      .then((res) => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    navigate('/login')
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.delete(`/posts/${deleteTarget}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget))
      setDeleteTarget(null)
      if (selectedPost?.id === deleteTarget) setSelectedPost(null)
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e8e4dc]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 md:px-14 py-6 border-b border-white/[0.06]">
        <motion.span {...fadeUp(0)} className="text-2xl font-black tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          Blog<span className="text-amber-400">Sphere</span>
        </motion.span>
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3">
          {token ? (
            <>
              <span className="text-sm text-[#6a6460] hidden md:block">Hi, {userName}</span>
              <Link to="/create" className="px-4 py-2 text-sm font-semibold bg-amber-400 text-black rounded-lg hover:bg-amber-300 transition-colors flex items-center gap-1.5">
                <PenSquare size={14} /> Write
              </Link>
              <button onClick={handleLogout} className="px-4 py-2 text-sm text-[#a09a8e] hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1.5">
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm text-[#a09a8e] hover:text-white transition-colors rounded-lg hover:bg-white/5">Sign in</Link>
              <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-amber-400 text-black rounded-lg hover:bg-amber-300 transition-colors">Get started</Link>
            </>
          )}
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 md:px-14 pt-24 pb-20">
        <motion.p {...fadeUp(0.1)} className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-5">A place to think out loud</motion.p>
        <motion.h1 {...fadeUp(0.18)} className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ideas worth<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">writing down.</span>
        </motion.h1>
        <motion.p {...fadeUp(0.26)} className="text-[#a09a8e] text-lg max-w-xl leading-relaxed mb-10">
          A minimal blogging platform for people who care about words.
        </motion.p>
        <motion.div {...fadeUp(0.32)}>
          <Link to={token ? '/create' : '/register'} className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors text-sm group">
            <PenSquare size={16} />
            {token ? 'Write a post' : 'Start writing'}
            <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-transform" />
          </Link>
        </motion.div>
        <div className="mt-20 border-t border-white/[0.06]" />
      </section>

      {/* Posts */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 md:px-14 pb-28">
        <motion.div {...fadeUp(0.38)} className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Latest posts</h2>
          <span className="text-xs text-[#5a5450] uppercase tracking-widest">{posts.length} {posts.length === 1 ? 'entry' : 'entries'}</span>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/5 rounded w-full mb-2" />
                <div className="h-3 bg-white/5 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div {...fadeUp(0.42)} className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <div className="text-4xl mb-4">✦</div>
            <p className="text-[#5a5450] text-sm">No posts yet. Be the first to write something.</p>
            <Link to={token ? '/create' : '/register'} className="mt-4 inline-block text-amber-400 text-sm hover:underline">Write the first post →</Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article key={post.id} {...fadeUp(0.1 + index * 0.07)}
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-amber-400/20 rounded-2xl p-6 transition-all duration-300 flex flex-col">

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-bold text-black">
                    {post.author.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-[#6a6460]">{post.author.name}</span>
                  <span className="text-xs text-[#3a3430] ml-auto">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-amber-100 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {post.title}
                </h3>
                <p className="text-sm text-[#7a7470] line-clamp-3 leading-relaxed flex-1">{post.content}</p>

                <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors flex items-center gap-1 group/read"
                  >
                    Read <ArrowUpRight size={11} className="group-hover/read:translate-x-0.5 group-hover/read:-translate-y-0.5 transition-transform" />
                  </button>
                  {token && (
                    <button
                      onClick={() => setDeleteTarget(post.id)}
                      className="text-xs text-[#3a3430] hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={11} /> Delete
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] px-8 md:px-14 py-8 flex items-center justify-between">
        <span className="text-xs text-[#3a3430]">© {new Date().getFullYear()} BlogSphere</span>
        <span className="text-xs text-[#3a3430]">Built with React & TypeScript</span>
      </footer>

      {/* Read modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141414] border border-white/[0.08] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#141414] border-b border-white/[0.06] px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-bold text-black">
                    {selectedPost.author.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-[#6a6460]">{selectedPost.author.name}</span>
                  <span className="text-xs text-[#3a3430]">· {new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                </div>
                <button onClick={() => setSelectedPost(null)} className="text-[#4a4440] hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="px-8 py-8">
                <h2 className="text-3xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {selectedPost.title}
                </h2>
                <p className="text-[#a09a8e] leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteTarget !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141414] border border-white/[0.08] rounded-2xl p-8 max-w-sm w-full"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                <Trash2 size={18} className="text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Delete this post?</h3>
              <p className="text-sm text-[#6a6460] mb-6">This can't be undone. The post will be permanently removed.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 px-4 py-2.5 text-sm text-[#6a6460] hover:text-white border border-white/[0.08] hover:border-white/20 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold bg-red-500 hover:bg-red-400 disabled:bg-red-500/40 text-white rounded-xl transition-colors"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home