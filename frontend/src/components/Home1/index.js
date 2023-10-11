import React from 'react';
import Contact from '../Contact';

function Home1() {
  return (
    <>
      <hr className='bg-gray-500 h-1 ' />
      <div id ='about' className="flex flex-col md:flex-row items-center mt-5 mb-5 hy-120 px-2">
        <img
          src="/checklist.gif"
          className="max-w-xl p-2 mb-4 md:mb-0 md:mr-32 hidden md:block" /* Increased margin for more space */
          alt="Checklist"
        />

        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold text-primary mb-5">About</h1>
          <p className="mt-4 md:mt-0 text-gray-500 md:text-2xl "> {/* Increased margin-top and adjusted text size */}
          In the realm of project management, our task management solution simplifies the way teams plan, assign, and track tasks. With an easy-to-use interface and powerful features, our platform enhances coordination and productivity. Whether you're managing a small team or complex projects, we're here to help you stay organized, meet deadlines, and <span className='text-primary text-2xl'>Achieve</span> success.
          </p>
        </div>
      </div>
      <Contact/>
    </>
  );
}

export default Home1;
