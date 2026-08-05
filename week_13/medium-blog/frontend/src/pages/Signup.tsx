import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupSchema } from '@sangam_verma/medium-blog-common'
const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const { error } = signupSchema.safeParse(formData)
    if (error) {
      setError(error.issues[0].message)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:8787/api/v1/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.[0]?.message || 'Signup failed')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('userEmail', formData.email)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginBottom: '8px', textAlign: 'center' }}>Create an account</h2>
        <p style={{ marginBottom: '24px', color: '#666', textAlign: 'center' }}>Join the blog platform to start publishing.</p>

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

          <div style={{ marginBottom: '14px' }}>
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

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', background: '#2563eb', color: 'white', fontWeight: 600 }}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p style={{ marginTop: '16px', textAlign: 'center', color: '#666' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup