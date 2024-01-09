import React from 'react'
import c from './Privacy.module.scss'
import classNames from 'classnames'
import { Metadata } from 'next'
import Title from '@components/Title/Title'


export const metadata: Metadata = {
    title: 'Privacy Policy'
}


const Privacy: React.FC = (props) => {
    return <main className={classNames(c.main, 'container')}>
        <Title text='Privacy Policy' spaceTop />
        <text className={c.text}>
            This Privacy Policy outlines how we collect, use, store, and protect your personal information when you visit and make use of our online store. We are committed to maintaining the privacy and security of your information and comply with applicable data protection laws. By using our online store, you consent to the practices described in this policy.<br/><br/>

            <b>Information Collection</b>
            When you visit our online store, we may collect personal information such as your name, email address, shipping address, and payment details. This information is necessary to process your orders and provide you with a seamless shopping experience. 1.2 Usage Data: We may also collect non-personally identifiable information about your interactions with our website, such as your IP address, browser type, device information, and browsing patterns. This information helps us analyze and improve our website's performance and user experience.<br/><br/>

            <b>Information Use</b>
            We use the personal information you provide to process and fulfill your orders, communicate with you regarding your purchases, and provide customer support. 2.2 Marketing Communications: With your consent, we may send you promotional emails or newsletters about our products, offers, and updates. You can opt-out of receiving these communications at any time. 2.3 Improvements and Analytics: We may use the usage data collected to analyze trends, monitor the effectiveness of our website, and make improvements to enhance your overall experience.<br/><br/>

            <b>Information Sharing</b>
            We may share your personal information with trusted third-party service providers who assist us in operating our online store, such as payment processors, shipping carriers, and IT service providers. These entities are obligated to handle your information securely and in accordance with applicable privacy laws. 3.2 Legal Requirements: We may disclose your personal information if required by law, regulation, legal process, or government request.<br/><br/>

            <b>Data Security</b>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.<br/><br/>

            <b>Cookies and Tracking Technologies</b>
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can modify your browser settings to refuse cookies, but this may limit certain functionalities of our online store.<br/><br/>

            <b>Children's Privacy</b>
            Our online store is not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If you believe that we have unintentionally collected information from a child, please contact us immediately.<br/><br/>


            <Title text='Terms and Conditions' spaceTop />
            Please note that the following terms and conditions govern your use of our online store. By accessing or using our website, you agree to comply with these terms and conditions.<br/><br/>

            <b>Intellectual Property</b>
            All content on our online store, including but not limited to text, graphics, logos, images, product descriptions, and website design, is the intellectual property of our company and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.<br/><br/>

            <b>Product Information</b>
            We make every effort to provide accurate and up-to-date information regarding our products. However, we do not warrant or guarantee the accuracy, completeness, or reliability of any product descriptions, images, or specifications on our website.<br/><br/>

            <b>Pricing and Payment</b>
            The prices displayed on our online store are in the applicable currency and are subject to change without notice. We strive to<br/><br/>
        </text>
    </main>
}

export default Privacy
