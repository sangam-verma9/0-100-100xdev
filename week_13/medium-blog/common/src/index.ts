import z from 'zod'

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
})


export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const blogPostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    authorId: z.string().optional(),
})
export type SignupSchema = z.infer<typeof signupSchema>
export type SigninSchema = z.infer<typeof signinSchema>
export type BlogPostSchema = z.infer<typeof blogPostSchema>
