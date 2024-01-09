'use client'
import { ProductWithAuthor, Review } from '@config/types'
import useProductPageStore from '@stores/useProductPageStore'
import React, { useRef } from 'react'

const ProductPageInitializer: React.FC<{ product: ProductWithAuthor, reviews: Array<Review> }> = ({ product, reviews }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useProductPageStore.setState({ product, reviews })
        initialized.current = true
    }

    return null
}

export default ProductPageInitializer
