import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Footer from './Footer';
import NavBarHome from './NavBarHome';
import '../stylesheets/Contact.css'; 
import { 
    SERVICE_ID, 
    TEMPLATE_ID, 
    USER_ID
} from '../config/constants'; 

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // ===== Move these into config file =====
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID) 
            .then((result) => {
                console.log(result.text);
                setSubmitted(true);
            }, (error) => {
                console.log(error.text);
            });
    };

    if (submitted) {
        return <div className="form-container"><p>Thank you for reaching out. You can expect a response in 48-72 business hours.</p></div>;
    }

    return (
        <div className='contact-wrapper'>
            <NavBarHome />
            <div className="form-container">
                <h1>Let's Chat</h1>
                <p className="form-description">You've got some Q's and we've got tons of A's. Ask us about our product, partnerships, what you should name your puppy... anything we can help with! Don't be shy - we promise we don't bite.</p>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" required />
                    <label>Email:</label>
                    <input type="email" name="email" required />
                    <label>Company:</label>
                    <input type="text" name="company" required />
                    <label>Message:</label>
                    <textarea name="message" required></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
