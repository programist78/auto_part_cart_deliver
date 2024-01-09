import ProductPageInitializer from '@initializers/ProductPageInitializer'
import Product from '@models/Product'
import Review from '@models/Review'
import logger from '@utils/logger'
import connect from '@utils/mongoose'
import simpler from '@utils/simpler'
import { notFound } from 'next/navigation'
import type { ReactNode, FC } from 'react'

interface Props {
    children: ReactNode
    params: { id: string }
}

const layout: FC<Props> = async ({ children, params: { id } }) => {
    try {
        connect()
        const [product, reviews] = await Promise.all([
            Product.findById(id).populate('author').exec(),
            Review.find({ belongsTo: id })
        ])
    
        if(!product) return notFound()
    
        return <>
        <ProductPageInitializer product={simpler(product)} reviews={simpler(reviews)}/>
            {children}
        </>
    } catch (err) {
        logger(err)
        notFound()
    }
}

export default layout
