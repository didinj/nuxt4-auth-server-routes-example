<script setup lang="ts">
import { useAuth } from '#imports'

const { status, data, signOut } = useAuth()
</script>

<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <div v-if="status === 'authenticated'">
      <p class="mb-4">Welcome, <strong>{{ data.user?.name }}</strong> ({{ data.user?.email }})</p>
      <button @click="signOut()" class="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </div>

    <div v-else>
      <p>You are not logged in.</p>
      <NuxtLink to="/login" class="text-blue-600">Login</NuxtLink>
    </div>
  </div>
</template>
