import { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

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
      await api.post(
        '/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
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

  const charCount = content.length

  return (
    <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-6 flex items-center gap-1.5 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
            Back
          </button>
          <h1 className="text-4xl font-bold text-neutral-900 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
            New Post
          </h1>
          <p className="text-neutral-400 mt-1 text-sm">Share something with the world</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">

          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border-b border-red-100 px-6 py-3 flex items-center gap-2 text-red-600 text-sm">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* Title field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                Title
              </label>
              <input
                type="text"
                placeholder="Give your post a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl font-semibold text-neutral-900 placeholder:text-neutral-300 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
                style={{ fontFamily: "'Georgia', serif" }}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-100" />

            {/* Content field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                Content
              </label>
              <textarea
                placeholder="Write something worth reading..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full text-base text-neutral-700 placeholder:text-neutral-300 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition resize-none leading-relaxed"
              />
              <div className="flex justify-end">
                <span className="text-xs text-neutral-300">{charCount} characters</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors px-4 py-2 rounded-lg hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-700 disabled:bg-neutral-300 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    Publish
                    <span className="text-neutral-400">↗</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-neutral-300 mt-6">
          Posts are visible to all users immediately after publishing.
        </p>

      </div>
    </div>
  )
}

export default CreatePost