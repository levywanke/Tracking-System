declare module "next-auth" {
  interface User {
    id: string
    name: string
    email: string
    image?: string
    has2FA?: boolean
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string
      has2FA?: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    has2FA?: boolean
  }
}

