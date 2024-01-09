'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import c from './Header.module.scss'
import localFont from 'next/font/local'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import useAuthStore from '@stores/useAuthStore'
import { RootStackEnum, Product } from '@config/types'
import axios from 'axios'
import useCartStore from '@stores/useCartStore'
import Basket from '@components/Basket/Basket'


const fontOfficina = localFont({ src: '../../fonts/OfficinaSansStd-Book.otf' })

const Header: React.FC = () => {

    const [search, setSearch] = useState('')
    const [result, setResult] = useState<Array<Product>>([])
    const router = useRouter()
    const pathname = usePathname()
    const userData = useAuthStore((state) => state.userData)
    const isLogined = useAuthStore((state) => state.isLogined)
    const setIsOpen = useCartStore((state) => state.setIsOpen)
    const isOpen = useCartStore((state) => state.isOpen)

    useEffect(() => {
        if(!search) return
        const tim = setTimeout(() => {
            axios.get(`/api/products?text=${search}`).then(({ data }) => {
                setResult(data.products)
            })
        }, 200)

        return () => clearTimeout(tim)
    }, [search])

    useLayoutEffect(() => {
        if (isLogined) {
            if (pathname === RootStackEnum.LOGIN || pathname === RootStackEnum.SIGNUP) router.replace(RootStackEnum.HOMEPAGE)
        }
    })

    return <header className={c.main}>
        <div className={classNames('container', c.container)}>
            <Link href={'/'} className={c.logo} style={fontOfficina.style}>
                Auto Part Cart
            </Link>
            {isLogined && <div className={c.icons}>
                <svg onClick={() => router.push(userData.role === 'BUSINESS' ? RootStackEnum.SELLER : RootStackEnum.BUYER)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58058 19.3306C6.75268 18.1585 8.3424 17.5 10 17.5H20C21.6576 17.5 23.2473 18.1585 24.4194 19.3306C25.5915 20.5027 26.25 22.0924 26.25 23.75V26.25C26.25 26.9404 25.6904 27.5 25 27.5C24.3096 27.5 23.75 26.9404 23.75 26.25V23.75C23.75 22.7554 23.3549 21.8016 22.6516 21.0984C21.9484 20.3951 20.9946 20 20 20H10C9.00544 20 8.05161 20.3951 7.34835 21.0984C6.64509 21.8016 6.25 22.7554 6.25 23.75V26.25C6.25 26.9404 5.69036 27.5 5 27.5C4.30964 27.5 3.75 26.9404 3.75 26.25V23.75C3.75 22.0924 4.40848 20.5027 5.58058 19.3306Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 5C12.9289 5 11.25 6.67893 11.25 8.75C11.25 10.8211 12.9289 12.5 15 12.5C17.0711 12.5 18.75 10.8211 18.75 8.75C18.75 6.67893 17.0711 5 15 5ZM8.75 8.75C8.75 5.29822 11.5482 2.5 15 2.5C18.4518 2.5 21.25 5.29822 21.25 8.75C21.25 12.2018 18.4518 15 15 15C11.5482 15 8.75 12.2018 8.75 8.75Z" fill="white" />
                </svg>
                <svg onClick={() => router.push('/me#messages')} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M26.25 14.375C26.2543 16.0249 25.8688 17.6524 25.125 19.125C24.243 20.8897 22.8872 22.374 21.2093 23.4116C19.5314 24.4493 17.5978 24.9993 15.625 25C13.9752 25.0043 12.3476 24.6189 10.875 23.875L3.75 26.25L6.125 19.125C5.38116 17.6524 4.9957 16.0249 5 14.375C5.00076 12.4022 5.55076 10.4686 6.5884 8.79072C7.62603 7.11285 9.11032 5.75699 10.875 4.87504C12.3476 4.1312 13.9752 3.74573 15.625 3.75004H16.25C18.8554 3.89378 21.3163 4.99349 23.1614 6.83861C25.0065 8.68373 26.1063 11.1446 26.25 13.75V14.375Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>}
            <div className={c.search}>
                <input placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className={c.asd}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
                        <path d="M13.2917 23.75C18.6304 23.75 22.9583 19.2728 22.9583 13.75C22.9583 8.22715 18.6304 3.75 13.2917 3.75C7.95291 3.75 3.625 8.22715 3.625 13.75C3.625 19.2728 7.95291 23.75 13.2917 23.75Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M25.3749 26.25L20.1187 20.8125" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                {search && result && result.length > 0 && <div className={c.result} style={fontOfficina.style}>
                    {result.map((item) => <Link href={`/product/${item._id}`} onClick={() => setSearch('')}>
                        <h4>{item.title}</h4>
                        <p>{item.price}</p>
                    </Link>)}
                </div>}
            </div>
            {isLogined && <div className={c.icons_mob}>
                <svg onClick={() => router.push(userData.role === 'BUSINESS' ? RootStackEnum.SELLER : RootStackEnum.BUYER)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58058 19.3306C6.75268 18.1585 8.3424 17.5 10 17.5H20C21.6576 17.5 23.2473 18.1585 24.4194 19.3306C25.5915 20.5027 26.25 22.0924 26.25 23.75V26.25C26.25 26.9404 25.6904 27.5 25 27.5C24.3096 27.5 23.75 26.9404 23.75 26.25V23.75C23.75 22.7554 23.3549 21.8016 22.6516 21.0984C21.9484 20.3951 20.9946 20 20 20H10C9.00544 20 8.05161 20.3951 7.34835 21.0984C6.64509 21.8016 6.25 22.7554 6.25 23.75V26.25C6.25 26.9404 5.69036 27.5 5 27.5C4.30964 27.5 3.75 26.9404 3.75 26.25V23.75C3.75 22.0924 4.40848 20.5027 5.58058 19.3306Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 5C12.9289 5 11.25 6.67893 11.25 8.75C11.25 10.8211 12.9289 12.5 15 12.5C17.0711 12.5 18.75 10.8211 18.75 8.75C18.75 6.67893 17.0711 5 15 5ZM8.75 8.75C8.75 5.29822 11.5482 2.5 15 2.5C18.4518 2.5 21.25 5.29822 21.25 8.75C21.25 12.2018 18.4518 15 15 15C11.5482 15 8.75 12.2018 8.75 8.75Z" fill="white" />
                </svg>
            </div>}
            <div className={c.add}>
                <button onClick={() => router.push('/categories')}>Find</button>
            </div>
            <div onClick={() => setIsOpen(!isOpen)} className={c.cart}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clipPath="url(#clip0_3_204)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.75 26.25C8.75 24.8693 9.86929 23.75 11.25 23.75C12.6307 23.75 13.75 24.8693 13.75 26.25C13.75 27.6307 12.6307 28.75 11.25 28.75C9.86929 28.75 8.75 27.6307 8.75 26.25Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M22.5 26.25C22.5 24.8693 23.6193 23.75 25 23.75C26.3807 23.75 27.5 24.8693 27.5 26.25C27.5 27.6307 26.3807 28.75 25 28.75C23.6193 28.75 22.5 27.6307 22.5 26.25Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 1.25C0 0.559644 0.559644 0 1.25 0H6.25C6.84578 0 7.35876 0.420482 7.47569 1.00468L8.52554 6.25H28.75C29.1225 6.25 29.4757 6.41616 29.7131 6.70319C29.9506 6.99023 30.0477 7.36822 29.9779 7.73416L27.9761 18.231C27.8046 19.0943 27.335 19.8697 26.6494 20.4216C25.9672 20.9707 25.1145 21.2637 24.2392 21.25H12.1108C11.2355 21.2637 10.3828 20.9707 9.7006 20.4216C9.01531 19.8699 8.54579 19.0949 8.37416 18.2321C8.37409 18.2317 8.37423 18.2324 8.37416 18.2321L6.28599 7.799C6.27752 7.76449 6.27048 7.72942 6.26494 7.69385L5.2254 2.5H1.25C0.559644 2.5 0 1.94036 0 1.25ZM9.02591 8.75L10.8261 17.744C10.8832 18.0317 11.0397 18.2902 11.2683 18.4742C11.4968 18.6581 11.7827 18.7559 12.076 18.7502L12.1 18.75H24.25L24.274 18.7502C24.5673 18.7559 24.8532 18.6581 25.0817 18.4742C25.3092 18.2911 25.4653 18.0341 25.5231 17.748L27.2391 8.75H9.02591Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_3_204">
                            <rect width="30" height="30" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
        <div className={c.menu}>
            <nav className='container'>
                <Link href={RootStackEnum.HOMEPAGE} className={pathname === RootStackEnum.HOMEPAGE ? c.selected : c.menu_item}>Best Products</Link>
                {isLogined && <Link href='/me' className={pathname === '/me' ? c.selected : c.menu_item}>Your profile</Link>}
                <Link href={RootStackEnum.ABOUT} className={pathname === RootStackEnum.ABOUT ? c.selected : c.menu_item}>About Us</Link>
                {!isLogined
                    ? <Link href={RootStackEnum.LOGIN} className={pathname === RootStackEnum.LOGIN ? c.selected : c.menu_item}>Sign In</Link>
                    : <a href="#" onClick={() => {
                        document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
                        signOut()
                        }}>Sign Out</a>}
                <Link href={RootStackEnum.INSTRUCTIONS} className={pathname === RootStackEnum.INSTRUCTIONS ? c.selected : c.menu_item}>Instructions</Link>
            </nav>
        </div>
        <Basket/>
    </header>
}


export default Header