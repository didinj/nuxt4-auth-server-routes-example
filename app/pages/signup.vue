<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const router = useRouter()

const handleSignup = async () => {
  error.value = ''
  success.value = ''

  try {
    const res = await $fetch('/api/auth/signup', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value }
    })
    success.value = res.message
    // Redirect to login after successful signup
    setTimeout(() => router.push('/login'), 1000)
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Signup failed'
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-4">Signup</h1>

    <form @submit.prevent="handleSignup" class="space-y-4">
      <input v-model="name" type="text" placeholder="Name" class="w-full p-2 border rounded" required />
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" required />

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded">Sign Up</button>
    </form>

    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
    <p v-if="success" class="text-green-600 mt-2">{{ success }}</p>

    <p class="mt-4">
      Already have an account?
      <NuxtLink to="/login" class="text-blue-600">Login</NuxtLink>
    </p>
  </div>
</template>