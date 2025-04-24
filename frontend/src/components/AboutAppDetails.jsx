import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

function AboutAppDetails() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="about-app-details" ref={ref} className="min-h-screen pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-1/2 flex flex-col justify-end">
          <img
            src="src\components\public\assests\about_application.png"
            alt="Application Visual"
            className="w-4/5 h-auto object-cover"
          />
        </div>
        <div className="w-1/2 pl-8 flex flex-col justify-center">
          <motion.h2
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            About Our App
          </motion.h2>
          <motion.p
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-lg text-gray-600"
          >
            Discover a seamless cooking experience with our application, designed to help you explore
            recipes, plan meals, and connect with a community of home chefs. Whether you're a beginner
            or an expert, we’ve got you covered! Our app offers personalized recommendations, step-by-step
            cooking guides, and a vibrant community forum to share your culinary creations and tips.
            Dive into a world of flavors and make cooking enjoyable and effortless every day.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default AboutAppDetails;