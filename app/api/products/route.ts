import { RouteHandlerType } from '@config/types'
import Product from '@models/Product'
import { serverErrorResponse } from '@utils/errorResponse'
import logger from '@utils/logger'


class ProductsHandler implements RouteHandlerType {

    async GET(req: Request): Promise<Response> {
        try {
            const { searchParams } = new URL(req.url)
            const text = searchParams.get('text')
            const products = await Product.find({ title: { $regex: text, $options: 'i' }, active: true }).limit(5)
            return Response.json({ products })
        } catch (err) {
            logger(err)
            return serverErrorResponse
        }
    }

    async POST(req: Request): Promise<Response> {
        try {
            const { page, category, filter, subcategory } = await req.json()
            const limit = 15
            const skip = ((page ? page : 1) - 1) * limit

            switch (filter) {
                case 'price-reverse': {
                    const products = await Product.find(category ? subcategory ? { category:category.replace('-', ' '), subcategory:subcategory.replace('-', ' ') } : { category:category.replace('-', ' ') } : {})
                        .skip(skip)
                        .limit(limit)
                        .sort({ ['price']: 1 })

                    return Response.json({ products })
                }
                default: {
                    const products = await Product.find(category ? subcategory ? { category:category.replace('-', ' '), subcategory:subcategory.replace('-', ' ') } : { category:category.replace('-', ' ') } : {})
                        .skip(skip)
                        .limit(limit)
                        .sort({ [filter ? filter : 'createdAt']: -1 })

                    return Response.json({ products })
                }
            }
        } catch (err) {
            logger(err)
            return serverErrorResponse
        }
    }

}

export const { GET, POST } = new ProductsHandler()
