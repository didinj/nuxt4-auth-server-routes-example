// server/utils/userStore.ts
import bcrypt from 'bcrypt'

export interface User {
    id: string
    name: string
    email: string
    password: string // hashed password
}

// Fake in-memory DB
export const users: User[] = []

// Add new user
export async function addUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user: User = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword
    }
    users.push(user)
    return user
}

// Find user by email
export function findUserByEmail(email: string) {
    return users.find(u => u.email === email)
}
