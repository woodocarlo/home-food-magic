import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrderNavbar from './OrderNavBar';

function OrderFood() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pincode, setPincode] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [animationStage, setAnimationStage] = useState(0); // 0: hidden, 1: loading, 2: map, 3: zoomed

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDetectLocation = () => {
    setLocationStatus('fetching');
    setAnimationStage(1); // Show loading
    
    setTimeout(() => {
      setAnimationStage(2); // Show full India map
      
      setTimeout(() => {
        setAnimationStage(3); // Zoom to Gurgaon
        setPincode('122017');
        setLocationStatus('success');
      }, 1500);
    }, 2000);
  };

  // Simplified India map path
  const indiaMapPath = "M650,350 L630,370 L610,380 L590,400 L570,410 L550,420 L530,430 L510,440 L490,450 L470,460 L450,470 L430,480 L410,490 L390,500 L370,510 L350,520 L330,530 L310,540 L290,550 L270,560 L250,570 L230,580 L210,590 L190,600 L170,610 L150,620 L130,630 L110,640 L90,650 L70,660 L50,670 L30,680 L50,660 L70,640 L90,620 L110,600 L130,580 L150,560 L170,540 L190,520 L210,500 L230,480 L250,460 L270,440 L290,420 L310,400 L330,380 L350,360 L370,340 L390,320 L410,300 L430,280 L450,260 L470,240 L490,220 L510,200 L530,180 L550,160 L570,140 L590,120 L610,100 L630,80 L650,60 L670,80 L690,100 L710,120 L730,140 L750,160 L770,180 L750,200 L730,220 L710,240 L690,260 L670,280 L650,300 L630,320 L610,340 L590,360 L570,380 L550,400 L530,420 L510,440 L490,460 L470,480 L450,500 L430,520 L410,540 L390,560 L370,580 L350,600 L330,620 L310,640 L290,660 L270,680 L250,700 L230,720 L210,740 L190,760 L170,780 L150,800 L130,780 L110,760 L90,740 L70,720 L50,700 L30,680 Z";

  return (
    <div className="min-h-screen bg-[#FFF5EE] font-poppins">
      <OrderNavbar 
        onToggleSidebar={toggleSidebar} 
        pincode={pincode}
        setPincode={setPincode}
        onDetectLocation={handleDetectLocation}
        locationStatus={locationStatus}
      />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-1/4 bg-[#FFCCCB] rounded-r-3xl shadow-lg p-6 z-40">
            <h2 className="text-xl font-bold text-[#FF6347] mb-4">Quick Filters</h2>
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left px-4 py-2 rounded-lg bg-white/50 hover:bg-white text-gray-700 hover:text-[#FF6347] transition-colors">
                  Vegetarian
                </button>
              </li>
              {/* Other filter buttons */}
            </ul>
          </div>
        )}
        
        {/* Main Content */}
        <div className={`flex-1 p-6 ${isSidebarOpen ? 'ml-[25%]' : 'ml-0'}`}>
          {!pincode ? (
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-[#FF6347] mb-6 text-center">Update Your Location</h2>
                {/* Location input form */}
              </div>
            </div>
          ) : (
            <>
              {/* Map Animation Container */}
              <div className="mb-6 relative h-64 bg-gray-100 rounded-xl overflow-hidden">
                <AnimatePresence>
                  {/* Loading State */}
                  {animationStage === 1 && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-white/80"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-10 h-10 border-4 border-[#FF6347] border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-gray-700 font-medium">Fetching your location...</p>
                      </div>
                    </motion.div>
                  )}

                  {/* India Map - Ensure this has explicit dimensions */}
                  {animationStage >= 2 && (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <svg 
                        viewBox={
                          animationStage === 2 ? "0 0 800 800" : "450 250 300 300"
                        }
                        preserveAspectRatio="xMidYMid meet"
                        className="w-full h-full transition-all duration-1000 ease-in-out"
                      >
                        <path 
                          d={indiaMapPath}
                          fill="#E5E7EB" 
                          stroke="#6B7280" 
                          strokeWidth="2"
                        />
                        
                        {/* Gurgaon Pin */}
                        {animationStage >= 2 && (
                          <motion.g
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              type: 'spring', 
                              bounce: 0.6,
                              delay: animationStage === 2 ? 0.5 : 0
                            }}
                          >
                            <circle cx="550" cy="420" r="10" fill="#FF0000" />
                            <circle cx="550" cy="420" r="5" fill="#FFFFFF" />
                          </motion.g>
                        )}
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Location Address */}
                {animationStage === 3 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-4 left-0 right-0 mx-auto bg-white/90 px-4 py-2 rounded-lg shadow-md max-w-xs text-center"
                  >
                    <p className="text-gray-800 font-medium truncate">
                      The NorthCap University, Sector 23A, Gurgaon
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Food Items */}
              <h1 className="text-3xl font-bold text-[#FF6347] mb-6">Order Your Favorite Food</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Food cards */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderFood;