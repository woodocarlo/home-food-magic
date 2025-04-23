import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Carousel from './Carousel';

function Hero() {
  const taglines = ['Healthy', 'Delicious', 'Easy'];
  const [currentTagline, setCurrentTagline] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const type = () => {
      const currentWord = taglines[index];
      if (!isDeleting && charIndex < currentWord.length) {
        setCurrentTagline(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentTagline(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((index + 1) % taglines.length);
      }
    };

    const timer = setTimeout(type, isDeleting ? 100 : 150);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, index]);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={heroVariants}
      className="relative h-screen bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0">
        <Carousel />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Discover <span className="text-green-400">{currentTagline}</span> Recipes
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white drop-shadow-md max-w-3xl mx-auto">
          Explore a world of flavors with our curated collection of recipes that are easy to make and
          delicious to eat.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700"
        >
          Explore Recipes
        </motion.button>
      </div>
      <div className="absolute inset-0 bg-black opacity-40 z-0" />
    </motion.section>
  );
}

export default Hero;