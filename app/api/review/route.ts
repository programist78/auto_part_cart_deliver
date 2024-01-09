import { RouteHandlerType } from '@config/types'
import Review from '@models/Review'
import { serverErrorResponse } from '@utils/errorResponse'
import logger from '@utils/logger'
import connect from '@utils/mongoose'
import { verifyToken } from '@utils/token'


class handler implements RouteHandlerType {

    async POST(req: Request) {
        try {
            const { name, email, text, belongsTo } = await req.json()
            verifyToken()
            connect()
            const doc = new Review({ authorName:name, email, text, belongsTo })
            const review = await doc.save()
            return Response.json({ review })
        } catch (err) {
            logger(err)
            return serverErrorResponse
        }
    }

}

export const { POST } = new handler()
