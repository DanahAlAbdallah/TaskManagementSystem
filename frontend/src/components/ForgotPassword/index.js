import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [emailError, setEmailError] = useState('')
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setEmail(value);
      };  



    const handleSubmit = (e) => {
        e.preventDefault();

        if(email === ''){
            setEmailError('Enter your email')
        }else if(! isValidEmail(email)){
            setEmailError('Invalid Email')
        }else{
            setEmailError('')
            axios.post('http://localhost:3000/forgot-password',{email})
            .then(res => {
                if(res.data.Status === "Success") {
                    navigate('/login')
                   
                }
            }).catch(err => console.log(err))
            }
        



    }

    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
      };


  return (
    <section className="bg-light flex">
    <div className="w-1/2 hidden md:block">
      <img src="/Forgotpassword.gif" alt="Reset Password" className="w-full" />
    </div>
    <div className="flex flex-col items-center justify-center w-1/2 px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-500 md:text-2xl dark:text-white">
          Forgot Password
        </h2>
        <form className="space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              value={email}
              required=""
            />
          </div>
          <div className="text-red-600 text-sm">{emailError}</div>
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={handleSubmit}
          >
            Send Verification Email
          </button>
        </form>
      </div>
    </div>
  </section>
  


  )
}

export default ForgotPassword