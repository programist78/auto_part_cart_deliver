import React from 'react'
import c from './Signup.module.scss'
import localFont from 'next/font/local'
import Link from 'next/link'
import SignUpForm from '@components/SignUp/SignUp'
import { Metadata } from 'next'

interface props {
    searchParams: {
        mode: undefined | 'seller' | 'buyer'
    }
}


const fontSatoshi = localFont({ src: '../../src/fonts/Satoshi-Variable.ttf' })


export async function generateMetadata({ searchParams }: props): Promise<Metadata> {

    if (searchParams.mode === 'buyer') {
        return {
            title: 'Create Buyer Account'
        }
    }

    if (searchParams.mode === 'seller') {
        return {
            title: 'Create Seller Account'
        }
    }

    return {
        title: 'Create Account'
    }
}


const Signup: React.FC<props> = (props) => {

    const { searchParams } = props

    if (searchParams.mode === 'buyer' || searchParams.mode === 'seller') {
        return <SignUpForm mode={searchParams.mode} />
    }

    return <div className={c.popup} style={fontSatoshi.style}>
        <Link className={c.link} href={'/login'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.3393 5.6607C19.6648 5.98614 19.6648 6.51378 19.3393 6.83921L6.83934 19.3392C6.5139 19.6647 5.98626 19.6647 5.66083 19.3392C5.33539 19.0138 5.33539 18.4861 5.66083 18.1607L18.1608 5.6607C18.4863 5.33527 19.0139 5.33527 19.3393 5.6607Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5.66083 5.6607C5.98626 5.33527 6.5139 5.33527 6.83934 5.6607L19.3393 18.1607C19.6648 18.4861 19.6648 19.0138 19.3393 19.3392C19.0139 19.6647 18.4863 19.6647 18.1608 19.3392L5.66083 6.83921C5.33539 6.51378 5.33539 5.98614 5.66083 5.6607Z" fill="black" />
            </svg>
        </Link>
        <h1>Are you a seller or a buyer?</h1>
        <div className={c.select}>
            <Link href={'/signup?mode=buyer'}>Buyer</Link>
            <Link href={'/signup?mode=seller'}>Seller</Link>
        </div>
    </div>
}

export default Signup