import { useState } from 'react';
import OrderNavbar from './OrderNavbar';

function OrderFood() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pincode, setPincode] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState('Delivery');
  const [selectedTime, setSelectedTime] = useState('Now');
  const [orderStatus, setOrderStatus] = useState({ 0: 'pending', 1: 'pending' });
  const [showPreferences, setShowPreferences] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDetectLocation = () => {
    setLocationStatus('fetching');
    setTimeout(() => {
      setPincode('122017');
      setLocationStatus('success');
    }, 2000);
  };

  const handleExplore = (category) => {
    console.log(`Exploring ${category} category`);
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
    }
    console.log('Back button clicked');
  };

  const handleItemToggle = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleCustomTime = (e) => {
    const value = e.target.value.trim();
    const timeRegex = /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    if (timeRegex.test(value) || timeSlots.includes(value)) {
      setSelectedTime(value);
    }
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
      description: 'Gentle, soothing meals for when you’re under the weather. Savor light khichdi, veggie broths, and steamed comforts that hug your soul and aid recovery.',
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
      />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-1/4 bg-[#c3015a] rounded-r-3xl shadow-lg p-6 z-40 flex flex-col gap-6 overflow-y-auto">
            <div className="flex flex-col items-center">
              <img
                src={chefInfo.photo}
                alt={chefInfo.name}
                className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-white shadow-md"
              />
              <h2 className="text-xl font-bold text-white text-center">
                From the Kitchen of {chefInfo.name}
              </h2>
              <button
                onClick={handleBack}
                className="flex items-center gap-2 bg-white text-[#c3015a] px-4 py-2 rounded-lg hover:bg-[#f5b110] hover:text-white transition-colors text-sm font-semibold mt-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
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

            {/* Food Item Selection */}
            {showPreferences && (
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold text-center">
                  Select Items for {deliveryOption}:
                </p>
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
              </div>
            )}

            {/* Order Preference */}
            {showPreferences && (
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold text-center">Order Preference:</p>
                <div className="flex justify-center gap-4">
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
              </div>
            )}

            {/* Time Selection */}
            {showPreferences && (
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold text-center">Select Time for {deliveryOption}:</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
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
                  type="text"
                  value={selectedTime}
                  onChange={handleCustomTime}
                  placeholder="Enter time, e.g., 2:45 PM"
                  className="w-full p-2 rounded-lg bg-white text-[#c3015a] text-sm text-center"
                />
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
          {!pincode ? (
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
                    {hoveredCategory === index && (
                      <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center p-6 overflow-hidden">
                        <h3 className="text-2xl font-extrabold text-white mb-3 break-words">{category.name}</h3>
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
                You have 9 outside orders left for the month
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderFood;