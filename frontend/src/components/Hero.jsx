import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Carousel from './Carousel';

function Hero() {
  const taglines = ['Healthy', 'Delicious', 'Home'];
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
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl [-webkit-text-stroke:1px_rgba(0,0,0,0.5)]">
          Discover <span className="text-green-400 [-webkit-text-stroke:0]">{currentTagline}</span> Food
        </h1>
      </div>
    </motion.section>
  );
}

export default Hero;