import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

function Testimonials() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5, ease: 'easeIn' } },
  };

  const testimonials = [
    {
      text: "Very healthy diet friendly food cooked with utmost care, highly appreciate the service as it is a great food for ailing elders who cannot prepare themselves. Thank you!",
      name: "Usha Kumar",
      location: "Coimbatore (Edayarpalayam)",
    },
    {
      text: "The recipes are so easy to follow, and the meals are delicious! Perfect for busy days.",
      name: "Priya Sharma",
      location: "Bangalore",
    },
    {
      text: "I love the variety of dishes. It’s like having a personal chef at home!",
      name: "Arjun Menon",
      location: "Chennai",
    },
    {
      text: "Healthy eating has never been this tasty. Highly recommend Cookr!",
      name: "Sneha Reddy",
      location: "Hyderabad",
    },
    {
      text: "The best meal service for seniors. My parents love it!",
      name: "Rahul Nair",
      location: "Kochi",
    },
    {
      text: "Amazing flavors and great presentation. I’m hooked!",
      name: "Ananya Bose",
      location: "Kolkata",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [inView, testimonials.length]);

  return (
    <section ref={ref} className="py-16 bg-[url('https://i.postimg.cc/pLvQQ62j/Green-Yellow-Modern-Food-Restaurant-Presentation.jpg')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-black opacity-0 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={headingVariants}
          className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-12 text-left"
        >
          What Our Users Say
        </motion.h2>
        <div className="relative h-60">
          {testimonials.map((testimonial, index) => (
            index === currentIndex && (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={testimonialVariants}
                className="absolute max-w-md bg-green-600 text-white p-6 rounded-lg shadow-lg"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-green-600 border-l-[20px] border-l-transparent transform translate-x-4 -translate-y-5" />
                <p className="text-lg italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-600">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;