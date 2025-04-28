import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../App';
import OrderNavbar from './OrderNavbar';
import PersonalizedRequestPopup from './PersonalizedRequestPopup';

function OrderFood() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pincode, setPincode] = useState(sessionStorage.getItem('detectedPincode') || '');
  const [locationStatus, setLocationStatus] = useState('');
  const [hasAttemptedDetection, setHasAttemptedDetection] = useState(
    sessionStorage.getItem('hasAttemptedDetection') === 'true'
  );
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState('Delivery');
  const [selectedTime, setSelectedTime] = useState('Now');
  const [orderStatus, setOrderStatus] = useState({ 0: 'pending', 1: 'pending' });
  const [showPreferences, setShowPreferences] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDetectLocation = () => {
    setLocationStatus('fetching');
    setTimeout(() => {
      const detectedPincode = '122017';
      setPincode(detectedPincode);
      setLocationStatus('success');
      setHasAttemptedDetection(true);
      // Store in session storage
      sessionStorage.setItem('detectedPincode', detectedPincode);
      sessionStorage.setItem('hasAttemptedDetection', 'true');
    }, 2000);
  };

  const handleExplore = (category) => {
    navigate(`/category/${category}`);
  };

  const handleTakeOrder = () => {
    setOrderStatus((prev) => {
      const newStatus = {};
      Object.keys(prev).forEach((key) => {
        newStatus[key] = 'accepted';
      });
      return newStatus;
    });
    setShowPreferences(true);
    console.log('Taking order for all dishes');
  };

  const handleNotInterested = () => {
    setShowDisclaimer(true);
  };

  const confirmNotInterested = () => {
    setOrderStatus((prev) => {
      const newStatus = {};
      Object.keys(prev).forEach((key) => {
        newStatus[key] = 'rejected';
      });
      return newStatus;
    });
    setShowDisclaimer(false);
    setShowPreferences(false);
    setOrderConfirmed(false);
    console.log('All dishes rejected');
  };

  const cancelDisclaimer = () => {
    setShowDisclaimer(false);
  };

  const handleBack = () => {
    if (showDisclaimer) {
      cancelDisclaimer();
    } else if (showPreferences) {
      setShowPreferences(false);
      setOrderStatus((prev) => {
        const newStatus = {};
        Object.keys(prev).forEach((key) => {
          newStatus[key] = 'pending';
        });
        return newStatus;
      });
      setSelectedItems([]);
      setSelectedTime('Now');
      setOrderConfirmed(false);
    }
    console.log('Back icon clicked');
  };

  const handleItemToggle = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleCustomTime = (e) => {
    const value = e.target.value;
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      setSelectedTime(`${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`);
    }
  };

  const handleFinalizeOrder = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item.');
      return;
    }
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setOrderConfirmed(true);
      setShowPreferences(false);
    }, 1500);
  };

  // Placeholder for database data
  const chefInfo = {
    name: 'Chef Aanya',
    photo: 'https://i.postimg.cc/7ZBcjDqp/chef-photo.jpg',
    dishes: [
      {
        name: 'Grilled Chicken Bowl',
        photo: 'https://i.postimg.cc/SKbXzLx4/crousel.jpg',
        cookedAt: '2025-04-27T10:30:00',
      },
      {
        name: 'Quinoa Power Salad',
        photo: 'https://i.postimg.cc/T3vKSqMs/6.jpg',
        cookedAt: '2025-04-26T11:00:00',
      },
    ],
    orderItems: ['Chicken Curry', 'Veggie Stir-Fry', 'Paneer Tikka'],
    note: 'Made with love and fresh ingredients just for you!',
  };

  const getCookedDay = (cookedAt) => {
    const today = new Date('2025-04-27');
    const cookedDate = new Date(cookedAt);
    const diffTime = today - cookedDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = cookedDate.getHours();
    const minutes = cookedDate.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const time = `${formattedHours}:${minutes} ${ampm}`;
    return diffDays === 0 ? `today at ${time}` : diffDays === 1 ? `yesterday at ${time}` : `${diffDays} days ago at ${time}`;
  };

  const timeSlots = ['Now', '30 mins', '1 hour', '2 hours'];

  const categories = [
    {
      name: 'PowerFuel',
      description: 'Fuel your gains with high-protein, carb-packed meals crafted for gym warriors. Think grilled chicken bowls, quinoa power salads, and protein smoothies to supercharge your workouts.',
      color: '#bb0718',
      image: 'https://i.postimg.cc/SKbXzLx4/crousel.jpg',
    },
    {
      name: 'VitalBite',
      description: 'Nourish your body with dietician-approved, nutrient-dense dishes. Multigrain wraps, low-oil stir-fries, and vitamin-rich superfood bowls to keep you glowing and energized.',
      color: '#d32f2f',
      image: 'https://i.postimg.cc/T3vKSqMs/6.jpg',
    },
    {
      name: 'HealSpoon',
      description: "Gentle, soothing meals for when you're under the weather. Savor light khichdi, veggie broths, and steamed comforts that hug your soul and aid recovery.",
      color: '#8e0000',
      image: 'https://i.postimg.cc/Xqyv1X23/7.jpg',
    },
    {
      name: 'DailyCrave',
      description: 'Satisfy your everyday cravings with classic comfort foods. From buttery parathas to spicy street-style chaat, these dishes bring joy to every bite.',
      color: '#ff5252',
      image: 'https://i.postimg.cc/WtL1BjKZ/8.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5b110] font-poppins">
      {/* More Icon */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[100] text-[#963f28] hover:text-[#c3015a] transition-colors bg-white/80 rounded-full p-1 shadow-md"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <OrderNavbar
        onToggleSidebar={toggleSidebar}
        pincode={pincode}
        setPincode={setPincode}
        onDetectLocation={handleDetectLocation}
        locationStatus={locationStatus}
        cartItems={cartItems}
        onBack={() => navigate('/')}
      />

      <div className="flex pt-16">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-1/4 bg-[#c3015a] rounded-r-3xl shadow-lg p-6 z-40 flex flex-col gap-6 overflow-y-auto">
            <div className="relative flex flex-col items-center">
              <button
                onClick={handleBack}
                className="absolute top-2 left-2 text-[#c3015a] hover:text-[#f5b110] transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <img
                src={chefInfo.photo}
                alt={chefInfo.name}
                className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-white shadow-md"
              />
              <h2 className="text-xl font-bold text-white text-center">
                From the Kitchen of {chefInfo.name}
              </h2>
            </div>

            {/* Dishes */}
            <div className="flex justify-center gap-4">
              {chefInfo.dishes.map((dish, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`relative min-w-[160px] min-h-[190px] max-w-[180px] max-h-[190px] border-4 border-white shadow-md rounded-lg bg-white transform rotate-7 ${
                      orderStatus[index] === 'rejected' ? 'bg-gray-400 opacity-50' : ''
                    }`}
                  >
                    <div className="w-full h-[calc(100%-3rem)] overflow-hidden">
                      <img
                        src={dish.photo}
                        alt={dish.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 text-center text-base font-bold font-serif text-black">
                      {dish.name}
                    </p>
                  </div>
                  <p className="text-white text-xs text-center mt-2">Cooked {getCookedDay(dish.cookedAt)}</p>
                </div>
              ))}
            </div>

            {/* Order Options */}
            {Object.values(orderStatus).includes('pending') && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleTakeOrder}
                  className="bg-white text-[#c3015a] px-4 py-2 rounded-lg hover:bg-[#f5b110] hover:text-white transition-colors text-sm font-semibold"
                >
                  Take Order
                </button>
                <button
                  onClick={handleNotInterested}
                  className="bg-white text-[#c3015a] px-4 py-2 rounded-lg hover:bg-[#f5b110] hover:text-white transition-colors text-sm font-semibold"
                >
                  Not Interested
                </button>
              </div>
            )}

            {/* Disclaimer */}
            {showDisclaimer && (
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-[#c3015a] text-sm mb-4">
                  Are you sure? These dishes will be marked as unavailable and cannot be reordered.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={confirmNotInterested}
                    className="bg-[#c3015a] text-white px-4 py-2 rounded-lg hover:bg-[#bb0718] transition-colors text-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={cancelDisclaimer}
                    className="bg-gray-200 text-[#c3015a] px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Order Confirmation */}
            {orderConfirmed && (
              <div className="bg-white p-4 rounded-lg text-center">
                <svg className="h-12 w-12 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-[#c3015a] text-sm font-semibold">Your order is confirmed!</p>
              </div>
            )}

            {/* Loading Spinner */}
            {isConfirming && (
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-8 w-8 text-[#f5b110]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}

            {/* Food Item Selection and Preferences */}
            {showPreferences && !isConfirming && !orderConfirmed && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between mb-2">
                  <button
                    onClick={handleBack}
                    className="text-white hover:text-[#f5b110] transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex-1 text-center">
                    <p className="text-white text-sm font-semibold">
                      Select Items for {deliveryOption}:
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 max-w-full">
                  {chefInfo.orderItems.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 text-white text-sm w-[calc(50%-0.5rem)]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={() => handleItemToggle(item)}
                        className="text-[#f5b110]"
                      />
                      {item}
                    </label>
                  ))}
                </div>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-2 w-1/2">
                    <p className="text-white text-sm font-semibold text-center">Order Preference:</p>
                    <label className="flex items-center gap-2 text-white text-sm">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="Pickup"
                        checked={deliveryOption === 'Pickup'}
                        onChange={() => setDeliveryOption('Pickup')}
                        className="text-[#f5b110]"
                      />
                      Pickup
                    </label>
                    <label className="flex items-center gap-2 text-white text-sm">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="Delivery"
                        checked={deliveryOption === 'Delivery'}
                        onChange={() => setDeliveryOption('Delivery')}
                        className="text-[#f5b110]"
                      />
                      Delivery
                    </label>
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <p className="text-white text-sm font-semibold text-center">Select Time for {deliveryOption}:</p>
                    <div className="flex flex-row gap-2">
                      {timeSlots.slice(0, 2).map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`flex-1 px-2 py-2 rounded-lg text-sm font-semibold transition-all ${
                            selectedTime === slot
                              ? 'bg-[#f5b110] text-white'
                              : 'bg-white text-[#c3015a] hover:bg-[#f5b110] hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-row gap-2">
                      {timeSlots.slice(2, 4).map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`flex-1 px-2 py-2 rounded-lg text-sm font-semibold transition-all ${
                            selectedTime === slot
                              ? 'bg-[#f5b110] text-white'
                              : 'bg-white text-[#c3015a] hover:bg-[#f5b110] hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    <input
                      type="time"
                      value={selectedTime.match(/^\d+:\d+/) ? selectedTime.match(/^\d+:\d+/)[0] : ''}
                      onChange={handleCustomTime}
                      className="w-full p-2 rounded-lg bg-white text-[#c3015a] text-sm text-center"
                    />
                  </div>
                </div>
                <button
                  onClick={handleFinalizeOrder}
                  className="bg-white text-[#c3015a] px-4 py-2 rounded-lg hover:bg-[#f5b110] hover:text-white transition-colors text-sm font-semibold w-full"
                >
                  Finalize Order
                </button>
              </div>
            )}

            {/* Chef's Note */}
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold text-center">Note from {chefInfo.name}:</p>
              <div
                className="p-4 rounded-lg text-white text-sm font-caveat bg-cover bg-center"
                style={{ backgroundImage: "url('https://i.postimg.cc/1tYJ5q0z/diary-bg.png')" }}
              >
                {chefInfo.note}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 p-6 ${isSidebarOpen ? 'ml-[25%]' : 'ml-0'}`}>
          {!pincode && !hasAttemptedDetection ? (
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                <img
                  src="src/components/public/assests/4.png"
                  alt="Location Error"
                  className="mx-auto mb-4 w-80 h-80 object-contain"
                />
                <h2 className="text-2xl font-bold text-[#bb0718] mb-6">Can't locate you, please retry</h2>
                <button
                  onClick={handleDetectLocation}
                  className="bg-[#f5b110] text-white px-6 py-2 rounded-full hover:bg-[#bb0718] transition-colors"
                >
                  {locationStatus === 'fetching' ? 'Detecting...' : 'Detect Location'}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full pt-8">
              <h1 className="text-4xl font-bold text-[#963f28] mb-6 text-center">Explore Our Food Categories</h1>
              <div className="flex space-x-4 mb-6 w-full">
                {categories.map((category, index) => (
                  <div
                    key={category.name}
                    className={`relative min-w-[200px] h-96 rounded-2xl shadow-lg transition-all duration-300 ease-in-out cursor-pointer flex-grow flex-shrink ${
                      hoveredCategory === index ? '!flex-[2]' : '!flex-1'
                    }`}
                    style={{ backgroundColor: category.color }}
                    onMouseEnter={() => {
                      setHoveredCategory(index);
                      console.log(`Hovering over ${category.name}`);
                    }}
                    onMouseLeave={() => {
                      setHoveredCategory(null);
                      console.log('Hover ended');
                    }}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                    {hoveredCategory !== index ? (
                      <div className="absolute inset-0 flex items-end justify-center bg-black/30 rounded-2xl pb-[20%]">
                        <h3 className="text-4xl font-extrabold text-white text-center break-words drop-shadow-lg">{category.name}</h3>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/70 rounded-2xl flex flex-col items-center justify-center p-6 overflow-hidden">
                        <p className="text-white text-sm text-center mb-6 break-words">
                          {category.description}
                        </p>
                        <button
                          onClick={() => handleExplore(category.name)}
                          className="bg-white text-[#bb0718] px-6 py-2 rounded-full hover:bg-[#ff5252] hover:text-white transition-colors"
                        >
                          Explore
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-lg text-[#963f28] text-center mb-4">
                Discover delicious meals tailored to your lifestyle, from fitness-focused to everyday delights.
              </p>
              <h2 className="text-xl font-bold text-[#bb0718] text-center">

              </h2>
              <div className="text-center mt-6">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="bg-[#c3015a] text-white px-6 py-3 rounded-lg hover:bg-[#bb0718] transition-colors text-lg font-semibold"
                >
                  Send a Personalized Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isPopupOpen && <PersonalizedRequestPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
}

export default OrderFood;