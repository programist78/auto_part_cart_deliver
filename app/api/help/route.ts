import { RouteHandlerType } from '@config/types'
import Help from '@models/Help'
import { serverErrorResponse } from '@utils/errorResponse'
import logger from '@utils/logger'


class ProductsHandler implements RouteHandlerType {
    async POST(req: Request) {
        try {
            const { name, email, text, belongsTo } = await req.json()
            const doc = new Help({ name, email, text, belongsTo })
            doc.save()
            return Response.json({ help: doc })
        } catch (err) {
            logger(err)
            return serverErrorResponse
        }
    }
}

export const { POST } = new ProductsHandler()
