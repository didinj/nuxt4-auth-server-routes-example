// server/api/auth/signup.post.ts
import { addUser, findUserByEmail } from '../../utils/userStore'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, email, password } = body

    if (!name || !email || !password) {
        throw createError({ statusCode: 400, statusMessage: 'Missing fields' })
    }

    const existingUser = findUserByEmail(email)
    if (existingUser) {
        throw createError({ statusCode: 400, statusMessage: 'User already exists' })
    }

    const user = await addUser(name, email, password)

    return {
        message: 'User registered successfully',
        user: { id: user.id, name: user.name, email: user.email }
    }
})
