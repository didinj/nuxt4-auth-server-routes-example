// server/api/profile.get.ts
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
    return session.user
})