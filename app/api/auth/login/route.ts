import User from "@models/User"
import connect from "@utils/mongoose"
import { generateToken } from '@utils/token'
import bcrypt from 'bcrypt'


export const POST = async (req:Request) => {
    try {
        const { email, password } = await req.json()
        await connect()
        const user = await User.findOne({ email })

        if (!user) return Response.json({error: 'Invalid Email or Password'}, { status: 401 })

        const isValidPass = await bcrypt.compare(password, user.passwordHash)
        if (!isValidPass) return Response.json({error: 'Invalid Email or Password'}, { status: 401 })

        const token = generateToken(user._id, user.email)

        return Response.json({ user, token })
    } catch {
        return Response.json({ error: 'Login failed'}, { status: 500 })
    }
}