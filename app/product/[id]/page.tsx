'use client'
import React, { useState } from 'react'
import c from './ProductPage.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import useProductPageStore from '@stores/useProductPageStore'
import Button from '@components/Button/Button'
import YouMayBeInterestedIn from '@components/YouMayBeInterestedIn/YouMayBeInterestedIn'
import Notation from '@components/Notation/Notation'
import Reviews from '@components/Reviews/Reviews'
import useCartStore from '@stores/useCartStore'
import Swal from 'sweetalert2'


const ProductPage: React.FC = () => {

    const product = useProductPageStore((state) => state.product)
    const reviews = useProductPageStore((state) => state.reviews)
    const [image, setImage] = useState(product.images[0] ? product.images[0] : process.env.NEXT_PUBLIC_IMAGE_ERROR)
    const addProduct = useCartStore((state) => state.addProduct)

    return <div className='container'><div className={classNames(c.main)}>
        <h1 className={c.title}>{product.title} <Link href={`/profile/${product.author._id}`}>Seller: {product.author.fullname}</Link></h1>
        <section className={c.info}>
            <div className={c.images}>
                <img className={c.main_image} src={image} onError={(e) => e.currentTarget.src = process.env.IMAGE_ERROR} />
                <div className={c.lil_images}>
                    {product.images[0] && <img onClick={() => setImage(product.images[0])} src={product.images[0] ? product.images[0] : process.env.IMAGE_ERROR} onError={(e) => e.currentTarget.src = process.env.IMAGE_ERROR}/>}
                    {product.images[1] && <img onClick={() => setImage(product.images[1])} src={product.images[1] ? product.images[1] : process.env.IMAGE_ERROR} onError={(e) => e.currentTarget.src = process.env.IMAGE_ERROR}/>}
                    {product.images[2] && <img onClick={() => setImage(product.images[2])} src={product.images[2] ? product.images[2] : process.env.IMAGE_ERROR} onError={(e) => e.currentTarget.src = process.env.IMAGE_ERROR}/>}
                    {product.images[3] && <img onClick={() => setImage(product.images[3])} src={product.images[3] ? product.images[3] : process.env.IMAGE_ERROR} onError={(e) => e.currentTarget.src = process.env.IMAGE_ERROR}/>}
                    {product.images[4] && <img onClick={() => setImage(product.images[4])} src={product.images[4] ? product.images[4] : process.env.IMAGE_ERROR} onError={(e) => e.currentTarget.src = process.env.IMAGE_ERROR}/>}
                </div>
            </div>
            <div className={c.texts}>
                <div className={c.price}>
                    <h2>{product.price}$</h2>
                    <div>
                        <span>In stock</span>
                    </div>
                </div>
                <p className={c.notion}>There is a guarantee</p>
                <div className={c.btns}>
                    <Button onClick={() => {
                        // TODO add to cart and go to payment
                    }}/>
                    <Button black={true} onClick={() => {
                        addProduct({...product, author:product.author._id })
                        Swal.fire({
                            title: `${product.title} added to cart!`,
                            icon: 'success'
                        })
                        }} title='Add to Cart' />
                </div>
            </div>
        </section>
        <YouMayBeInterestedIn />
        <Notation title='Description' text={product.text ? product.text : 'This product has no description...'} />
        <Reviews belongsTo={product._id} reviews={reviews} title='Product Reviews' />
    </div>
    </div>
}

export default ProductPage
