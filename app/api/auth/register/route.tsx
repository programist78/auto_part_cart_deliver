import User from "@models/User"
import connect from "@utils/mongoose"
import stripe from "@utils/stripe"
import { generateToken } from "@utils/token"
import bcrypt from 'bcrypt'

export const POST = async (req:Request) => {
    try {
        const { email, confirm_password, fullname, password, address, role } = await req.json()
        await connect()
        if (password.length < 8) return Response.json({ error: 'Password too simple!' }, { status: 401 })
        if (password !== confirm_password) return Response.json({ error: 'Subtracted password is different!'}, { status: 401 })
        const already_exsist = await User.findOne({ email })
        if (already_exsist) return Response.json({ error: 'User already exists!'}, { status: 401 })
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        const customer = await stripe.customers.create({ email })
        const user = new User({ email, fullname, passwordHash, role, stripeId: customer.id, address: address ? address : null })
        let doc = await user.save()
        const token = await generateToken(doc._id, doc.email)
        return Response.json({ user, token })
    } catch {

    }
}