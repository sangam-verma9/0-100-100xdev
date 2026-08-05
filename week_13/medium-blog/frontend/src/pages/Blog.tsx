import { blogPostSchema } from '@sangam_verma/medium-blog-common'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type BlogPost = {
  id: string
  title: string
  content: string
  published: boolean
  authorId: string
  createdAt: string
  updatedAt: string
}

const Blog = () => {
  const { id } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({ title: '', content: '', published: false })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const fetchPost = async () => {
    const { error } = blogPostSchema.safeParse(formData)
    if (error) {
      setError(error.issues[0].message)
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`http://localhost:8787/api/v1/blog/${id}`)
      if (!response.ok) {
        throw new Error('Post not found')
      }

      const data = await response.json()
      setPost(data)
      setFormData({
        title: data.title,
        content: data.content,
        published: data.published,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.title || !formData.content) {
      setError('Please provide a title and content')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      setError('Please sign in to edit this post')
      return
    }

    try {
      setSaving(true)
      const response = await fetch(`http://localhost:8787/api/v1/blog/${id}`, {
        method: 'PUT',
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
        throw new Error(data.error || 'Failed to update post')
      }

      setPost(data)
      setFormData({
        title: data.title,
        content: data.content,
        published: data.published,
      })
      setSuccess('Post updated successfully')
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>← Back to home</Link>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading post...</div>}

        {error && !post && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '14px 16px', borderRadius: '12px' }}>{error}</div>
        )}

        {post && (
          <div style={{ display: 'grid', gap: '20px' }}>
            <article style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <span style={{ padding: '6px 10px', borderRadius: '999px', background: post.published ? '#dcfce7' : '#fef3c7', color: post.published ? '#166534' : '#92400e', fontSize: '12px', fontWeight: 700 }}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>{formatDate(post.createdAt)}</span>
              </div>

              <h1 style={{ margin: '0 0 10px', fontSize: '30px', color: '#111827' }}>{post.title}</h1>
              <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{post.content}</p>
            </article>

            {error && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '14px 16px', borderRadius: '12px' }}>{error}</div>
            )}

            {success && (
              <div style={{ background: '#dcfce7', color: '#166534', padding: '14px 16px', borderRadius: '12px' }}>{success}</div>
            )}

            <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', color: '#111827' }}>Edit post</h2>
                <button
                  onClick={() => setIsEditing((prev) => !prev)}
                  style={{ border: 'none', background: '#111827', color: 'white', padding: '10px 14px', borderRadius: '999px', cursor: 'pointer' }}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {!localStorage.getItem('token') && (
                <p style={{ color: '#6b7280', marginBottom: '12px' }}>Sign in to update this post.</p>
              )}

              {isEditing && (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Title</label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Content</label>
                    <textarea
                      name="content"
                      rows={8}
                      value={formData.content}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px', resize: 'vertical' }}
                    />
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: 600 }}>
                    <input name="published" type="checkbox" checked={formData.published} onChange={handleChange} />
                    Publish immediately
                  </label>

                  <button
                    type="submit"
                    disabled={saving}
                    style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                  >
                    {saving ? 'Updating...' : 'Save changes'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog