// This is a mock implementation of authentication
// In a real application, you would use a proper authentication library like NextAuth.js

import { jwtVerify, SignJWT } from "jose"

// Mock secret key - in a real app, this would be an environment variable
const SECRET_KEY = new TextEncoder().encode("your-secret-key")

// Mock user database
const users = [
  {
    id: "user1",
    email: "admin@example.com",
    password: "password123", // In a real app, this would be hashed
    name: "John Doe",
    role: "admin",
    has2FA: true,
  },
]

export async function registerUser(name: string, email: string, password: string): Promise<boolean> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Create new user
  const newUser = {
    id: `user${users.length + 1}`,
    email,
    password, // In a real app, this would be hashed
    name,
    role: "user",
    has2FA: false,
  }

  // Add user to database
  users.push(newUser)

  return true
}

export async function loginUser(email: string, password: string): Promise<boolean> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user by email
  const user = users.find((u) => u.email === email)

  // Check if user exists and password matches
  if (user && user.password === password) {
    // Create JWT token
    const token = await new SignJWT({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      has2FA: user.has2FA,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(SECRET_KEY)

    // Store token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }

    return true
  }

  return false
}

export async function checkAuth(): Promise<boolean> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    // Get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

    if (!token) {
      return false
    }

    // Verify token
    const { payload } = await jwtVerify(token, SECRET_KEY)

    // Check if token is valid
    if (payload && payload.exp && payload.exp * 1000 > Date.now()) {
      return true
    }

    return false
  } catch (error) {
    console.error("Auth check error:", error)
    return false
  }
}

export async function verify2FA(code: string): Promise<boolean> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, you would verify the code against a stored secret
  // For this demo, we'll accept "123456" as a valid code
  return code === "123456"
}

export async function logout(): Promise<void> {
  // Remove token from localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
  }
}

export async function getCurrentUser() {
  try {
    // Get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

    if (!token) {
      return null
    }

    // Verify token
    const { payload } = await jwtVerify(token, SECRET_KEY)

    // Return user data
    return payload
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

