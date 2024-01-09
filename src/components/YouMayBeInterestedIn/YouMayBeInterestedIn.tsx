'use client'
import React, { useState } from 'react'
import c from './YouMayBeInterestedIn.module.scss'

const YouMayBeInterestedIn: React.FC = () => {

  return <section className={c.main}>
    <h2 className={c.title}>
      You may be interested
    </h2>
    <div className={c.slider} style={{
      width: `calc(${1} * 100%)`
    }}>
      <svg className={c.controls} xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M47.1213 15.8787C48.2929 17.0503 48.2929 18.9497 47.1213 20.1213L31.2426 36L47.1213 51.8787C48.2929 53.0503 48.2929 54.9497 47.1213 56.1213C45.9497 57.2929 44.0503 57.2929 42.8787 56.1213L24.8787 38.1213C23.7071 36.9497 23.7071 35.0503 24.8787 33.8787L42.8787 15.8787C44.0503 14.7071 45.9497 14.7071 47.1213 15.8787Z" fill="#2F3233" />
      </svg>
      <div className={c.products}>
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <svg className={c.controls} xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M47.1213 15.8787C48.2929 17.0503 48.2929 18.9497 47.1213 20.1213L31.2426 36L47.1213 51.8787C48.2929 53.0503 48.2929 54.9497 47.1213 56.1213C45.9497 57.2929 44.0503 57.2929 42.8787 56.1213L24.8787 38.1213C23.7071 36.9497 23.7071 35.0503 24.8787 33.8787L42.8787 15.8787C44.0503 14.7071 45.9497 14.7071 47.1213 15.8787Z" fill="#2F3233" />
      </svg>
    </div>
  </section>
}

const Product: React.FC = () => {
  return <div className={c.product}>
    <img src='https://s3-alpha-sig.figma.com/img/6800/0cd9/bb6c497b90b9b9247f1df1e8d037bc08?Expires=1691366400&Signature=jcDHpax8mvlJhnOCZTbPdsfL8Y-qWx5BZXtK3Og9MOCzeiBXSHgRSsuLwuXP-FKAR0P5FV0Hx9jtmhNzPfoHUdyAduKtWRAa9AgDBpyS0Lus4fhi6zubcxp3YieKXgJdVMkGWZYfgrdK~EqnBjoBaIb-Q1BfQ97QuovZFyKo6wMpgQ0vIOw0~w2Sxzi7qmUTdIkCKU1Gr8VnZ3AoO~XLXKJRgd2nDhDFFccy24aemKvkkzX-4Rfe2iWmCo2sc10lF-cmhPrANJVZafhMtwVSSY0WIq2uK1~cxnMO5F3T6ZL3f9M3BdWeWnXR4ywwkq59A4xrBoBInSf0WkpYgm3fGQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='Auto Part' />
    <div className={c.texts}>
      <div>
        <h6>Auto Part</h6>
        <span>100$</span>
      </div>
      <div className={c.cart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clipPath="url(#clip0_17_1157)">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.4082 17.4869C6.4082 16.6068 7.12167 15.8933 8.00177 15.8933C8.88187 15.8933 9.59534 16.6068 9.59534 17.4869C9.59534 18.367 8.88187 19.0804 8.00177 19.0804C7.12167 19.0804 6.4082 18.367 6.4082 17.4869Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M15.1729 17.4869C15.1729 16.6068 15.8863 15.8933 16.7664 15.8933C17.6465 15.8933 18.36 16.6068 18.36 17.4869C18.36 18.367 17.6465 19.0804 16.7664 19.0804C15.8863 19.0804 15.1729 18.367 15.1729 17.4869Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0.831055 1.55118C0.831055 1.11113 1.18779 0.754395 1.62784 0.754395H4.81497C5.19474 0.754395 5.52173 1.02242 5.59626 1.3948L6.26546 4.73831H19.1571C19.3945 4.73831 19.6196 4.84423 19.771 5.02719C19.9224 5.21015 19.9842 5.4511 19.9398 5.68436L18.6638 12.3753C18.5545 12.9256 18.2551 13.4199 17.8181 13.7717C17.3833 14.1217 16.8397 14.3085 16.2818 14.2997H8.55081C7.99284 14.3085 7.4493 14.1217 7.01448 13.7717C6.57765 13.42 6.27837 12.926 6.16897 12.376C6.16892 12.3758 6.16901 12.3762 6.16897 12.376L4.83791 5.72569C4.83251 5.70369 4.82803 5.68133 4.8245 5.65866L4.16186 2.34796H1.62784C1.18779 2.34796 0.831055 1.99123 0.831055 1.55118ZM6.58441 6.33188L7.73187 12.0649C7.7683 12.2483 7.86808 12.4131 8.01375 12.5303C8.15942 12.6476 8.34169 12.7099 8.52865 12.7063L8.54392 12.7061H16.2887L16.3039 12.7063C16.4909 12.7099 16.6732 12.6476 16.8188 12.5303C16.9638 12.4136 17.0633 12.2498 17.1002 12.0674L18.194 6.33188H6.58441Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_17_1157">
              <rect width="19.1228" height="19.1228" fill="white" transform="translate(0.831055 0.754395)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  </div>
}

export default YouMayBeInterestedIn