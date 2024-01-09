import { userDataType } from '@config/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface useAuthStoreType {
    isLogined: boolean
    userData: null | userDataType
    setUserData: (data:userDataType) => void
}

const useAuthStore = create<useAuthStoreType>()(devtools((set) => ({
    isLogined: false,
    userData: null,
    setUserData: (data) => {
        if (!data) {
            set({ isLogined: false, userData: null })

            return
        }
        set({ isLogined: true, userData: data })
    }
}), { name: 'useAuthStore' }))

export default useAuthStore