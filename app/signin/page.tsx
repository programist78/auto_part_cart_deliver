'use client'
import React, { useState } from 'react'
import c from './Login.module.scss'
import { useFormik } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'
import { signIn } from 'next-auth/react'
import Button from '@components/Button/Button'
import useAuthStore from '@stores/useAuthStore'
import Cookies from 'cookies-js'
import axios from 'axios'


const Login: React.FC = () => {

    const [error, setError] = useState<null | string>(null)
    const setUserData = useAuthStore((state) => state.setUserData)
    const [rememberMe, setRemeberMe] = useState(false)

    const { handleBlur, handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            emailOrPhore: '',
            password: ''
        },
        onSubmit: async ({ emailOrPhore, password }) => {
            axios.post('/api/auth/login', {
                email:emailOrPhore,
                password: password
            }).then(({ data }) => {
                if (error) return setError(error)
                setUserData(data.user)
                Cookies.set('token', data.token, { expires: 60 * 60 * 24 * 14 })
            }).catch((error) => {
                if (error) return setError(`${error}`)
                setError('Something went wrong!')
            })
        },
        validationSchema: Yup.object({
            emailOrPhore: Yup.string().required('Required'),
            password: Yup.string().required('Required')
        })
    })

    return <div className={c.main}>
        <form className={c.form} onSubmit={handleSubmit}>
            <h1 className={c.title}>Sign In</h1>
            <div className={c.inp_con}>
                <label className={errors.emailOrPhore ? c.error : c.label} htmlFor='emailOrPhore'>{errors.emailOrPhore ? errors.emailOrPhore : 'Email or Phone Number'}</label>
                <input id='emailOrPhore' name='emailOrPhore' placeholder='Email or Phone Number' onChange={handleChange} onBlur={handleBlur} value={values.emailOrPhore} />
            </div>
            <div className={c.inp_con}>
                <label className={errors.password ? c.error : c.label} htmlFor='password'>{errors.password ? errors.password : 'Password'}</label>
                <input id='password' name='password' type='password' placeholder='Password' onChange={handleChange} onBlur={handleBlur} value={values.password} />
            </div>
            <div className={c.remember}>
                <input id='remember' name='remember' type='checkbox' onChange={(e) => {
                    setRemeberMe(e.target.checked)
                }} />
                <label htmlFor='remember'>Remember Me</label>
            </div>
            {error && <div className="error">
                {error}
            </div>}
            <div className={c.btn}>
                <Button type='submit' title='Log In' />
            </div>
            <div className={c.with}>
                <h3>Sign in with:</h3>
                <div className={c.icons}>
                    <svg onClick={() => signIn('facebook', {
                        redirect: false
                    })} xmlns="http://www.w3.org/2000/svg" width="37" height="35" viewBox="0 0 37 35" fill="none">
                        <g clipPath="url(#clip0_3_28)">
                            <rect width="36.0938" height="35" rx="17.5" fill="#1877F2" />
                            <path d="M14.826 35H20.3937V23.0234H25.0493L25.7524 18.3641H20.3937V15.3781C20.3937 14.0328 20.8307 13.1141 23.073 13.1141H25.9424V8.93047C25.4483 8.88125 23.7571 8.75 21.7809 8.75C17.6383 8.75 14.826 10.932 14.826 14.9188V18.3641H10.1514V23.0234H14.826V35Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_3_28">
                                <rect width="36.0938" height="35" rx="17.5" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div onClick={async () => {
                        signIn('google', {
                            redirect: false
                        })
                    }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
                            <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00" />
                            <path d="M12 22.0001C14.583 22.0001 16.93 21.0116 18.7045 19.4041L15.6095 16.7851C14.5718 17.5743 13.3038 18.0011 12 18.0001C9.39903 18.0001 7.19053 16.3416 6.35853 14.0271L3.09753 16.5396C4.75253 19.7781 8.11353 22.0001 12 22.0001Z" fill="#4CAF50" />
                            <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
                        </svg>
                    </div>
                    <div onClick={() => signIn('apple', {
                        redirect: false
                    })} className={c.apple}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21.6641 16.8068C21.3874 17.4521 21.0454 18.0674 20.6436 18.6431C20.1068 19.4099 19.666 19.9397 19.3282 20.2346C18.8034 20.7164 18.2396 20.9643 17.6369 20.9783C17.2051 20.9783 16.6833 20.8554 16.0756 20.6055C15.4659 20.3565 14.9061 20.2346 14.3933 20.2346C13.8566 20.2346 13.2808 20.3565 12.6641 20.6055C12.0484 20.8554 11.5506 20.9863 11.1697 20.9983C10.593 21.0233 10.0162 20.7694 9.44149 20.2346C9.07465 19.9147 8.61586 19.3649 8.0651 18.5872C7.47535 17.7585 6.99057 16.7938 6.61073 15.6972C6.20391 14.5106 6 13.363 6 12.2514C6 10.9788 6.27488 9.88023 6.82564 8.96055C7.2422 8.23827 7.83774 7.63545 8.55488 7.21017C9.26204 6.78599 10.0693 6.55759 10.8939 6.5484C11.3537 6.5484 11.9564 6.69035 12.7031 6.97025C13.4497 7.25015 13.9295 7.3921 14.1384 7.3921C14.2964 7.3921 14.8271 7.22516 15.7307 6.89428C16.5834 6.58739 17.3031 6.46043 17.8928 6.51041C19.4921 6.63937 20.6926 7.26915 21.4912 8.40475C20.0618 9.27144 19.3552 10.484 19.3692 12.0405C19.3811 13.253 19.822 14.2617 20.6856 15.0624C21.0674 15.4278 21.5129 15.7202 22 15.9251C21.894 16.232 21.7821 16.5249 21.6641 16.8068ZM17.9987 2.38087C17.9987 3.33053 17.6509 4.21822 16.9602 5.03893C16.1246 6.01459 15.115 6.57939 14.0205 6.49042C14.0062 6.371 13.9992 6.25082 13.9995 6.13055C13.9995 5.21787 14.3953 4.24221 15.102 3.44349C15.4539 3.03963 15.9017 2.70275 16.4444 2.43485C16.9862 2.17094 17.498 2.02499 17.9798 2C17.9928 2.12796 17.9987 2.25491 17.9987 2.38087Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className={c.new}>
                <Link href={'/signup'}>Create New Account</Link>
            </div>
        </form>
    </div>
}

export default Login