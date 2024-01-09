'use client'
import { Product } from '@config/types'
import useMyProductStore from '@stores/useMyProductStore'
import React, { useRef } from 'react'

const MyProductsStoreInitializer: React.FC<{ myProducts: Array<Product> }> = ({ myProducts }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useMyProductStore.setState({ products: myProducts })
        initialized.current = true
    }

    return null
}

export default MyProductsStoreInitializer
