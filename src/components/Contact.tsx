import React, { useState, forwardRef } from 'react';
import emailjs from 'emailjs-com';
import { SERVICE_ID, TEMPLATE_ID, USER_ID } from '../config/constants';

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
            .then((result) => {
                console.log(result.text);
                setSubmitted(true);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div ref={ref} className='contact-wrapper min-h-screen bg-inverse-gradient-2 flex flex-col items-center py-20'>
            <h2 className='text-xl font-bold mb-4' style={{ color: '#ff5467' }}>Contact</h2>
            <div className="container w-full max-w-4xl p-6 bg-gray-100 shadow-lg border-2 border-purple-800 rounded-3xl" style={{ minHeight: '550px' }}>
                {submitted ? (
                    <div className="response-container text-center">
                        <p className="text-xl font-semibold">Thank you for reaching out. You can expect a response in 48-72 business hours.</p>
                    </div>
                ) : (
                    <div className="form-container flex flex-col">
                        <h1 className="text-6xl font-bold mb-4 text-center" style={{ color: '#312e81' }}>Let's Chat</h1>
                        <p className="form-description mb-6 text-gray-600 text-center">You've got some Q's and we've got tons of A's. Ask us about our product, partnerships, what you should name your puppy... anything we can help with! Don't be shy - we promise we don't bite.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label className="block font-medium">Name:</label>
                            <input type="text" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"/>
                            <label className="block font-medium">Email:</label>
                            <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"/>
                            <label className="block font-medium">Company:</label>
                            <input type="text" name="company" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"/>
                            <label className="block font-medium">Message:</label>
                            <textarea name="message" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"></textarea>
                            <button type="submit" className="mx-auto block text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-8 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300">Send</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
});

export default Contact;
