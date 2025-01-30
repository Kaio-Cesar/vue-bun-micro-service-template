import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authClient } from '@/lib/better_auth.ts'

export const useAuthStore = defineStore('auth', () => {
  const signUp = async (signupData: {
    email: string
    password: string
    name: string
  }) => {
    const { data, error } = await authClient.signUp.email({
      email: signupData.email,
      name: signupData.name,
      password: signupData.password,
    })

    console.log(data)
    console.log(error)
  }

  const signIn = async (signinData: { email: string; password: string }) => {
    const { data, error } = await authClient.signIn.email({
      email: signinData.email,
      password: signinData.password,
    })

    console.log(data)
    console.log(error)
  }

  const signOut = async () => {
    const { data, error } = await authClient.signOut()

    console.log(data)
    console.log(error)
  }

  const getSession = () => {
    const session = authClient.useSession()
    console.log(session.value)
    return session
  }

  const getIsSignedIn = () => {
    const result = getSession().value.data == null || undefined ? false : true
    return result
  }

  return { signIn, signUp, signOut, getSession, getIsSignedIn }
})
