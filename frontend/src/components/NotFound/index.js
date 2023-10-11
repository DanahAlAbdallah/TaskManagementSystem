import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src='/notfound.gif' className="mb-5" alt="Not Found Image"/>
      <Link to='/'>
      <button className="bg-primary hover:bg-gray-400 text-white font-bold py-2 px-4 rounded sm:mb-5">
        Back to Home
      </button>
      </Link>
    </div>
  )
}

export default NotFound;
