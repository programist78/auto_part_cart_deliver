import c from './Instructions.module.scss'
import Image from 'next/image'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Instructions'
}

const Instructions: React.FC = () => {
    return <div className='container'><section className={c.main}>
        <h1 className={c.title}>Instructions</h1>
        <div className={c.block1}>
            <p>Here are instructions for using the Auto Part Cart website, tailored for both buyers and sellers!</p>
            <h2>Instructions for Buyers:</h2>
            <p><b>Landing Page:</b> When you visit the Auto Part Cart website, you will be greeted with the landing page. Take a moment to explore any featured products, promotions, or important announcements displayed on the page.</p>
            <p><b>Registration/Login:</b> To start browsing and making purchases, you need to create an account or log in if you already have one. Look for the "Register" or "Login" button on the top-right corner of the page. Fill in the required information to create your account or enter your credentials to log in.</p>
            <p><b>Product Search:</b> Once you're logged in, you can search for the products you are interested in. Use the search bar at the top of the page to enter keywords, such as the specific auto parts you need. You can also browse through categories or use filters to narrow down your search.</p>
            <p><b>Product Listings:</b> When you find a product you're interested in, click on it to view the detailed product listing. Here, you will find information about the product, including its specifications, price, availability, and any relevant reviews or ratings.</p>
            <p><b>Add to Cart and Checkout:</b> If you decide to purchase a product, click on the "Add to Cart" button. You can continue shopping and add more items to your cart, or proceed to checkout if you're ready to finalize your purchase. Follow the prompts to provide your shipping address, select a payment method, and complete the transaction.</p>
            <Image className={c.girl} src='/assets/girl.png' alt='girl.png' width={278} height={447} />
        </div>
        <div className={c.block2}>
            <h2>Instructions for Sellers:</h2>
            <p><b>Seller Registration:</b> If you want to sell your products on Auto Part Cart, you need to register as a seller. Look for the "Seller Registration" or "Sell with Us" option, usually available in the website's footer or seller-related sections. Provide the required information, such as your contact details and business information, to complete the registration process.</p>
            <p><b>Product Listing:</b> After registering as a seller and logging into your account, you can start listing your products for sale. Look for the "Sell" or "List a Product" option in your seller dashboard. Fill in the details of the product, including its title, description, price, available quantity, and any other relevant information.</p>
            <p><b>Product Management:</b> Once your products are listed, you can manage them through your seller dashboard. You can update the product details, adjust prices, manage inventory, and handle customer inquiries or feedback.</p>
            <p><b>Order Processing:</b> When a buyer places an order for your product, you will receive a notification. It's important to promptly process and fulfill the order by packaging the product securely and preparing it for shipment. Update the order status in your seller dashboard as you progress through the fulfillment process.</p>
            <p><b>Customer Communication:</b> As a seller, it is essential to maintain good communication with your customers. Respond promptly to their inquiries, provide updates on order status, and address any concerns or issues they may have.</p>
            <Image className={c.man} src='/assets/man.png' alt='man.png' width={278} height={447} />
        </div>
    </section></div>
}

export default Instructions