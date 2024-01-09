import Product from "@models/Product"
import logger from "@utils/logger"
import connect from "@utils/mongoose"
import stripe from "@utils/stripe"
import { verifyToken } from "@utils/token"

export const POST = async (req: Request) => {
    try {
        await connect()
        const { _id } = verifyToken()
        const body = await req.json()
        const { title, category, subcategory, price, text, images } = body
        const productStripe = await stripe.products.create({
            name: title
        })

        await stripe.prices.create({
            unit_amount: +price * 100,
            currency: 'usd',
            product: productStripe.id,
        })
        const doc = new Product({ title, category, subcategory, price: +price, text, images, stripeId: productStripe.id, author: _id })
        const newProduct = await doc.save()
        return Response.json({ product: newProduct })
    } catch (err) {
        logger('Product Creation Failed 💥', err)
        return Response.json({ error: 'Product creation failed' }, { status: 500 })
    }
}

export const DELETE = async (request: Request) => {
    try {
        const { _id } = verifyToken()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        await connect()

        const del = await Product.deleteOne({ _id:id, author:_id })
        if(del.deletedCount !== 0) return Response.json({ success:true })
        return Response.json({ error:'Product deleting failed!' }, { status: 500 })
    } catch (err) {
        logger('Product deleting 💥', err)
        return Response.json({ error:'Product deleting failed!' }, { status: 500 })
    }
}