import React from "react";
import { FaFacebook, FaYoutube } from 'react-icons/fa';
function Footer() {
  return (
    <>
      <div className="bg-primary h-1/4 w-full flex md:flex-row flex-col justify-around items-start p-10">
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-4xl pb-4 mt-4">
              <img src='/logo.png'/>
            </p>
          </ul>
        </div>

        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-xl pb-2">Contact Us</p>
            <li className="text-white text-md pb-2 font-semibold hover: cursor-pointer">
              <a href="mailto:taskmanagement@gmail.com">taskmanagement@gmail.com</a>
            </li>
          </ul>
        </div>

        <div className="p-5">
  <p className="text-white font-bold text-xl pb-2">Keep in touch</p>
  <ul className="flex items-center pr-2 ml-5 ">
    <a href="https://www.facebook.com/your-facebook-page" className="mr-4 text-white">
      <FaFacebook size={20} />
    </a>
    <a href="https://www.youtube.com/your-youtube-channel" className="mr-4 text-white">
      <FaYoutube size={20} />
    </a>
    <a href="https://www.facebook.com/your-facebook-page" className="mr-4 text-white">
      <FaFacebook size={20} />
    </a>
  </ul>
</div>

      </div>
      <div className="flex flex-col justify-center items-center text-center p-2 bg-primary">
        <h1 className="text-white font-semibold">
          © 2023-2024 All rights reserved 
        </h1>
      </div>
    </>
  );
}

export default Footer;
