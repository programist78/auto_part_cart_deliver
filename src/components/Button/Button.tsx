import Link from 'next/link'
import React from 'react'
import c from './Button.module.scss'

interface props {
    style?: React.CSSProperties
    title?: string
    href?: string
    black?: boolean
    className?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset' 
    disabled?: boolean
}

const Button: React.FC<props> = ({ style, black, href, title, className, onClick, type, disabled }) => {

    if (onClick || type || disabled !== undefined) {
        return <button disabled={disabled} type={type} onClick={onClick} className={black ? `${c.btn_black} ${className}` : `${c.btn} ${className}`} style={style}>
            {title ? title : 'Buy Now'}
        </button>
    }

    return <Link className={black ? `${c.btn_black} ${className}` : `${c.btn} ${className}`} style={style} href={href ? href : '/buy'}>
        {title ? title : 'Buy Now'}
    </Link>
}

export default Button