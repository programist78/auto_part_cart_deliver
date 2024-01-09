import { RouteHandlerType } from '@config/types'
import User from '@models/User'
import { serverErrorResponse } from '@utils/errorResponse'
import logger from '@utils/logger'
import connect from '@utils/mongoose'
import { verifyToken } from '@utils/token'


class handler implements RouteHandlerType {

    async PUT(req: Request) {
        try {
            const { name, address, city, zip, country, birthday, sex, social, avatarUrl } = await req.json()
            const { _id } = verifyToken()
            connect()
            const user = await User.findOneAndUpdate({ _id }, { fullname: name, avatarUrl: avatarUrl ? avatarUrl : undefined, birthdayDate: birthday, gender: sex, address, city, zipCode: zip, country, socialLink: social }, { new: true })
            if(!user) return serverErrorResponse
            return Response.json({ user })
        } catch (err) {
            logger(err)
            return serverErrorResponse
        }
    }

}

export const { PUT } = new handler()
