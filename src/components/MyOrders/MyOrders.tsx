'use client'
import { FC, useState } from 'react'
import c from './MyOrders.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import useAuthStore from '@stores/useAuthStore'
import useMyProductStore from '@stores/useMyProductStore'


const MyOrders: FC = () => {

    const [pageNum, setPageNum] = useState(1)
    const role = useAuthStore((state) => state.userData.role)
    const pageSize = 4
    const products = useMyProductStore((state) => state.products)
    const offset = pageSize * (pageNum - 1)
    const visibleProducts = products.slice(0 + offset, pageSize + offset)

    switch (role) {
        case 'BUSINESS': {
            return <aside className={c.main}>
                {visibleProducts.map((item, index) => <Product id={item._id} name={item.title} price={item.price} active={item.active} key={`product${index}`} />)}
                <div className={c.controls}>
                    <svg onClick={() => setPageNum((prev) => prev <= 1 ? 1 : prev - 1)} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <path d="M14 26.5L22.75 17.75L14 9" stroke="#767575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {pageNum}
                    <svg onClick={() => setPageNum((prev) => prev < Math.ceil(products.length / 4) ? prev+1 : Math.ceil(products.length / 4))} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <path d="M14 26.5L22.75 17.75L14 9" stroke="#767575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </aside>
        }
    }

    return <aside className={c.main}>
        <div className={c.controls}>
            <svg onClick={() => setPageNum((prev) => prev <= 1 ? 1 : prev - 1)} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M14 26.5L22.75 17.75L14 9" stroke="#767575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {pageNum}
            <svg onClick={() => { }} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M14 26.5L22.75 17.75L14 9" stroke="#767575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    </aside>
}


const Order: React.FC<any> = ({ order }) => {

    const router = useRouter()

    return <div className={c.order}>
        <h6 className={c.id}>{order.title}</h6>
        {order.delivered
            ? <div className={classNames(c.status, c.done)}>Done</div>
            : <div className={classNames(c.status, c.not_done)}>Not Done</div>
        }
        <div className={c.name}>{order.tariff}</div>
        <div>Price: {order.priceforProduct}$</div>
        <button className={c.btn} onClick={() => router.push(`/product/${order.productId}`)}>Repeat the order</button>
    </div>
}


const Product: React.FC<{ id: string, name: string, active: boolean, price: number }> = ({ id, name, active, price }) => {

    const router = useRouter()
    const deleteProduct = useMyProductStore((state) => state.deleteProduct)

    return <div className={c.order} onClick={() => router.push(`/product/${id}`)}>
        <h6 className={c.name}>{name}</h6>
        {active ? <div className={classNames(c.status, c.done)}>Active</div>
            : <div className={classNames(c.status, c.active)}>Disabled</div>}
        <div>Price: {price}$</div>

        <button className={c.delete} onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            Swal.fire({
                title: `Are you sure that you want to delete ${name}`,
                icon: 'warning',
                confirmButtonText: 'Delete',
                confirmButtonColor: '#ff0000',
                cancelButtonColor: '#cfcfcf',
                cancelButtonText: 'Cancel',
                showCancelButton: true
            }).then((res) => {
                if (!res.isConfirmed) return
                deleteProduct(id)
            })
        }}>Delete</button>
    </div>
}


export default MyOrders