import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

  function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      Email: '',
      password: ''
    });
    
    const handleChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };  
    console.log(formData);
const handleLogin = (c) => {
  // Send a POST request to your backend API with the form data
  axios.post("http://localhost:3000/login", formData)
    .then((response) => {
      const token = response.data.accessToken;
      localStorage.setItem('token', token);
      
      console.log("Login successful:", response.data);
      const isAdmin = response.data.role;
      localStorage.setItem('role', isAdmin);
      if(isAdmin){
        navigate('/Admin/Dashboard');
      }else{
        navigate('/userHome');
      }

    })
    .catch((error) => {
      // Handle errors here
      console.error("Login failed:", error);
    });
};

  return (
<section className="bg-gray-50  ">
  <div className="flex flex-col items-center mt-20 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-500 md:text-2xl ">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="Email" value={formData.Email} onChange={handleChange} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-center justify-between">

                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleLogin}>Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
  };
export default Login;