import React, { ReactNode } from 'react'
import Header from '@components/Header/Header'
import localFont from 'next/font/local'
import '../src/styles/index.scss'
import Footer from '@components/Footer/Footer'
import AuthStoreInitializer from '@initializers/AuthStoreInitial'
import '@styles/index.scss'
import { cookies } from 'next/headers'
import connect from '@utils/mongoose'
import User from '../src/models/User'
import logger from '@utils/logger'
import { verifyToken } from '@utils/token'
import simpler from '@utils/simpler'
import MyProductsStoreInitializer from '@initializers/MyProductsStoreInitializer'
import Product from '@models/Product'
import Chat from '@models/Chat'
import ChatsStoreIzitializer from '@initializers/ChatsStoreIzitializer'


const fontSatoshi = localFont({ src: '../src/fonts/Satoshi-Variable.ttf' })


const RootLayout: React.FC<{ children: ReactNode }> = async ({ children }) => {

  const token = cookies().get('token')

  if (!token) return <html lang='en'>
    <head />
    <body style={fontSatoshi.style} className={fontSatoshi.className}>
      <AuthStoreInitializer userData={null} />
      <Header />
      {children}
      <Footer />
    </body>
  </html>

  try {
    const { email, _id } = verifyToken(token.value)

    await connect()
    const [user, products, chats] = await Promise.all([
      User.findOne({ email }),
      Product.find({ author: _id }),
      Chat.find({ users: { $in: _id } }).populate('users').exec()
    ])

    if (!user) return <html lang='en'>
      <head />
      <body style={fontSatoshi.style} className={fontSatoshi.className}>
        <AuthStoreInitializer userData={null} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>

    return <html lang='en'>
      <AuthStoreInitializer userData={simpler(user)}/>
      <ChatsStoreIzitializer chats={simpler(chats)} />
      <MyProductsStoreInitializer myProducts={simpler(products)} />
      <head />
      <body style={fontSatoshi.style} className={fontSatoshi.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  } catch (err) {
    logger(err)
    return <html lang='en'>
      <head />
      <body style={fontSatoshi.style} className={fontSatoshi.className}>
        <AuthStoreInitializer userData={null} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  }
}

export default RootLayout