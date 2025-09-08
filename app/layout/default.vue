<script setup lang="ts">
import { useAuth } from '#imports'

const { status, data, signOut } = useAuth()
</script>

<template>
  <div>
    <!-- Navbar -->
    <header class="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="font-bold text-lg">Nuxt Auth App</NuxtLink>

      <nav class="flex items-center gap-4">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>

        <!-- Show login/signup if not authenticated -->
        <template v-if="status === 'unauthenticated'">
          <NuxtLink to="/login" class="hover:underline">Login</NuxtLink>
          <NuxtLink to="/signup" class="hover:underline">Signup</NuxtLink>
        </template>

        <!-- Show user info & logout if authenticated -->
        <template v-else-if="status === 'authenticated'">
          <span class="mr-2">Hi, {{ data.user?.name }}</span>
          <button
            @click="signOut({ callbackUrl: '/' })"
            class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        </template>
      </nav>
    </header>

    <!-- Main content -->
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>
