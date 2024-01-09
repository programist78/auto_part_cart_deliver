'use client'
import React, { useState } from 'react'
import c from './HelpFrom.module.scss'
import { useFormik } from 'formik'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '@components/Button/Button'
import axios from 'axios'
import Swal from 'sweetalert2'


const HelpFrom: React.FC = () => {

    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState<null | string>(null)

    const { errors, handleBlur, handleChange, handleSubmit, values, touched } = useFormik({
        initialValues: {
            name: '',
            email: '',
            text: ''
        },
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true)
            axios.post('/api/help', values).then(() => {
                Swal.fire({
                    title:'Help message sent',
                    icon: 'success'
                })
                setIsLoading(false)
                setError(null)
                resetForm()
            }).catch(() => {
                Swal.fire({
                    title:'Something went wrong',
                    icon: 'error'
                })
                setError('Something went wrong')
                setIsLoading(false)
            })
        }
    })

    return <article className={c.main}>
        <form className={c.form} onSubmit={handleSubmit}>
            <h3>Write about your problem and we will help you!</h3>
            <div className={c.inp_con}>
                <label className={c.label} htmlFor='name'>Your Name</label>
                <input disabled={isLoading} className={errors.name && touched.name ? c.inp_error : c.inp} id='name' name='name' placeholder='First Name and Last Name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                {errors.name && touched.name && <span className={c.error}>{errors.name}</span>}
            </div>
            <div className={c.inp_con}>
                <label className={c.label} htmlFor='email'>Email or Phone Number</label>
                <input disabled={isLoading} className={errors.email && touched.email ? c.inp_error : c.inp} id='email' name='email' placeholder='hello@yachtease.co ' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                {errors.email && touched.email && <span className={c.error}>{errors.email}</span>}
            </div>
            <div className={c.inp_con}>
                <label className={c.label} htmlFor='text'>Text</label>
                <TextareaAutosize disabled={isLoading} minRows={10} className={errors.text && touched.text ? c.inp_error : c.inp} id='text' name='text' placeholder='Text' onChange={handleChange} onBlur={handleBlur} value={values.text} />
                {errors.text && touched.text && <span className={c.error}>{errors.text}</span>}
            </div>
            {error && <div className="error">{error}</div>}
            <Button type='submit' title='Send' className={c.btn} />
        </form>
    </article>
}

export default HelpFrom