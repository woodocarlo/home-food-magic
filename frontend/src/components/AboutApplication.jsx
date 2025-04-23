import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

function AboutApplication() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section ref={ref} className="py-16 bg-[url('https://images.unsplash.com/photo-1504674900247-087ca5f5d426?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={textVariants}
          className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-8"
        >
          About Our Application
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={textVariants}
          className="text-lg text-white drop-shadow-md max-w-3xl mx-auto"
        >
          Add your description about the application here. Tell your users what makes your app special, its features, and how it can help them with their cooking journey.
        </motion.p>
      </div>
    </section>
  );
}

export default AboutApplication;