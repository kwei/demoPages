import GoogleProvider from "next-auth/providers/google"
import NextAuth, { Account, Profile, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"

const clientId = process.env.GOOGLE_CLIENT_ID ?? ''
const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? ''

export const authOptions = {
    providers: [
        GoogleProvider({ clientId, clientSecret })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn(params: {user: User | AdapterUser, account: Account | null, profile?: Profile}) {
            console.log("signIn callback: ", params)
            return true
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }