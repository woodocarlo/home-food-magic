import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderNavbar({ 
  onToggleSidebar, 
  pincode, 
  setPincode, 
  showPincodeInput, 
  setShowPincodeInput,
  onDetectLocation,
  locationStatus
}) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = () => {
    console.log('User signed out');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img 
              src="https://via.placeholder.com/48?text=Logo" 
              alt="App Logo" 
              className="h-10 w-10"
            />
            <span className="ml-2 text-xl font-bold text-[#FF6347]">Foodie</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {pincode ? (
              <div className="relative">
                <button 
                  onClick={() => setShowPincodeInput(!showPincodeInput)}
                  className="flex items-center text-gray-600 hover:text-[#FF6347] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <span className="truncate max-w-xs">
                    {pincode ? `Delivery to: ${pincode}` : 'Set Location'}
                  </span>
                </button>
                
                {showPincodeInput && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 px-3 z-50">
                    <div className="flex items-center mb-2">
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-[#FF6347]"
                        placeholder="Enter pincode"
                      />
                      <button 
                        onClick={() => setShowPincodeInput(false)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ✓
                      </button>
                    </div>
                    <button
                      onClick={onDetectLocation}
                      className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      disabled={locationStatus === 'fetching'}
                    >
                      {locationStatus === 'fetching' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Detecting...
                        </>
                      ) : (
                        'Detect automatically'
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : null}
            
            <button 
              className="text-gray-600 hover:text-[#FF6347] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={() => navigate('/subscriptions')}
            >
              Subscriptions
            </button>
            
            <button 
              onClick={onToggleSidebar}
              className="text-gray-600 hover:text-[#FF6347] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              More
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#FF6347] px-3 py-2 rounded-md"
              >
                <img 
                  src="https://via.placeholder.com/32?text=Profile" 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium">Profile</span>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default OrderNavbar;