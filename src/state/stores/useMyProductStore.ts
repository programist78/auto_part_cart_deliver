import { Product } from '@config/types'
import axios from 'axios'
import Swal from 'sweetalert2'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


export interface useMyProductStoreType {
    products: Array<Product>
    addProduct: (prod: Product) => void
    deleteProduct: (Id: string) => void
}

const useMyProductStore = create<useMyProductStoreType>()(devtools((set) => ({
    products: [],
    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
    deleteProduct: async (_id: string) => {
        axios.delete(`/api/product?id=${_id}`).then(({ data }) => {
            set((state) => ({ products: state.products.filter((item) => item._id !== _id) }))
            Swal.fire({
                title: 'Product deleted!',
                icon: 'success'
            })
        }).catch(() => {
            Swal.fire({
                title: 'Product deleting failed!',
                icon: 'error'
            })
        })
    }
}), { name: 'useMyProductStore' }))

export default useMyProductStore