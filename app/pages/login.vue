<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '#imports'
import { useRouter } from '#imports'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const { signIn, status } = useAuth()

const handleLogin = async () => {
  error.value = ''
  const res = await signIn('credentials', {
    redirect: false,
    email: email.value,
    password: password.value
  })

  if (res?.error) {
    error.value = 'Invalid email or password'
  } else {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-4">Login</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" required />

      <button type="submit" class="w-full bg-green-600 text-white p-2 rounded">Login</button>
    </form>

    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>

    <p class="mt-4">
      Don’t have an account?
      <NuxtLink to="/signup" class="text-blue-600">Sign up</NuxtLink>
    </p>
  </div>
</template>
