// server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { findUserByEmail } from '../../utils/userStore'
import bcrypt from 'bcrypt'

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = findUserByEmail(credentials.email)
                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return { id: user.id, name: user.name, email: user.email }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login'
    }
})