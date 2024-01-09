'use client'
import React from 'react'
import c from './Title.module.scss'


const Title: React.FC<{
    text: string
    spaceTop?: boolean
    bigSpace?: boolean
    className?: string
    id?: string
}> = ({ text, spaceTop, bigSpace, className, id }) => {
    return <h1 id={id} className={className ? `${c.text} ${className}` : c.text} style={spaceTop ? { marginTop:bigSpace ? 100 : 50 } : {}}>
        {text}
    </h1>
}

export default Title