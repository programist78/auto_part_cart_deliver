import { ProductWithAuthor, Review } from '@config/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


interface useProductPageStoreType {
    product: ProductWithAuthor
    reviews: Array<Review>
}

const useProductPageStore = create<useProductPageStoreType>()(devtools((set) => ({
    product: null,
    reviews: []
}), { name: 'useProductPageStore' }))

export default useProductPageStore