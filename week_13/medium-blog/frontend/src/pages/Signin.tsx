import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signinSchema } from '@sangam_verma/medium-blog-common'

const Signin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const { error } = signinSchema.safeParse(formData)
    if (error) {
      setError(error.issues[0].message)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:8787/api/v1/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Invalid credentials')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('userEmail', formData.email)
      navigate('/create-post')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signin failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginBottom: '8px', textAlign: 'center' }}>Welcome back</h2>
        <p style={{ marginBottom: '24px', color: '#666', textAlign: 'center' }}>Sign in to your blog account.</p>

        {error && (
          <div style={{ marginBottom: '16px', color: '#b91c1c', background: '#fee2e2', padding: '10px 12px', borderRadius: '8px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', background: '#2563eb', color: 'white', fontWeight: 600 }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={{ marginTop: '16px', textAlign: 'center', color: '#666' }}>
          Don&apos;t have an account? <Link to="/signup" style={{ color: '#2563eb' }}>Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Signin