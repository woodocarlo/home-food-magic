import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

function Carousel() {
  const media = [
    { type: 'image', src: 'https://via.placeholder.com/1920x1080?text=Recipe+1' },
    { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { type: 'image', src: 'https://via.placeholder.com/1920x1080?text=Recipe+3' },
    { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { type: 'image', src: 'https://via.placeholder.com/1920x1080?text=Recipe+5' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const slide = async () => {
      await controls.start({
        x: `-${currentIndex * 100}%`,
        transition: { duration: 0.8, ease: 'easeInOut' },
      });
    };

    slide();
  }, [currentIndex, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [media.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.div
        className="flex w-full h-full"
        animate={controls}
        style={{ display: 'flex', flexWrap: 'nowrap' }}
      >
        {media.map((item, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
          >
            {item.type === 'image' ? (
              <motion.img
                src={item.src}
                alt={`Recipe ${index + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <motion.video
                src={item.src}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        ))}
        <div className="w-full h-full flex-shrink-0">
          {media[0].type === 'image' ? (
            <motion.img
              src={media[0].src}
              alt="Recipe 1"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <motion.video
              src={media[0].src}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      </motion.div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {media.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-green-600' : 'bg-gray-400'} hover:bg-green-500 focus:outline-none`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;