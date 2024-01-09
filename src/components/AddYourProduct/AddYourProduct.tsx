'use client'
import { useState, FC } from 'react'
import c from './AddYourProduct.module.scss'
import { useFormik } from 'formik'
import TextareaAutoResize from 'react-textarea-autosize'
import Swal from 'sweetalert2'
import Button from '@components/Button/Button'
import { categoriesList } from '@config/consts'
import axios from 'axios'
import useMyProductStore from '@stores/useMyProductStore'


const AddYourProduct: FC = () => {
    const [images, setImage] = useState<null | File[]>(null)
    const [error, setError] = useState<null | string>(null)
    const addProduct = useMyProductStore((state) => state.addProduct)
    const { errors, touched, handleBlur, handleChange, handleSubmit, values, isSubmitting } = useFormik({
        initialValues: {
            title: '',
            text: '',
            category: categoriesList[0],
            subcategory: '',
            price: '',
        },
        onSubmit: async (values, { resetForm }) => {
            if (images) {
                if (images.length > 5) return setError('5 Images max!')
                const data = new FormData()
                for (let i = 0; i < 5; i++) {
                    data.append(`file${i}`, images[i])
                }
                axios.post('/api/upload', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                }).then(({ data }) => {
                    axios.post('/api/product', {
                        ...values,
                        images: data.urls
                    }).then(({ data }) => {
                        setImage(null)
                        setError(null)
                        resetForm()
                        Swal.fire({
                            title: 'Success',
                            timer: 2000,
                            icon: 'success'
                        }).then(() => {
                            addProduct(data.product)
                        })
                    }).catch(() => {
                        setError('Product creation failed!')
                    })
                }).catch(() => {
                    setError('Product creation failed!')
                })
                return
            }
            axios.post('/api/product', {
                ...values,
                images: []
            }).then(({ data }) => {
                setImage(null)
                setError(null)
                resetForm()
                Swal.fire({
                    title: 'Success',
                    timer: 2000,
                    icon: 'success'
                }).then(() => {
                    addProduct(data.product)
                })
            }).catch(() => {
                setError('Product creation failed!')
            })
        }
    })

    return <aside className={c.main}>
        <label htmlFor='photo_add_product' className={c.photo}>
            <svg className={c.icon} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.75 17.5C4.44036 17.5 5 18.0596 5 18.75V23.75C5 24.0815 5.1317 24.3995 5.36612 24.6339C5.60054 24.8683 5.91848 25 6.25 25H23.75C24.0815 25 24.3995 24.8683 24.6339 24.6339C24.8683 24.3995 25 24.0815 25 23.75V18.75C25 18.0596 25.5596 17.5 26.25 17.5C26.9404 17.5 27.5 18.0596 27.5 18.75V23.75C27.5 24.7446 27.1049 25.6984 26.4016 26.4016C25.6984 27.1049 24.7446 27.5 23.75 27.5H6.25C5.25544 27.5 4.30161 27.1049 3.59835 26.4016C2.89509 25.6984 2.5 24.7446 2.5 23.75V18.75C2.5 18.0596 3.05964 17.5 3.75 17.5Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.86612 11.6161C8.35427 11.128 9.14573 11.128 9.63388 11.6161L15 16.9822L20.3661 11.6161C20.8543 11.128 21.6457 11.128 22.1339 11.6161C22.622 12.1043 22.622 12.8957 22.1339 13.3839L15.8839 19.6339C15.3957 20.122 14.6043 20.122 14.1161 19.6339L7.86612 13.3839C7.37796 12.8957 7.37796 12.1043 7.86612 11.6161Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M15 2.5C15.6904 2.5 16.25 3.05964 16.25 3.75V18.75C16.25 19.4404 15.6904 20 15 20C14.3096 20 13.75 19.4404 13.75 18.75V3.75C13.75 3.05964 14.3096 2.5 15 2.5Z" fill="black" />
            </svg>
            <div>{images ? `Files: ${images.length}` : 'Add Photos of Your  Product'}</div>
            {!images ? <div className={c.btn1}>Add files</div> : <div className={c.btn1} onClick={(e) => {
                e.preventDefault()
                setImage(null)
            }}>Cancel</div>}
            {/*@ts-ignore*/}
            <input id='photo_add_product' multiple accept='.jpg,.jpeg,.png' type='file' onChange={(e) => setImage(e.target.files)} />
        </label>
        <form className={c.form} onSubmit={handleSubmit}>
            <h3>Describe your item</h3>
            <div className={c.inp_con}>
                <input className={errors.title && touched.title ? c.inp_error : c.inp} id='title' name='title' placeholder='Title' onChange={handleChange} onBlur={handleBlur} value={values.title} />
                {errors.title && touched.title && <span className={c.error}>{errors.title}</span>}
            </div>

            <div className={c.inp_con}>
                <TextareaAutoResize minRows={5} className={errors.text && touched.text ? c.inp_error : c.inp} id='text' name='text' placeholder='Text' onChange={handleChange} onBlur={handleBlur} value={values.text} />
                {errors.text && touched.text && <span className={c.error}>{errors.text}</span>}
            </div>

            <div className={c.inp_con}>
                <label htmlFor='category'>Category</label>
                <select value={values.category} onChange={handleChange} id="category" name='category' className={errors.category && touched.category ? c.inp_error : c.inp}>
                    {categoriesList.map((item) => <option key={`category${item}`} value={item}>{item}</option>)}
                </select>
            </div>

            <div className={c.inp_con}>
                <label htmlFor='subcategory'>Subcategory</label>
                <select value={values.subcategory} onChange={handleChange} id="subcategory" name='subcategory' className={errors.subcategory && touched.subcategory ? c.inp_error : c.inp}>
                    <option value='asd'>asd</option>
                    <option value='diff'>Diff</option>
                </select>
            </div>


            <h3>Terms of sale</h3>

            <div className={c.inp_con}>
                <input className={errors.price && touched.price ? c.inp_error : c.inp} id='price' name='price' placeholder='Price' onChange={handleChange} onBlur={handleBlur} value={values.price} />
                {errors.price && touched.price && <span className={c.error}>{errors.price}</span>}
            </div>

            {error && <div className='error' >{error}</div>}

            <Button title='Save' type='submit' disabled={isSubmitting} />
        </form>
    </aside>
}

export default AddYourProduct