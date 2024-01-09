import Stripe from 'stripe'
//@ts-ignore
const stripe = Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2022-11-15',
})

export default stripe