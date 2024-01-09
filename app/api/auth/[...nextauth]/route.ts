import NextAuth from 'next-auth'
import type { NextAuthOptions  } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import AppleProvider from 'next-auth/providers/apple'
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import { generateToken } from '@utils/token'
import User from '@models/User'
import connect from '@utils/mongoose'
//@ts-ignore
const stripe = Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2022-11-15',
})

const authOptions: NextAuthOptions  = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID,
            clientSecret: process.env.APPLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user }) {
            try {
                await connect()
                const userData = await User.findOne({
                    email: user.email,
                })

                if (userData) return true

                const customer = await stripe.customers.create({ email: user.email })

                const newUser = new User({
                    email: user.email,
                    role: 'USER',
                    avatarURL: user.image,
                    userName: user.name,
                    stripeId: customer.id,
                    createdAt: new Date()
                })
                const result = await newUser.save()

                if (result.insertedId) return true

                return false
            } catch {
                return false
            }
        },
        async jwt({ token, user }) {
            if (!user) return
            const userData = await User.findOne({
                email: user.email,
            })

            const newToken = generateToken(
                userData._id.toString(),
                userData.email,
            )

            cookies().set('token', newToken, {
                expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            })

            token.accesToken = newToken

            return {
                email: userData.email,
            }
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
