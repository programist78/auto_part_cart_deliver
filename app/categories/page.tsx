'use client'
import c from './Categories.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import classNames from 'classnames'
import { Product as ProductType } from '@config/types'
import { categoriesList } from '@config/consts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import logger from '@utils/logger'
import useCartStore from '@stores/useCartStore'
import Link from 'next/link'


const Categories: React.FC = () => {

  const params = useSearchParams()
  const router = useRouter()

  const [products, setProducts] = useState<Array<ProductType>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancelTokenSource, setCancelTokenSource] = useState(null)
  const category = params.get('category')
  const filter = params.get('filter')
  const subcategory = params.get('subcategory')
  const page = params.get('page')
  const current = new URLSearchParams(Array.from(params.entries()))

  useEffect(() => {
    setIsLoading(true)
    if (cancelTokenSource) cancelTokenSource.cancel('Request canceled')

    const source = axios.CancelToken.source()
    setCancelTokenSource(source)

    axios.post('/api/products', { page, category, filter, subcategory }, { cancelToken: source.token })
      .then(({ data }) => {
        setProducts(data.products)
        setIsLoading(false)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          logger('Request canceled', error.message)
        } else {
          Swal.fire({
            title: 'Something went wrong!',
            icon: 'error'
          })
          setIsLoading(false)
        }
      })

    return () => {
      source.cancel('Request canceled due to component unmount')
    }
  }, [page, category, filter, subcategory])

  return <main className={classNames(c.main, 'container')}>
    <div className={c.top}>
      <h1 className={c.title}>Auto Product</h1>
      <div className={c.selectors}>

        <label htmlFor='category'>Category:</label>
        <select defaultValue={category ? category : ''} className={c.select} name="category" id="category" onChange={(e) => {
          if (!e.target.value) return current.delete('category')
          current.set('category', e.target.value)
          router.replace(`/categories?${current.toString()}`)
        }} >
          {categoriesList.map((item, index) => <option key={`category${item}${index}`} value={item.replace(' ', '-')}>{item}</option>)}
        </select>

        <label htmlFor='subcategory'>Subcategory:</label>
        <select className={c.select} name="subcategory" id="subcategory" defaultValue={subcategory ? subcategory : ''} onChange={(e) => {
          if (!e.target.value) return current.delete('subcategory')
          current.set('subcategory', e.target.value)
          router.replace(`/categories?${current.toString()}`)
        }}>

        </select>

        <label htmlFor='sort'>Sort by:</label>
        <select className={c.select} name="sort" id="sort" defaultValue={filter ? filter : ''} onChange={(e) => {
          if (!e.target.value) return current.delete('filter')
          current.set('filter', e.target.value)
          router.replace(`/categories?${current.toString()}`)
        }}>
          <option value="">Default</option>
          <option value="price">Price(From hight to low)</option>
          <option value="price-reverse">Price(From low to hight)</option>
        </select>

      </div>
    </div>
    <div className={c.products}>
      {isLoading
        ? <div className={c.empty}>Loading...</div>
        : products && products.length > 0
          ? products.map((item, index) => <Product key={`product${index}`} product={item} />)
          : <div className={c.empty}>There are no such products...</div>
      }
      <div className={c.pagination}>
        <Link href={{
          href: '/categories',
          query: {
            page: +page <= 1 ? 1 : +page - 1,
            category,
            subcategory,
            filter
          }
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ transform: 'scaleX(-1)' }}>
          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" fill='white'/>
        </svg>
      </Link>
        {page ? page : 1}
        <Link href={{
          href: '/categories',
          query: {
            page: +page+1,
            category,
            subcategory,
            filter
          }
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" fill='white'/>
          </svg>
          </Link>
      </div>
    </div>
  </main>
}





const Product: React.FC<{ product: ProductType }> = ({ product }) => {

  const addProduct = useCartStore((state) => state.addProduct)

  return <Link href={`/product/${product._id}`} className={c.product}>
    <img src={product.images[0] ? product.images[0] : process.env.NEXT_PUBLIC_IMAGE_ERROR} alt={product.title} onError={(e) => (e.target as HTMLImageElement).src = process.env.NEXT_PUBLIC_IMAGE_ERROR} />
    <div className={c.product_texts}>
      <div className={c.product_title}>
        <h6>{product.title}</h6>
        <span>{product.price}$</span>
      </div>
      <div className={c.cart} onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addProduct(product)
                Swal.fire({
                    title: `${product.title} added to cart!`,
                    icon: 'success'
                })
            }}>
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
  </Link>
}

export default Categories
