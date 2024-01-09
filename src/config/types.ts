// Global

export type UsersType = 'USER' | 'BUSINESS' | "ADMIN" | "SUBADMIN"

export enum RootStackEnum {
    HOMEPAGE = '/',
    ABOUT = '/about',
    INSTRUCTIONS = '/instructions',
    LOGIN = '/signin',
    SIGNUP = '/signup',
    BUYER = '/me',
    SELLER = '/me',
    ADMIN = '/admin',
    CATEGORIES = '/categories'
}

export interface Order {
    order: any
}

export interface Review {
    _id: string
    belongsTo: string
    authorName: string
    text: string
    email: string
    createdAt: string
    updatedAt: string
}

export interface Chat {
    _id: string,
    users: Array<userDataType>
}

export interface Message {
    user: string
    content: string
    chat: string
    _id: string
    createdAt: string
    updatedAt: string
}

export interface Product {
    _id: string
    title: string
    category: string
    subcategory: string
    author: string
    price: number
    images: string[]
    text: string
    stripeId: string
    createdAt: string
    updatedAt: string
    active: boolean
}

export type ProductWithAuthor = Omit<Product, 'author'> & { author: userDataType }

export interface LoginResponse {
    token: string
    user: userDataType
}

// Homepage

export interface ProductHomePageType {
    id: string
    keywords: string
    title: string
    text: string
    price: string
    images: Array<string>
}


// profiles

export interface userDataType {
    fullname: string
    address: string
    city: string
    zipCode: string
    country: string
    birthdayDate: string
    gender: string
    email: string
    phoneNumber: string
    _id: string
    socialLink: string
    avatarUrl: string
    role: UsersType
}

export interface PersonalFormPropsType {
    userData: userDataType,
    withFile?: boolean
    error: null | string
    isLoading: boolean
}

export interface MyOrdersPropsType {
    orders?: Array<Order>
    products?: Array<Product>
    error?: string
}

export interface MessagesPropsType {
    chats: Array<Chat>
    userId: string
}

export interface RouteHandlerType {
    GET?(req: Request): Promise<Response>
    POST?(req: Request): Promise<Response>
    PATCH?(req: Request): Promise<Response>
    DELETE?(req: Request): Promise<Response>
    PUT?(req: Request): Promise<Response>
}