'use client'
import React, { useState } from 'react'
import c from './PersonalForm.module.scss'
import { useFormik } from 'formik'
import useAuthStore from '@stores/useAuthStore'
import Button from '@components/Button/Button'
import Swal from 'sweetalert2'
import axios from 'axios'

const PersonalForm: React.FC<{ withFile?: boolean }> = ({ withFile }) => {
    const [error, setError] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState<null | File>(null)
    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)

    const { handleSubmit, handleBlur, handleChange, errors, values, touched } = useFormik({
        initialValues: {
            name: userData.fullname,
            address: userData.address,
            city: userData.city,
            zip: userData.zipCode,
            country: userData.country,
            birthday: userData.birthdayDate,
            sex: userData.gender,
            number: userData.phoneNumber,
            social: userData.socialLink,
        },
        onSubmit: async (values) => {
            setIsLoading(true)
            if (image) {
                const formData = new FormData
                formData.append('file0', image)
                axios.post('/api/upload', formData).then(({ data }) => {
                    axios.put('/api/auth/me', { ...values, avatarUrl:data.urls[0]}).then(({ data }) => {
                        setUserData(data.user)
                        setError(null)
                        setIsLoading(false)
                        setImage(null)
                        Swal.fire({
                            title: 'Data updated!',
                            icon: 'success',
                            timer: 2000
                        })
                    }).catch(() => {
                        setError('Something went wrong!')
                        setIsLoading(false)
                    })  
                }).catch(() => {
                    setError('Something went wrong!')
                    setIsLoading(false)
                })
                return
            }
            axios.put('/api/auth/me', { ...values}).then(({ data }) => {
                setUserData(data.user)
                setError(null)
                setIsLoading(false)
                setImage(null)
                Swal.fire({
                    title: 'Data updated!',
                    icon: 'success',
                    timer: 2000
                })
            }).catch(() => {
                setError('Something went wrong!')
                setIsLoading(false)
            })
        }
    })

    return <article className={c.main}>
        <form onSubmit={handleSubmit}>
            {withFile && <label htmlFor='personal_photo' className={c.photo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 17.5C4.44036 17.5 5 18.0596 5 18.75V23.75C5 24.0815 5.1317 24.3995 5.36612 24.6339C5.60054 24.8683 5.91848 25 6.25 25H23.75C24.0815 25 24.3995 24.8683 24.6339 24.6339C24.8683 24.3995 25 24.0815 25 23.75V18.75C25 18.0596 25.5596 17.5 26.25 17.5C26.9404 17.5 27.5 18.0596 27.5 18.75V23.75C27.5 24.7446 27.1049 25.6984 26.4016 26.4016C25.6984 27.1049 24.7446 27.5 23.75 27.5H6.25C5.25544 27.5 4.30161 27.1049 3.59835 26.4016C2.89509 25.6984 2.5 24.7446 2.5 23.75V18.75C2.5 18.0596 3.05964 17.5 3.75 17.5Z" fill="black" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.86612 11.6161C8.35427 11.128 9.14573 11.128 9.63388 11.6161L15 16.9822L20.3661 11.6161C20.8543 11.128 21.6457 11.128 22.1339 11.6161C22.622 12.1043 22.622 12.8957 22.1339 13.3839L15.8839 19.6339C15.3957 20.122 14.6043 20.122 14.1161 19.6339L7.86612 13.3839C7.37796 12.8957 7.37796 12.1043 7.86612 11.6161Z" fill="black" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 2.5C15.6904 2.5 16.25 3.05964 16.25 3.75V18.75C16.25 19.4404 15.6904 20 15 20C14.3096 20 13.75 19.4404 13.75 18.75V3.75C13.75 3.05964 14.3096 2.5 15 2.5Z" fill="black" />
                </svg>
                <div>{image ? image.name : 'Add Photo'}</div>
                {image && <button className={c.x} onClick={(e) => {
                    e.preventDefault()
                    setImage(null)
                }}>X</button>}
                <div className={c.btn1}>Download</div>
                <input id='personal_photo' type='file' onChange={(e) => setImage(e.target.files[0])} />
            </label>}
            <div className={c.left}>

                <div className={c.inp_con}>
                    <label className={c.label} htmlFor='name'>Your Name</label>
                    <input className={errors.name && touched.name ? c.inp_error : c.inp} id='name' name='name' placeholder='First Name and Last Name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                    {errors.name && touched.name && <span className={c.error}>{errors.name}</span>}
                </div>

                <div className={c.inp_con}>
                    <label className={c.label} htmlFor='address'>Add Your Adress</label>
                    <input className={errors.address && touched.address ? c.inp_error : c.inp} id='address' name='address' placeholder='USA' onChange={handleChange} onBlur={handleBlur} value={values.address} />
                    {errors.address && touched.address && <span className={c.error}>{errors.address}</span>}
                </div>

                <div className={c.flex}>
                    <div className={c.inp_con}>
                        <label className={c.label} htmlFor='name'>City</label>
                        <input className={errors.city && touched.city ? c.inp_error : c.inp} id='city' name='city' placeholder='New York' onChange={handleChange} onBlur={handleBlur} value={values.city} />
                        {errors.city && touched.city && <span className={c.error}>{errors.city}</span>}
                    </div>
                    <div className={c.inp_con}>
                        <label className={c.label} htmlFor='zip'>ZIP Code</label>
                        <input className={errors.zip && touched.zip ? c.inp_error : c.inp} id='zip' name='zip' placeholder='12345' onChange={handleChange} onBlur={handleBlur} value={values.zip} />
                        {errors.zip && touched.zip && <span className={c.error}>{errors.zip}</span>}
                    </div>
                </div>

                <div className={c.inp_con}>
                    <label className={c.label} htmlFor='country'>Add Your Adress</label>
                    <input className={errors.country && touched.country ? c.inp_error : c.inp} id='country' name='country' placeholder='USA' onChange={handleChange} onBlur={handleBlur} value={values.country} />
                    {errors.country && touched.country && <span className={c.error}>{errors.country}</span>}
                </div>

            </div>

            <div className={c.rigth}>

                <div className={c.inp_con}>
                    <label className={c.label} htmlFor='name'>Your Birthday</label>
                    <input className={errors.birthday && touched.name ? c.inp_error : c.inp} id='birthday' name='birthday' placeholder='11/10/1995' onChange={handleChange} onBlur={handleBlur} value={values.birthday} />
                    {errors.birthday && touched.birthday && <span className={c.error}>{errors.birthday}</span>}
                </div>

                <div className={c.inp_con}>
                    <label className={c.label} htmlFor='sex'>Sex</label>
                    <input className={errors.sex && touched.sex ? c.inp_error : c.inp} id='sex' name='sex' placeholder='Female' onChange={handleChange} onBlur={handleBlur} value={values.sex} />
                    {errors.sex && touched.sex && <span className={c.error}>{errors.sex}</span>}
                </div>

                <div className={c.inp_con}>
                    <label className={c.label} htmlFor='number'>Phone Number</label>
                    <input className={errors.number && touched.number ? c.inp_error : c.inp} id='number' name='number' placeholder='1234567890 ' onChange={handleChange} onBlur={handleBlur} value={values.number} />
                    {errors.number && touched.number && <span className={c.error}>{errors.number}</span>}
                </div>

                <div className={c.inp_con}>
                    <label className={c.label} htmlFor='social'>Socials Link</label>
                    <input className={errors.social && touched.social ? c.inp_error : c.inp} id='social' name='social' placeholder='Facebook' onChange={handleChange} onBlur={handleBlur} value={values.social} />
                    {errors.social && touched.social && <span className={c.error}>{errors.social}</span>}
                </div>

            </div>

            {error && <div className='error'>{error}</div>}

            <div className={c.btn}>
                <Button disabled={isLoading} type='submit' title='Save' />
            </div>
        </form>
    </article>
}


export default PersonalForm