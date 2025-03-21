import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { loginUser } from "@/lib/auth"

// This is a simplified NextAuth configuration
// In a real application, you would use a proper database adapter
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const success = await loginUser(credentials.email, credentials.password)

          if (success) {
            // In a real app, you would fetch the user from your database
            return {
              id: "user1",
              name: "John Doe",
              email: credentials.email,
              image: "/placeholder.svg?height=32&width=32",
              has2FA: true,
            }
          }

          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.has2FA = user.has2FA
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.has2FA = token.has2FA as boolean
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Check if the user needs to complete 2FA
      if (url.includes("callbackUrl")) {
        const token = url.split("callbackUrl=")[1]
        if (token) {
          // In a real app, you would check if the user has 2FA enabled
          // For this demo, we'll assume they do
          return `${baseUrl}/login/2fa`
        }
      }
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
})

export { handler as GET, handler as POST }

