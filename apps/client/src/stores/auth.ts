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
      callbackURL: '/home',
    })

    console.log(data)
    console.log(error)
  }

  const signIn = async (signinData: { email: string; password: string }) => {
    const { data, error } = await authClient.signIn.email({
      email: signinData.email,
      password: signinData.password,
      callbackURL: '/home',
    })

    console.log(data)
    console.log(error)
  }

  const signOut = async () => {
    const { data, error } = await authClient.signOut()

    console.log(data)
    console.log(error)
  }

  const getSession = async () => {
    const session = await authClient.getSession()
    return session
  }

  const getIsSignedIn = async () => {
    const session = await getSession()
    if (session.data !== null && session.data !== undefined) {
      return true
    } else {
      return false
    }
  }

  return { signIn, signUp, signOut, getSession, getIsSignedIn }
})
