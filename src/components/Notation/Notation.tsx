'use client'
import React from 'react'
import c from './Notation.module.scss'

interface props {
    title: string
    text: string
}

const Notation: React.FC<props> = ({title, text}) => {
    return <section className={c.main}>
        <h2>{title}</h2>
        <p>{text}</p>
    </section>
}

export default Notation
