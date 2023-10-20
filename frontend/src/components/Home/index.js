import React from 'react';
import { useState, useEffect } from 'react';
import Home1 from '../Home1';

function Home() {
  const texts = ['Success', 'Productivity', 'Planning','Peace of mind']; 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(texts[0]);

  const updateText = () => {
    const nextIndex = (currentIndex + 1) % texts.length;
    setCurrentIndex(nextIndex);
    setCurrentText(texts[nextIndex]);
  };
  
  useEffect(() => {
    
    const timer = setInterval(updateText, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
    <div id='home' className=" flex flex-col mt-10 md:flex-row items-center justify-center pt-5 bg-white ml-10 mb-20">
      <div className=" text-5xl ml-20 mt-20 w-full  md:w-1/2 md:pr-5" >
        <div className="semicircle">
        <p className="text-2xl md:text-4xl lg:text-5xl text-gray-500 ml-5 font-semibold mb-4 md:mb-6">
           The key to <span style={{ color: '#818cf8' }}>{currentText}..</span>
        </p>
        <a href='signup'>
          <button className="ml-20 md:ml-5 bg-primary rounded text-white font-bold py-2 px-4 text-xl md:text-3xl lg:text-2xl mt-2">
            Sign up
          </button>
        </a>



        </div>
      </div>
      <div className="w-full md:w-1/2 mt-5 md:mt-0">
        <img
          src="/Accept.gif"
          alt="Accept Tasks"
          className="w-full md:w-1/3 lg:w-3/4 rounded "
        />
      </div>
    </div>
    <Home1/>
    </>
  );
}

export default Home;
