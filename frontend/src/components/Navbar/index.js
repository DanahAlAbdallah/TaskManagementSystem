import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const handleScroll = () => {
    const sections = document.querySelectorAll('div[id^="section"]');
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100; // Adjust the offset as needed

      if (scrollPosition >= sectionTop) {
        setActiveSection(section.id);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="bg-primary py-4 px-20 fixed top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold mr-10">
          <img src='/logo.png' className='h-12' alt="Logo" />
        </Link>

        <ul className="flex space-x-8 md:space-x-36">
          <li>
            <Link
              to="/login"
              className={`text-white hover:text-gray-300 ${
                location.pathname === '/login' ? 'border-b-2 border-white pb-4' : ''
              }`}
            >
              Login
            </Link>
          </li>
          {location.pathname === '/' && ( // Conditionally render "About" and "Contact" links
            <>
              <li>
                <Link to='/about'>
                  <ScrollLink
                    to="about"
                    spy={true}
                    offset={-100}
                    smooth={true}
                    duration={500}
                    className={`text-white hover-text-gray-300 ${
                      activeSection === 'about' || location.pathname === '/about' ? 'border-b-2 border-white pb-4' : ''
                    }`}
                  >
                    About
                  </ScrollLink>
                </Link>
              </li>
              <li>
                <ScrollLink
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className={`text-white hover-text-gray-300 ${
                    activeSection === 'contact' || location.pathname === '/contact' ? 'border-b-2 border-white pb-4' : ''
                  }`}
                >
                  Contact
                </ScrollLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
