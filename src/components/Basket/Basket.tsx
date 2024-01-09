'use client'
import c from './Basket.module.scss'
import { useRouter } from 'next/navigation'
import useCartStore from '@stores/useCartStore'
import Button from '@components/Button/Button'
import { Product } from '@config/types'
import Swal from 'sweetalert2'

const Basket: React.FC = () => {

    const router = useRouter()

    const products = useCartStore((state) => state.products)
    const isOpen = useCartStore((state) => state.isOpen)
    const setIsOpen = useCartStore((state) => state.setIsOpen)

    return <div className={c.main} onClick={() => setIsOpen(false)} style={{
        transform: isOpen ? 'scale(1)' : 'scale(0)',
        opacity: isOpen ? 1 : 0,
    }}>
        <div className={c.container} onClick={(e) => e.stopPropagation()}>
            {products[0] ? <>{products.map((product, index) => <Product product={product} key={index} />)}<Button onClick={() => {
                // dispatch(paymentActions.setProductId(productsIds))
                // dispatch(paymentActions.setProductName(titles.join(', '))) //TODO payment
                // dispatch(paymentActions.setSum(totalAmount))
                router.push('/payment')
                setIsOpen(false)
            }} className={c.pay} /></> : 'Nothing in Cart... Add something...'}
        </div>
    </div>
}


const Product: React.FC<{ product: Product }> = ({ product }) => {

    const removeProduct = useCartStore((state) => state.removeProduct)

    return <div className={c.product}>
        <h2 className={c.title}>{product.title}</h2>
        <div className={c.info}>
            <div className={c.image}>
                <img src={product.images[0] ? product.images[0] : process.env.NEXT_PUBLIC_IMAGE_ERROR} />
            </div>
            <div className={c.texts}>
                <div className={c.price}>{product.price}$ <p>In stock</p></div>
                <div className={c.btn}>
                    <Button black title='Delete' style={{margin:0}} onClick={() => {
                        removeProduct(product._id)
                        Swal.fire({
                            title: `1 ${product.title} removed from cart!`,
                            icon: 'success'
                        })
                    }} />
                </div>
                <div className={c.description}>
                    {product.text}
                </div>  
            </div>
        </div>
    </div>
}

export default Basket