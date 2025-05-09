import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

function Modal({ isOpen, onClose, title, children, backgroundImage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-8 w-full max-w-4xl relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30 z-0" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative z-10 flex">
          <div className="w-4/5 pr-4">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-6">{title}</h2>
            {children}
          </div>
          <div className="w-1/5" />
        </div>
      </motion.div>
    </div>
  );
}

function SignupContact() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [isGetHomeModalOpen, setIsGetHomeModalOpen] = useState(false);
  const [isBecomeMomModalOpen, setIsBecomeMomModalOpen] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    question: '',
    password: '',
    confirmPassword: ''
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check if passwords match when either field changes
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password') {
        setPasswordsMatch(value === formData.confirmPassword);
      } else {
        setPasswordsMatch(value === formData.password);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      alert('Passwords do not match!');
      return;
    }
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section
      id="signup-contact"
      ref={ref}
      className="py-16 bg-[url('https://i.postimg.cc/LXT55Xkd/Green-Yellow-Modern-Food-Restaurant-Presentation-7.jpg')] bg-cover bg-center bg-no-repeat relative"
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Left: Buttons and Images */}
        <div className="w-1/2 pr-8">
          <div className="flex space-x-6 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700"
              onClick={() => setIsGetHomeModalOpen(true)}
            >
              Get a Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700"
              onClick={() => setIsBecomeMomModalOpen(true)}
            >
              Become a Mom
            </motion.button>
          </div>
          <div className="flex space-x-4">
            <img
              src="https://i.postimg.cc/W3GR7BZv/Red-Yellow-Modern-Food-Journal-Presentation.png"
              alt="Home Image"
              className="w-40 h-30 object-cover rounded-lg shadow-md"
            />
            <img
              src="https://i.postimg.cc/wB7tGVxM/Red-Yellow-Modern-Food-Journal-Presentation-1.png"
              alt="Mom Image"
              className="w-40 h-30 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right: Text and Form */}
        <div className="w-1/2 pl-8">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              From our kitchen to yours, with love.
            </h2>
            <p className="text-lg text-white drop-shadow-md mb-6">
              Ask Us Anything You Need Answers For...
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Let us know your name *"
                className="w-full p-3 bg-green-100 rounded-lg border-none focus:outline-none"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Leave your mail ID *"
                className="w-full p-3 bg-green-100 rounded-lg border-none focus:outline-none"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Leave your phone number here *"
                className="w-full p-3 bg-green-100 rounded-lg border-none focus:outline-none"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Create a password *"
                className="w-full p-3 bg-green-100 rounded-lg border-none focus:outline-none"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password *"
                className={`w-full p-3 bg-green-100 rounded-lg border-none focus:outline-none ${
                  !passwordsMatch && formData.confirmPassword ? 'border-red-500' : ''
                }`}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {!passwordsMatch && formData.confirmPassword && (
                <p className="text-red-500 text-sm">Passwords do not match!</p>
              )}
              <input
                type="text"
                name="location"
                placeholder="Where do you live? *"
                className="w-full p-3 bg-green-100 rounded-lg border-none focus:outline-none"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="question"
                placeholder="Ask us anything... *"
                className="w-full p-3 bg-green-100 rounded-lg border-none focus:outline-none"
                value={formData.question}
                onChange={handleInputChange}
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 flex items-center justify-center"
              >
                Get Answers <span className="ml-2">➔</span>
              </motion.button>
            </form>
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={textVariants}
              className="mt-4 bg-green-600 text-white p-3 rounded-lg inline-flex items-center shadow-md"
            >
              <span className="mr-2">📧</span> Mail us
              <span className="ml-2 text-sm">Support@hfm.in</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Get a Home Modal */}
      <Modal
        isOpen={isGetHomeModalOpen}
        onClose={() => setIsGetHomeModalOpen(false)}
        title="Sign Up for Get a Home"
        backgroundImage="https://i.postimg.cc/mgCbhkRd/Green-Yellow-Modern-Food-Restaurant-Presentation-8.jpg"
      >
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your Email *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Create Password *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Preferred Location *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-3/4 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700"
            type="submit"
          >
            Submit
          </motion.button>
        </form>
      </Modal>

      {/* Become a Mom Modal */}
      <Modal
        isOpen={isBecomeMomModalOpen}
        onClose={() => setIsBecomeMomModalOpen(false)}
        title="Sign Up to Become a Mom"
        backgroundImage="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1920&auto=format&fit=crop"
      >
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your Email *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Create Password *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Your Cooking Specialty *"
            className="w-3/4 p-3 bg-green-100/75 rounded-lg border-none focus:outline-none"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-3/4 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700"
            type="submit"
          >
            Submit
          </motion.button>
        </form>
      </Modal>
    </section>
  );
}

export default SignupContact;