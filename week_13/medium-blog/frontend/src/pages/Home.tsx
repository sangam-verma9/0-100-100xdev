import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type BlogPost = {
  id: string
  title: string
  content: string
  published: boolean
  authorId: string
  createdAt: string
  updatedAt: string
}

const Home = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem('token')
      const email = localStorage.getItem('userEmail') || ''
      setIsLoggedIn(Boolean(token))
      setUserEmail(email)
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8787/api/v1/blog')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }

        const data = await response.json()
        setPosts(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    syncAuthState()
    fetchPosts()
  }, [])

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    setUserEmail('')
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ margin: 0, color: '#4f46e5', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px' }}>
              Blog Platform
            </p>
            <h1 style={{ margin: '6px 0 0', fontSize: '32px', color: '#111827' }}>Discover stories and ideas</h1>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <span style={{ color: '#111827', fontWeight: 600 }}>{userEmail || 'Signed in'}</span>
                <button
                  onClick={handleLogout}
                  style={{ border: 'none', cursor: 'pointer', color: '#111827', background: 'white', padding: '10px 16px', borderRadius: '999px', fontWeight: 600, boxShadow: '0 6px 16px rgba(15, 23, 42, 0.08)' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: 'none', color: '#111827', background: 'white', padding: '10px 16px', borderRadius: '999px', fontWeight: 600, boxShadow: '0 6px 16px rgba(15, 23, 42, 0.08)' }}>
                  Sign in
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'white', background: '#4f46e5', padding: '10px 16px', borderRadius: '999px', fontWeight: 600, boxShadow: '0 8px 20px rgba(79, 70, 229, 0.25)' }}>
                  Create account
                </Link>
              </>
            )}
          </div>
        </header>

        <section style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ margin: '0 0 8px', fontSize: '24px', color: '#111827' }}>Latest posts</h2>
              <p style={{ margin: 0, color: '#6b7280', maxWidth: '600px' }}>
                Read the newest thoughts from the community and share your own story in a few clicks.
              </p>
            </div>
            <Link to="/create-post" style={{ textDecoration: 'none', color: 'white', background: '#111827', padding: '12px 18px', borderRadius: '999px', fontWeight: 600 }}>
              Write a post
            </Link>
          </div>
        </section>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading posts...</div>
        )}

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '14px 16px', borderRadius: '12px' }}>{error}</div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '16px', color: '#6b7280' }}>
            No posts yet. Be the first to publish one.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'transform 0.2s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ padding: '6px 10px', borderRadius: '999px', background: post.published ? '#dcfce7' : '#fef3c7', color: post.published ? '#166534' : '#92400e', fontSize: '12px', fontWeight: 700 }}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <span style={{ color: '#6b7280', fontSize: '13px' }}>{formatDate(post.createdAt)}</span>
                </div>

                <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: '#111827' }}>{post.title}</h3>
                <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{post.content}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home