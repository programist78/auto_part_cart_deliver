'use client'
import { Product, Review } from '@config/types'
import useProfilePageStore, { ProfileType } from '@stores/useProfilePageStore'
import React, { useRef } from 'react'

const ProfilePageInitializer: React.FC<{ profile: ProfileType, products:Array<Product>, reviews:Array<Review> }> = ({ profile, products, reviews }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useProfilePageStore.setState({ profile, products, reviews })
        initialized.current = true
    }

    return null
}

export default ProfilePageInitializer
