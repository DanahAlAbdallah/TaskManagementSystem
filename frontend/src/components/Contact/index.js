import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subject, setSubject] = useState('');
  const [subjectError, setsubjectError] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(email ===''){
      setEmailError('Enter your email')
    }else if(!isValidEmail(email)){
      setEmailError('Invalid email')
    }else if(subject ===''){
      setsubjectError('Subject Required')
      setEmailError('')
    }else if(message ===''){
      setMessageError('Message Required')
      setsubjectError('')
    }else{
      setEmailError('')
      setsubjectError('')
      setMessageError('')
    
    try {
      const response = await axios.post('http://localhost:3000/message/contactus', {email,subject,message});

      toast.success('Message sent successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      setEmail('')
      setSubject('')
      setMessage('')
    } catch (error) {
      toast.error('Message sending failed. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Error sending message:', error);
    }}
  };

  
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    return emailPattern.test(email);
  };

  return (
    <section id="contact" className="bg-white dark:bg-gray-900 mt-12">
      <hr className="bg-gray-500 h-1" />
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-primary dark:text-white">
          Contact Us
        </h2>
        <form className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@example.com"
              required
            />
            <div className="text-red-600 text-sm">{emailError}</div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={handleSubjectChange}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
            />
             <div className="text-red-600 text-sm">{subjectError}</div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={message}
              onChange={handleMessageChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
            ></textarea>
            <div className="text-red-600 text-sm">{messageError}</div>
          </div>
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary sm:w-fit hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
