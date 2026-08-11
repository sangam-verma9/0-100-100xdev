import NextAuth from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    credentialsProvider({
        name: 'Email',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'password', type: 'password', placeholder: 'password' }
      },
      async authorize(credentials:any) {
        const username = credentials?.username;
        const password = credentials?.password;
        // Here you can implement your own logic to validate the credentials
        if (username === 'user@example.com' && password === 'password') {
          return {
            id: 1
          };
        }
        return null;
      }
    }),
  ],
  // Additional NextAuth configuration options can be added here
});
export const GET = handler;
export const POST = handler;