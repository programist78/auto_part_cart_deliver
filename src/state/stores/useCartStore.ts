import { Product } from '@config/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { persist } from 'zustand/middleware'

export interface useCartStoreType {
    products: Array<Product>
    isOpen: boolean
    setIsOpen: (val: boolean) => void
    addProduct: (product: Product) => void
    removeProduct: (_id: string) => void
}

const useCartStore = create<useCartStoreType>()(devtools(persist((set) => ({
    isOpen: false,
    products: [],
    setIsOpen: (val) => set({ isOpen: val }),
    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
    removeProduct: (_id) => set((state) => {
        let isDeleted = false
        const filteredArray = state.products.filter(obj => {
            if (obj._id === _id && !isDeleted) {
                isDeleted = true
                return false
            }
            return true
        })
        return { products: filteredArray }
    })
}
), { name: 'cart-store' }), { name: 'useCartStore' }))

export default useCartStore