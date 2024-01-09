import React from 'react'
import classNames from 'classnames'
import c from './About.module.scss'
import Image from 'next/image'
import { Metadata } from 'next'
import Title from '@components/Title/Title'


export const metadata: Metadata = {
    title: 'About'
}


const About: React.FC = () => {
    return <main className={classNames(c.main, 'container')}>
        <Title text='About Us' spaceTop />
        <article className={c.text_container}>
            <text className={c.text}>
                Welcome to our online store Auto Part Cart, where shopping meets convenience and style! We are thrilled to present to you a curated collection of products that will enhance your everyday life and bring a touch of elegance to your world!<br/><br/>

                At our magazine we believe that shopping should be an enjoyable and hassle-free experience. With just a few clicks, you can explore a wide range of high-quality products that have been carefully handpicked to cater to your unique tastes and needs.<br/><br/>

                Discover our extensive selection of fashion-forward clothing, where you'll find trendy and timeless pieces that effortlessly elevate your wardrobe. From chic dresses and tailored suits to comfortable loungewear and accessories that add the perfect finishing touch, we have something to suit every occasion and personal style.<br/><br/>

                Indulge in our selection of beauty and grooming essentials, designed to enhance your natural radiance and help you feel confident and refreshed. From luxurious skincare products to premium makeup and fragrances, we offer a comprehensive range that will pamper and rejuvenate you.
                Explore our home and decor section, where you'll find exquisite pieces that transform your living space into a haven of comfort and sophistication. Whether you're looking for elegant furniture, stylish lighting solutions, or unique accents that reflect your personality, we have just what you need to create a sanctuary you'll love coming home to.<br/><br/>

                We understand the importance of convenience in today's fast-paced world, which is why we strive to provide exceptional customer service and a seamless shopping experience. Our user-friendly website is designed to make browsing and purchasing a breeze, and our dedicated support team is always ready to assist you with any questions or concerns you may have.<br/><br/>

                At Auto Part Cart, we value your trust and satisfaction above all else. We source our products from reputable and ethical suppliers, ensuring that each item meets our stringent quality standards. Your happiness is our priority, and we are committed to exceeding your expectations every step of the way.<br/><br/>

                Thank you for choosing [Store Name]. Get ready to embark on a delightful shopping journey filled with style, elegance, and convenience. Start exploring our exquisite collection today and elevate your lifestyle with every purchase.
            </text>
            <Image className={c.img} src='/assets/woman.jpg' alt='Woman with tablet' width={825} height={551} />
        </article>
    </main>
}

export default About
