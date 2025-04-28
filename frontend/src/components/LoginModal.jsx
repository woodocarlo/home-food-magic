import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';

function LoginModal({ onClose }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Trigger fade-in on mount
    return () => setIsMounted(false); // Cleanup on unmount
  }, []);

  const modalBackground = selectedRole === 'food' 
    ? 'bg-[#FFF5EE]' // Light peach for food
    : selectedRole === 'chef' 
    ? 'bg-[#F0FFF0]' // Light mint for chef
    : 'bg-gradient-to-br from-[#FFF5EE] to-[#FEF9F3]'; // Warm gradient for default

  const handleRoleSelect = (role) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedRole(role);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div 
        className={`rounded-3xl p-6 w-full max-w-md relative shadow-2xl ${modalBackground} border-2 border-white/30 transition-all duration-300 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white transition-all flex items-center justify-center shadow-sm text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="https://i.postimg.cc/rwpXct2v/Whats-App-Image-2025-04-28-at-18-58-15-3abec7ea-removebg-preview.png" //APP LOGO 
              alt="App Logo" 
              className="h-12 w-12"
            />
          </div>
          
          {!selectedRole ? (
            <div className="py-4">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 mb-6">Select your role to continue</p>
              
              <div className="flex justify-center gap-6">
                {/* Order Food Button */}
                <button
                  onClick={() => handleRoleSelect('food')}
                  className="group relative w-40 h-40 rounded-xl overflow-hidden bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  <img 
                    src="https://i.postimg.cc/5tW5mdr5/Untitled-design-14.png" //order food sign
                    alt="Order Food" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-4">
                    <span className="text-white text-xl font-semibold drop-shadow-lg">Order Food</span>
                  </div>
                </button>
                
                {/* Chef Button */}
                <button
                  onClick={() => handleRoleSelect('chef')}
                  className="group relative w-40 h-40 rounded-xl overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  <img 
                    src="https://i.postimg.cc/tCfNYVtM/Untitled-design-13.png" //chef food sign
                    alt="Chef Login" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-4">
                    <span className="text-white text-xl font-semibold drop-shadow-lg">Chef Login</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {selectedRole === 'food' ? 'Order Food Login' : 'Chef Login'}
              </h2>
              <div className="flex justify-center mb-4">
                <img 
                  src={selectedRole === 'food' 
                    ? "https://i.postimg.cc/5tW5mdr5/Untitled-design-14.png" 
                    : "https://i.postimg.cc/tCfNYVtM/Untitled-design-13.png"} 
                  alt={selectedRole === 'food' ? "Order Food" : "Chef"} 
                  className="h-16 w-16 object-contain"
                />
              </div>
              <LoginForm role={selectedRole} onClose={onClose} />
              <button 
                className="mt-4 flex items-center justify-center mx-auto text-sm font-medium px-4 py-2 rounded-lg bg-white/80 hover:bg-white transition-all shadow-sm border border-gray-200 text-gray-700 hover:text-gray-900"
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setSelectedRole(null);
                    setIsTransitioning(false);
                  }, 300);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Choose Different Role
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;