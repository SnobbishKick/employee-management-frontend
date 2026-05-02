import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../utils/axios'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'admin' })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [availability, setAvailability] = useState({ username: null, email: null })
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' })

  const checkAvailability = async (field, value) => {
    if (!value || value.length < 3) return
    try {
      const res = await api.get(`/auth/check-availability?${field}=${value}`)
      setAvailability(prev => ({ ...prev, [field]: res.data.available }))
    } catch (err) {
      console.error(err)
    }
  }

  const checkPasswordStrength = (password) => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++

    const levels = [
      { label: '', color: '' },
      { label: 'Weak', color: 'text-red-500' },
      { label: 'Fair', color: 'text-yellow-500' },
      { label: 'Good', color: 'text-blue-500' },
      { label: 'Strong', color: 'text-green-500' },
    ]
    setPasswordStrength({ score, ...levels[score] })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setFieldErrors({ ...fieldErrors, [name]: '' })

    if (name === 'password') checkPasswordStrength(value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.username) checkAvailability('username', form.username)
    }, 600)
    return () => clearTimeout(timer)
  }, [form.username])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.email) checkAvailability('email', form.email)
    }, 600)
    return () => clearTimeout(timer)
  }, [form.email])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (availability.username === false) return setError('Username is already taken')
    if (availability.email === false) return setError('Email is already registered')
    if (passwordStrength.score < 2) return setError('Password is too weak')
    try {
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  const inputClass = "w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Register a new account</p>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Username</label>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Enter username" required className={inputClass} />
            {form.username.length >= 3 && (
              <p className={`text-xs mt-1 ${availability.username === null ? 'text-gray-400' : availability.username ? 'text-green-500' : 'text-red-500'}`}>
                {availability.username === null ? 'Checking...' : availability.username ? '✓ Username available' : '✗ Username already taken'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" required className={inputClass} />
            {form.email.length > 5 && (
              <p className={`text-xs mt-1 ${availability.email === null ? 'text-gray-400' : availability.email ? 'text-green-500' : 'text-red-500'}`}>
                {availability.email === null ? 'Checking...' : availability.email ? '✓ Email available' : '✗ Email already registered'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" required className={inputClass} />
            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= passwordStrength.score ? (passwordStrength.score <= 1 ? 'bg-red-500' : passwordStrength.score === 2 ? 'bg-yellow-500' : passwordStrength.score === 3 ? 'bg-blue-500' : 'bg-green-500') : 'bg-gray-200 dark:bg-gray-600'}`} />
                  ))}
                </div>
                <p className={`text-xs ${passwordStrength.color}`}>{passwordStrength.label}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Role</label>
            <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition-colors duration-200">
            Register
          </button>
        </form>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register