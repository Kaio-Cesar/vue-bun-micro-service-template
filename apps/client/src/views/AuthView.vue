<template>
  <div class="w-full h-full flex justify-center items-center">
    <template v-if="!hasSession">
      <form
        @submit.prevent="signInUp"
        class="flex gap-1 flex-col w-76 p-4 bg-white"
      >
        <input
          type="email"
          id="email"
          v-model="signData.email"
          placeholder="email"
        />
        <input
          v-if="isSignup"
          type="text"
          id="name"
          v-model="signData.name"
          placeholder="username"
        />
        <input
          type="passworld"
          id="password"
          v-model="signData.password"
          placeholder="password"
        />
        <label for="signup-check">Create account?</label>
        <input type="checkbox" id="signup-check" v-model="isSignup" />
        <button v-if="isSignup">Sign-up</button>
        <button v-else>Sign-in</button>
      </form>
    </template>
    <template v-else>
      <div class="flex gap-1 flex-col w-76 p-4 bg-white">
        <button @click="signOut">Log-out</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const signData = reactive({
  email: '',
  name: '',
  password: '',
})

onBeforeMount(async () => {
  hasSession.value = authStore.getIsSignedIn()
})

const hasSession = ref(false)
const isSignup = ref(false)

const signInUp = async () => {
  if (isSignup.value) {
    await authStore.signUp(signData)
    hasSession.value = authStore.getIsSignedIn()
  } else {
    await authStore.signIn(signData)
    hasSession.value = authStore.getIsSignedIn()
  }
}

const signOut = async () => {
  await authStore.signOut()
  hasSession.value = authStore.getIsSignedIn()
}
</script>
