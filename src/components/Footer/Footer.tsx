import React from 'react'
import c from './Footer.module.scss'
import localFont from 'next/font/local'
import classNames from 'classnames'
import Link from 'next/link'

const fontOfficina = localFont({ src: '../../fonts/OfficinaSansStd-Book.otf' })

const Footer: React.FC = (props) => {
    return <footer className={c.main}>
        <div className={classNames('container', c.container)}>
            <div className={c.links}>
                <Link href='/signin'>Log In</Link>
                <Link href='/signup'>Sign Up</Link>
                <Link href='/about'>About Us</Link>
            </div>
            <h3 className={c.title} style={fontOfficina.style}>
                Auto Part Cart
            </h3>
            <div className={c.links}>
                <Link href='/instructions'>Instructions</Link>
                <Link href='/privacy'>Private Policy</Link>
                <Link href='/privacy'>Terms and Conditions</Link>
            </div>
        </div>
        <span className={c.note}>© 2023 Auto Part Cart. All rights reserved.</span>
    </footer>
}

export default Footer
