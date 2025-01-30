import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db/drizzle'
import { user, account, session, verification } from '../db/schema/auth'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      user: user,
      account: account,
      session: session,
      verification: verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.CLIENT_URL!],
})
