import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { decode, sign, verify } from 'hono/jwt'
import { signinSchema, signupSchema, blogPostSchema } from '@sangam_verma/medium-blog-common'
import { cors } from 'hono/cors'

type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}
const app = new Hono<{ Bindings: Bindings }>()

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', async (c) => {
  const adapter = new PrismaPg({
    connectionString: c.env.DATABASE_URL,
  })

  const prisma = new PrismaClient({
    adapter,
  })

  const body = await c.req.json()
  const { success, error } = signupSchema.safeParse(body)
  if (!success) {
    return c.json({ error: error.format() }, 400)
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  })
  const token = await sign({ id: user.id }, c.env.JWT_SECRET, 'HS256')
  return c.json({ token })
})

app.post('/api/v1/signin', async (c) => {
  const adapter = new PrismaPg({
    connectionString: c.env.DATABASE_URL,
  })

  const prisma = new PrismaClient({
    adapter,
  })

  const body = await c.req.json()
  const { success, error } = signinSchema.safeParse(body)
  if (!success) {
    return c.json({ error: error.format() }, 400)
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })
  if (!user || user.password !== body.password) {
    return c.text('Invalid credentials', 401)
  }
  const token = await sign({ id: user.id }, c.env.JWT_SECRET, 'HS256')
  return c.json({ token })
})

app.post('/api/v1/blog', async (c) => {
  const adapter = new PrismaPg({
    connectionString: c.env.DATABASE_URL,
  })

  const prisma = new PrismaClient({
    adapter,
  })
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.text('Unauthorized', 401)
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = await verify(token, c.env.JWT_SECRET, 'HS256') as { id: string } | null
    if (!decoded) {
      return c.text('Unauthorized', 401)
    }
    const body = await c.req.json()
    const { success, error } = blogPostSchema.safeParse(body)
    if (!success) {
      return c.json({ error: error.format() }, 400)
    }
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: decoded.id,
      },
    })
    return c.json(post)
  } catch (error) {
    return c.text('Unauthorized', 401)
  }
})

app.put('/api/v1/blog/:id', async (c) => {
  const id = c.req.param('id')
  const adapter = new PrismaPg({
    connectionString: c.env.DATABASE_URL,
  })

  const prisma = new PrismaClient({
    adapter,
  })

  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.text('Unauthorized', 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = await verify(token, c.env.JWT_SECRET, 'HS256') as { id: string } | null
    if (!decoded) {
      return c.text('Unauthorized', 401)
    }

    const existingPost = await prisma.post.findUnique({
      where: { id },
    })

    if (!existingPost) {
      return c.json({ error: 'Blog not found' }, 404)
    }

    if (existingPost.authorId !== decoded.id) {
      return c.text('Forbidden', 403)
    }

    const body = await c.req.json()
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    })

    return c.json(updatedPost)
  } catch (error) {
    return c.text('Unauthorized', 401)
  }
})

app.get('/api/v1/blog/:id', async (c) => {
  const id = c.req.param('id')
  const adapter = new PrismaPg({
    connectionString: c.env.DATABASE_URL,
  })

  const prisma = new PrismaClient({
    adapter,
  })

  const post = await prisma.post.findUnique({
    where: { id },
  })

  if (!post) {
    return c.json({ error: 'Blog not found' }, 404)
  }

  return c.json(post)
})

app.get('/api/v1/blog', async (c) => {
  const adapter = new PrismaPg({
    connectionString: c.env.DATABASE_URL,
  })

  const prisma = new PrismaClient({
    adapter,
  })

  const posts = await prisma.post.findMany()
  return c.json(posts)
})

export default app