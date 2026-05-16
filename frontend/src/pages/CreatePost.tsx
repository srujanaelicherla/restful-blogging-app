import { useState } from 'react'
import api from '../api/api'
import { useNavigate, Link } from 'react-router-dom'

function CreatePost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError('Please fill in both fields.')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      await api.post('/posts', { title, content }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/')
    } catch (err: unknown) {
      const message =
        err instanceof Error &&
        (err as { response?: { data?: { message?: string } } }).response?.data?.message
      setError(typeof message === 'string' ? message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="mb-8">
          <button onClick={() => navigate('/')} className="text-sm text-[#4a4440] hover:text-white transition-colors mb-6 flex items-center gap-1.5 group">
            <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span> Back
          </button>
          <h1 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>New Post</h1>
          <p className="text-[#6a6460] mt-1 text-sm">Share something with the world</p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
          {error && (
            <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-3 flex items-center gap-2 text-red-400 text-sm">
              <span className="shrink-0">✕</span>{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a5450] uppercase tracking-widest">Title</label>
              <input type="text" placeholder="Give your post a title..." value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl font-semibold text-white placeholder:text-[#3a3430] bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/40 focus:bg-white/[0.06] rounded-xl px-4 py-3 outline-none transition-all"
                style={{ fontFamily: "'Playfair Display', serif" }} />
            </div>
            <div className="border-t border-white/[0.05]" />
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a5450] uppercase tracking-widest">Content</label>
              <textarea placeholder="Write something worth reading..." value={content} onChange={(e) => setContent(e.target.value)} rows={8}
                className="w-full text-base text-[#c8c4bc] placeholder:text-[#3a3430] bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/40 focus:bg-white/[0.06] rounded-xl px-4 py-3 outline-none transition-all resize-none leading-relaxed" />
              <div className="flex justify-end">
                <span className="text-xs text-[#3a3430]">{content.length} characters</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Link to="/" className="text-sm text-[#4a4440] hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5">
                Cancel
              </Link>
              <button type="submit" disabled={isLoading}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:bg-amber-400/40 disabled:cursor-not-allowed text-black text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
                {isLoading
                  ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Publishing...</>
                  : <>Publish <span className="text-black/40">↗</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost