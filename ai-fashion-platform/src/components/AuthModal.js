import React, { useState } from 'react'

function AuthModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/signup'

    const body = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        onLogin(data.user)
        onClose()
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Something went wrong!')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-2xl w-96 border border-gray-700 relative">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Welcome Back 👗' : 'Join StyleAI 👗'}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 mb-4"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-gray-400 text-center text-sm">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span
            className="text-pink-400 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default AuthModal