// app/middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuth } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
    const { status } = useAuth()

    // Protect only specific routes
    if (to.path.startsWith('/dashboard') && status.value !== 'authenticated') {
        return navigateTo('/login')
    }
})
