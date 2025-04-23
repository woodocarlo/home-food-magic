import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const toggleMoreDropdown = () => {
    setIsMoreOpen(!isMoreOpen);
  };

  return (
    <nav className="bg-white shadow-lg py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left: Logo and Cookr */}
        <div className="flex items-center space-x-3">
          <img
            src="https://via.placeholder.com/40x40?text=Logo"
            alt="Cookr Logo"
            className="h-10 w-10"
          />
          <ScrollLink
            to="hero"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <motion.h1
              whileHover="hover"
              variants={linkVariants}
              className="text-2xl font-bold text-green-600"
            >
              Cookr
            </motion.h1>
          </ScrollLink>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <ScrollLink
              to="about-app-details"
              smooth={true}
              duration={500}
              className="cursor-pointer"
            >
              <motion.span
                whileHover="hover"
                variants={linkVariants}
                className="text-gray-700 hover:text-green-600 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
              </motion.span>
            </ScrollLink>
            <ScrollLink
              to="signup-contact"
              smooth={true}
              duration={500}
              className="cursor-pointer"
            >
              <motion.span
                whileHover="hover"
                variants={linkVariants}
                className="text-gray-700 hover:text-green-600 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
              </motion.span>
            </ScrollLink>
            <ScrollLink
              to="signup-contact"
              smooth={true}
              duration={500}
              className="cursor-pointer"
            >
              <motion.span
                whileHover="hover"
                variants={linkVariants}
                className="text-gray-700 hover:text-green-600 relative group"
              >
                Signup
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
              </motion.span>
            </ScrollLink>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              Login
            </motion.button>
          </div>

          {/* Mobile: More Dropdown */}
          <div className="md:hidden">
            <button onClick={toggleMoreDropdown} className="flex items-center space-x-2">
              {isMoreOpen ? <X size={24} /> : <Menu size={24} />}
              <span className="text-gray-700">More</span>
            </button>
            {isMoreOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-4 mt-2 bg-white shadow-lg rounded-lg py-2 w-48"
              >
                <ScrollLink
                  to="about-app-details"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                  onClick={toggleMoreDropdown}
                >
                  About
                </ScrollLink>
                <ScrollLink
                  to="signup-contact"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                  onClick={toggleMoreDropdown}
                >
                  Contact
                </ScrollLink>
                <ScrollLink
                  to="signup-contact"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                  onClick={toggleMoreDropdown}
                >
                  Signup
                </ScrollLink>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-100"
                  onClick={toggleMoreDropdown}
                >
                  Login
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;