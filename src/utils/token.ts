import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const generateToken = (_id: string, email: string): string => {
    return jwt.sign({
          _id,
          email
        },
          process.env.SECRET, {
          expiresIn: '30d'
        }
    )
}

export const verifyToken = (token?:string): { email:string, _id:string } => {

    const tok = cookies().get('token')

    if(token) {
        return jwt.verify(token.replace("Bearer ", ""), process.env.SECRET)
    }

    return jwt.verify(tok.value.replace("Bearer ", ""), process.env.SECRET)
}