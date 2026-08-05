import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { blogPostSchema } from '@sangam_verma/medium-blog-common'

const Create = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ title: '', content: '', published: false })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.title || !formData.content) {
      setError('Please provide both a title and content')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8787/api/v1/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          published: formData.published,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to create post')
      }

      setSuccess('Post created successfully!')
      setFormData({ title: '', content: '', published: false })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setLoading(false)
      navigate('/') // Redirect to home after creating the post
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '680px', background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ marginBottom: '6px' }}>Create a new post</h2>
            <p style={{ color: '#666', margin: 0 }}>Share your latest thoughts with your readers.</p>
          </div>
          <Link to="/" style={{ color: '#2563eb', fontWeight: 600 }}>Back home</Link>
        </div>

        {error && (
          <div style={{ marginBottom: '16px', color: '#b91c1c', background: '#fee2e2', padding: '10px 12px', borderRadius: '8px' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ marginBottom: '16px', color: '#166534', background: '#dcfce7', padding: '10px 12px', borderRadius: '8px' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a catchy title"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label htmlFor="content" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post here..."
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px', resize: 'vertical' }}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: 600 }}>
            <input
              name="published"
              type="checkbox"
              checked={formData.published}
              onChange={handleChange}
            />
            Publish immediately
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', background: '#2563eb', color: 'white', fontWeight: 600 }}
          >
            {loading ? 'Creating post...' : 'Create post'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create