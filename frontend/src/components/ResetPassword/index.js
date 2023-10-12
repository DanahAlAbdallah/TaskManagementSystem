import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


function ResetPassword() {
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const navigate = useNavigate()
    const {id, token} = useParams()

    const handleChange = (e) => {
        e.preventDefault();
        console.log("handling changes")
        const { value } = e.target;
        setPassword(value);
      };  


    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === ''){
            setPasswordError("Enter new password")
        }else if(!validatePassword(password)){
            setPasswordError('Password must have at least one capital letter, one digit, and be at least 8 characters long')
        }else{
            setPasswordError('');
        
console.log("in front reset")
        axios.post(`http://localhost:3000/reset-password/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                console.log("here")
                navigate('/login')
               
            }
        }).catch(err => console.log(err))}
    }

    const validatePassword = (password) => {
        // Regular expression to check if the password meets the criteria
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      
        return passwordRegex.test(password);
      };

    return(
        <section className="bg-light flex">
        <div className="w-1/2 hidden md:block">
          <img src="/Resetpassword.gif" alt="Reset Password" className="w-full" />
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-500 md:text-2xl dark:text-white">
              Reset Password
            </h2>
            <form className="space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                  Enter new password
                </label>
                <input
                  type="password"
                  value={password}
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  placeholder="******"
                  required=""
                />
              </div>
              <div className="text-red-600 text-sm">{passwordError}</div>
              <button
                type="submit"
                className="w-full text-white bg-primary hover-bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      
      
    )
}

export default ResetPassword;