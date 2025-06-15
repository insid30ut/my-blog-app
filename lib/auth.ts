import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // This is a mock authorization. In a real application, you would
        // verify credentials against a database.
        if (credentials?.username === 'admin' && credentials?.password === 'admin') {
          return { id: 'admin_user_id', name: 'Admin User', email: 'admin@example.com', role: 'admin' };
        }
        if (credentials?.username === 'user1' && credentials?.password === 'password123') {
          return { id: 'user1', name: 'Test User 1', email: 'user1@example.com', role: 'user' };
        }
        if (credentials?.username === 'user2' && credentials?.password === 'password123') {
          return { id: 'user2', name: 'Test User 2', email: 'user2@example.com', role: 'user' };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
};