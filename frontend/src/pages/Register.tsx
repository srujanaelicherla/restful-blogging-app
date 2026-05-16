import { useState } from 'react'
import api from '../api/api'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err: unknown) {
      const message =
        err instanceof Error &&
        (err as { response?: { data?: { message?: string } } }).response?.data?.message
      setError(typeof message === 'string' ? message : 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center mb-10">
          <Link to="/">
            <span className="text-2xl font-black tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Blog<span className="text-amber-400">Sphere</span>
            </span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
          {error && (
            <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-3 flex items-center gap-2 text-red-400 text-sm">
              <span className="shrink-0">✕</span>{error}
            </div>
          )}
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Create an account</h1>
            <p className="text-sm text-[#6a6460] mb-8">Start sharing your ideas with the world</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#5a5450] uppercase tracking-widest">Name</label>
                <input type="text" placeholder="Your full name" value={form.name} onChange={handleChange('name')}
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/40 focus:bg-white/[0.06] text-white placeholder:text-[#3a3430] rounded-xl px-4 py-3 text-sm outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#5a5450] uppercase tracking-widest">Email</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={handleChange('email')}
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/40 focus:bg-white/[0.06] text-white placeholder:text-[#3a3430] rounded-xl px-4 py-3 text-sm outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#5a5450] uppercase tracking-widest">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={handleChange('password')}
                    className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/40 focus:bg-white/[0.06] text-white placeholder:text-[#3a3430] rounded-xl px-4 py-3 pr-11 text-sm outline-none transition-all" />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4440] hover:text-amber-400 transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div className="flex gap-1 pt-1">
                    {[1, 2, 3].map((level) => (
                      <div key={level} className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                        form.password.length >= level * 4
                          ? level === 1 ? 'bg-red-400' : level === 2 ? 'bg-amber-400' : 'bg-green-400'
                          : 'bg-white/10'
                      }`} />
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 mt-2 bg-amber-400 hover:bg-amber-300 disabled:bg-amber-400/40 disabled:cursor-not-allowed text-black font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
                {isLoading
                  ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Creating account...</>
                  : <>Create account <ArrowRight size={15} /></>}
              </button>
            </form>
          </div>
          <div className="px-8 py-5 border-t border-white/[0.05] text-center">
            <p className="text-sm text-[#4a4440]">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Register