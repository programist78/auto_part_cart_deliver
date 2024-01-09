import { Product, UsersType, Review } from '@config/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface ProfileType {
    address: string
    avatarUrl: string
    birthdayDate: string
    boughtProducts: string
    chats: string
    city: string
    country: string
    email: string
    fullname: string
    gender: string
    goingProducts: string
    _id: string
    phoneNumber: string
    reviews: string[]
    role: UsersType
    socialLink: string
    sellerProducts: string[]
    soldProducts: string[]
    stripeId: string
    web3address: string
    zipCode: string
    createdAt: string
}

interface useProfilePageStoreType {
    profile: ProfileType
    products: Array<Product>
    reviews: Array<Review>
}

const useProfilePageStore = create<useProfilePageStoreType>()(devtools((set) => ({
    profile: null,
    products: [],
    reviews: []
}), { name: 'useProfilePageStore' }))

export default useProfilePageStore