'use client'
import React from 'react'
import c from './ProductTracking.module.scss'
import classNames from 'classnames'


const ProductTracking: React.FC = (props) => {
    
    return <article className={c.main}>
        <div className={c.product_info}>
            <div>№2483</div>
            <div className={c.from}>From: Denmark</div>
            <div className={c.to}>To: New York</div>
            <div>Computer Mouse</div>
            <div>Price: 30$</div>
        </div>
        <div className={c.progress_bar}>
            <div className={c.line} />
            <div className={c.points}>
                <div className={c.point}>
                    <div className={c.text}>New Order</div>
                </div>
                <div className={c.point}>
                    <div className={c.text}>Completed</div>
                </div>
                <div className={c.point}>
                    <div className={c.text}>Forwarded to delivery service</div>
                </div>
                <div className={c.point}>
                    <div className={c.text}>Delivered</div>
                </div>
                <div className={c.point}>
                    <div className={c.text}>Waiting for the client at the pick-up point</div>
                </div>
                <div className={classNames(c.point, c.current)}>
                    <div className={c.text}>Done</div>
                </div>
            </div>
        </div>
        <div className={c.btn}>
            <button>View the ad</button>
        </div>
    </article>
}

export default ProductTracking
