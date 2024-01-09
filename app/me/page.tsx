'use client'
import Title from '@components/Title/Title'
import useAuthStore from '@stores/useAuthStore'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, FC } from 'react'
import c from './Seller.module.scss'
import SideBar from '@components/SideBar/SideBar'
import PersonalForm from '@components/PersonalForm/PersonalForm'
import AddYourProduct from '@components/AddYourProduct/AddYourProduct'
import MyOrders from '@components/MyOrders/MyOrders'
import Messages from '@components/Messages/Messages'
import HelpFrom from '@components/HelpForm/HelpFrom'
import ProductTracking from '@components/ProductTracking/ProductTracking'
import useMyProductStore from '@stores/useMyProductStore'


const page: FC = () => {
    const userData = useAuthStore((state) => state.userData)
    const isLogined = useAuthStore((state) => state.isLogined)
    const router = useRouter()
    const products = useMyProductStore((state) => state.products)

    useLayoutEffect(() => {
        if(!isLogined) router.replace('/')
    })

    if(!isLogined) {
        return null
    }

    switch(userData.role) {
        case 'USER': {
            return <div className="container">
            <div className={c.main}>
              <SideBar />
              <main className={c.profile}>
                <Title text='Personal Information' id='personal' />
                <PersonalForm />
                <Title text='My Orders' id='orders' spaceTop />
                <MyOrders />
                <Title text='Product Tracking' spaceTop id='tracking' />
                <ProductTracking />
                <Title text='Messages' spaceTop bigSpace id='messages' />
                {/* <Messages chats={chats.getChats} userId={userData.id} /> */}
                <Title text='Help' spaceTop bigSpace id='help' />
                <HelpFrom />
              </main>
            </div>
          </div>
        }
        case 'BUSINESS': {
        return <div className="container">
            <div className={c.main}>
                <SideBar isSellerMode />
                <main className={c.profile}>
                    <Title id='personal' text='Personal Information' />
                    <PersonalForm withFile />
                    <Title id='add_product' text='Add your product' spaceTop />
                    <AddYourProduct />
                    {products.length > 0 && <>
                        <Title text='My Products' id='products' spaceTop />
                        <MyOrders />
                    </>}
                    <Title id='messages' text='Messages' spaceTop />
                    <Messages />
                    <Title id='help' text='Help' spaceTop bigSpace />
                    <HelpFrom />
                </main>
            </div>
        </div>
        }
        case 'ADMIN': {

        }
        case 'SUBADMIN': {

        }
    }
}

export default page
