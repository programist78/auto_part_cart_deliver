'use client'
import React, { useRef } from 'react'
import useAuthStore from '../stores/useAuthStore'
import { userDataType } from '@config/types'

const AuthStoreInitializer: React.FC<{ userData: userDataType }> = ({ userData }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useAuthStore.setState({ isLogined: userData ? true : false, userData })
        initialized.current = true
    }

    return null
}

export default AuthStoreInitializer
