import ProfilePageInitializer from '@initializers/ProfilePageInitializer'
import Product from '@models/Product'
import Review from '@models/Review'
import User from '@models/User'
import logger from '@utils/logger'
import simpler from '@utils/simpler'
import { notFound } from 'next/navigation'
import type { ReactNode, FC } from 'react'

interface Props {
    children: ReactNode
    params: { id: string }
}

const layout: FC<Props> = async ({ children, params: { id } }) => {
    try {
        const [user, products, reviews] = await Promise.all([
            User.findById(id),
            Product.find({ author: id, active: true }),
            Review.find({ belongsTo: id })
        ])
        if (!user) return notFound()

        return <>
            <ProfilePageInitializer profile={simpler(user)} products={simpler(products)} reviews={simpler(reviews)} />
            {children}
        </>
    } catch (err) {
        logger('Profile layout', err)
        notFound()
    }
}

export default layout
