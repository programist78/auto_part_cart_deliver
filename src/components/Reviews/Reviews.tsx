'use client'
import React from 'react'
import c from './Reviews.module.scss'
import { useFormik } from 'formik'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '@components/Button/Button'
import axios from 'axios'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { Review } from '@config/types'

const Reviews: React.FC<{ belongsTo:string, reviews: Array<Review>, title?:string }> = ({ belongsTo, reviews, title }) => {

    
    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            name: '',
            email: '',
            text: '',
        },
        onSubmit: (values, { resetForm }) => {
            axios.post('/api/review', { ...values, belongsTo }).then(() => {
                Swal.fire({
                    title: 'Review added!',
                    timer: 2000,
                    icon: 'success'
                })
                resetForm()
            }).catch((err) => {
                Swal.fire({
                    title: 'Review adding failed!',
                    icon: 'error'
                })
            })
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            text: Yup.string().required().min(50)
        })
    })

    return <section className={c.main}>
        <div className={c.reviews}>
            {reviews.length > 0 ? <>
                <h3>{title ? title :'Customer reviews'}</h3>
                {reviews.map((item, index) => <Review key={`review${index}`} name={item.authorName} text={item.text} />)}
            </>: <>
                <h3>Customer have no reviews</h3>
            </>}
            
        </div>
        <form className={c.form} onSubmit={handleSubmit}>
            <h3>Write a Review</h3>
            <div className='inp_con'>
                <input style={touched.name && errors.email ? { border: '1px solid red' } : {}} className={c.inp} placeholder='Name' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
            </div>
            <div className='inp_con'>
                <input style={touched.email && errors.email ? { border: '1px solid red' } : {}} className={c.inp} placeholder='Email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
            </div>
            <div className='inp_con'>
                <TextareaAutosize style={touched.text && errors.text ? { border: '1px solid red' } : {}} className={c.inp} placeholder='Text' minRows={4} maxRows={10} name='text' onChange={handleChange} onBlur={handleBlur} value={values.text} />
            </div>
            <Button title='Send' type='submit' className={c.btn} />
        </form>
    </section>
}

interface props {
    name: string
    text: string
}

const Review: React.FC<props> = ({ name, text }) => {
    return <div className={c.review}>
        <div style={{ display: 'flex' }}>
            <h5>{name}</h5>
        </div>
        <p>{text}</p>
    </div>
}

export default Reviews