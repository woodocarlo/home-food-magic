import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../App';
import OrderNavbar from './OrderNavbar';
import dishes from './dishesData';
import './CategoryPage.css';

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pincode, setPincode] = useState('122017');
  const [locationStatus, setLocationStatus] = useState('success');
  const [deliveryOption, setDeliveryOption] = useState('Delivery');
  const [selectedTime, setSelectedTime] = useState('Now');
  const [orderStatus, setOrderStatus] = useState({});
  const [showPreferences, setShowPreferences] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredDish, setHoveredDish] = useState(null);
  const [dishDistances, setDishDistances] = useState({});
  const [filters, setFilters] = useState({
    priceSort: '',
    priceRange: 1000,
    time: '',
    dietary: [],
    nutrients: [],
    distance: 1
  });

  // Initialize distances for dishes on mount
  useEffect(() => {
    const distances = {};
    dishes.forEach((dish) => {
      distances[dish.id] = (Math.random() * 1).toFixed(2);
    });
    setDishDistances(distances);
  }, []);

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

  const handleTakeOrder = () => {
    const newStatus = {};
    filteredDishes.forEach((dish) => {
      newStatus[dish.id] = 'accepted';
    });
    setOrderStatus(newStatus);
    setShowPreferences(true);
  };

  const handleNotInterested = () => {
    setShowDisclaimer(true);
  };

  const confirmNotInterested = () => {
    const newStatus = {};
    filteredDishes.forEach((dish) => {
      newStatus[dish.id] = 'rejected';
    });
    setOrderStatus(newStatus);
    setShowDisclaimer(false);
    setShowPreferences(false);
    setOrderConfirmed(false);
  };

  const cancelDisclaimer = () => {
    setShowDisclaimer(false);
  };

  const handleBack = () => {
    if (showDisclaimer) {
      cancelDisclaimer();
    } else if (showPreferences) {
      setShowPreferences(false);
      const newStatus = {};
      filteredDishes.forEach((dish) => {
        newStatus[dish.id] = 'pending';
      });
      setOrderStatus(newStatus);
      setSelectedItems([]);
      setSelectedTime('Now');
      setOrderConfirmed(false);
    } else {
      navigate('/');
    }
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

  const handleAddToCart = (dish) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === dish.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
    console.log(`Added ${dish.name} to cart`);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === 'dietary' || filterType === 'nutrients') {
        return { ...prev, [filterType]: [value] };
      } else if (filterType === 'priceRange') {
        return { ...prev, priceRange: Number(value) };
      } else if (filterType === 'distance') {
        return { ...prev, distance: Number(value) };
      }
      return { ...prev, [filterType]: prev[filterType] === value ? '' : value };
    });
  };

  const removeFilter = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === 'dietary' || filterType === 'nutrients') {
        return { ...prev, [filterType]: [] };
      } else if (filterType === 'priceRange') {
        return { ...prev, priceRange: 1000 };
      } else if (filterType === 'distance') {
        return { ...prev, distance: 1 };
      }
      return { ...prev, [filterType]: '' };
    });
  };

  const getDistance = (dish) => {
    return Number(dishDistances[dish.id]) || 0;
  };

  const filteredDishes = dishes
    .filter((dish) => dish?.category === categoryName)
    .filter((dish) =>
      dish?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false
    )
    .filter((dish) => {
      if (filters.dietary.length === 0) return true;
      return filters.dietary.includes(dish?.dietary);
    })
    .filter((dish) => {
      if (filters.nutrients.length === 0) return true;
      return filters.nutrients.every((nutrient) =>
        dish?.nutrients?.includes(nutrient)
      );
    })
    .filter((dish) => {
      return (dish?.price || 0) <= filters.priceRange;
    })
    .filter((dish) => getDistance(dish) <= filters.distance)
    .sort((a, b) => {
      if (filters.priceSort === 'low-to-high') return (a?.price || 0) - (b?.price || 0);
      if (filters.priceSort === 'high-to-low') return (b?.price || 0) - (a?.price || 0);
      if (filters.time === 'recent-to-oldest')
        return new Date(b?.cookedAt || 0) - new Date(a?.cookedAt || 0);
      if (filters.time === 'oldest-to-recent')
        return new Date(a?.cookedAt || 0) - new Date(b?.cookedAt || 0);
      return 0;
    });

  const getCookedDay = (cookedAt) => {
    if (!cookedAt) return 'Unknown time';
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

  const filterOptions = {
    priceSort: [
      { label: 'Low to High', value: 'low-to-high' },
      { label: 'High to Low', value: 'high-to-low' },
    ],
    time: [
      { label: 'Recent to Oldest', value: 'recent-to-oldest' },
      { label: 'Oldest to Recent', value: 'oldest-to-recent' },
    ],
    dietary: ['Veg', 'Non-Veg', 'Egg'],
    nutrients: [
      ...(categoryName === 'PowerFuel'
        ? ['Protein-Rich', 'Carbs-Rich', 'Fiber-Rich']
        : categoryName === 'VitalBite'
        ? ['Vitamin-Rich', 'Mineral-Rich', 'Low-Calorie']
        : []),
      'Multigrain',
      'Gluten-Free'
    ],
  };

  const chefInfo = {
    name: 'Chef Aanya',
    photo: 'https://i.postimg.cc/7ZBcjDqp/chef-photo.jpg',
    dishes: [
      {
        id: 'chef1',
        name: 'Signature Chicken Bowl',
        image: 'https://i.postimg.cc/SKbXzLx4/crousel.jpg',
        cookedAt: '2025-04-27T10:30:00',
      },
      {
        id: 'chef2',
        name: 'Special Quinoa Salad',
        image: 'https://i.postimg.cc/T3vKSqMs/6.jpg',
        cookedAt: '2025-04-26T11:00:00',
      },
    ],
    orderItems: filteredDishes.map((dish) => dish?.name).filter(Boolean),
    note: 'Made with love and fresh ingredients just for you!',
  };

  const appliedFilters = [
    ...(filters.priceSort ? [{ type: 'priceSort', value: filters.priceSort, label: filterOptions.priceSort.find(o => o.value === filters.priceSort)?.label }] : []),
    ...(filters.time ? [{ type: 'time', value: filters.time, label: filterOptions.time.find(o => o.value === filters.time)?.label }] : []),
    ...filters.dietary.map(d => ({ type: 'dietary', value: d, label: d })),
    ...filters.nutrients.map(n => ({ type: 'nutrients', value: n, label: n })),
    ...(filters.priceRange !== 1000
      ? [{ type: 'priceRange', value: filters.priceRange, label: `Up to ₹${filters.priceRange}` }]
      : []),
    ...(filters.distance !== 1
      ? [{ type: 'distance', value: filters.distance, label: `${(filters.distance * 1000).toFixed(0)}m` }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[#f5b110] font-poppins">
      <OrderNavbar
        onToggleSidebar={toggleSidebar}
        pincode={pincode}
        setPincode={setPincode}
        onDetectLocation={handleDetectLocation}
        locationStatus={locationStatus}
        cartItems={cartItems}
      />
      <div className="flex pt-16">
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
            <div className="flex justify-center gap-4">
              {chefInfo.dishes.map((dish) => (
                <div key={dish.id} className="flex flex-col items-center">
                  <div
                    className={`relative min-w-[160px] min-h-[190px] max-w-[180px] max-h-[190px] border-4 border-white shadow-md rounded-lg bg-white transform rotate-7 ${
                      orderStatus[dish.id] === 'rejected' ? 'bg-gray-400 opacity-50' : ''
                    }`}
                  >
                    <div className="w-full h-[calc(100%-3rem)] overflow-hidden">
                      <img
                        src={dish.image}
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
            {orderConfirmed && (
              <div className="bg-white p-4 rounded-lg text-center">
                <svg className="h-12 w-12 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-[#c3015a] text-sm font-semibold">Your order is confirmed!</p>
              </div>
            )}
            {isConfirming && (
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-8 w-8 text-[#f5b110]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
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
        <div className={`flex-1 p-6 ${isSidebarOpen ? 'ml-[25%]' : 'ml-0'}`}>
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate('/order-food')}
              className="text-[#963f28] hover:text-[#c3015a] transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <h1 className="text-4xl font-bold text-[#963f28] mb-6 text-center">
            {categoryName} Dishes
          </h1>
          <div className="mb-6 flex items-center gap-4">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-2 rounded-lg bg-white text-[#c3015a] text-sm border"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-white text-[#c3015a] hover:bg-[#f5b110] hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v3.586a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 01-.293-.707v-3.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
          {appliedFilters.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {appliedFilters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-[#c3015a] text-white px-2 py-1 rounded-full text-sm"
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={() => removeFilter(filter.type, filter.value)}
                    className="hover:text-[#f5b110]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          {showFilters && (
            <div className="mb-6 bg-white p-6 rounded-lg shadow-lg grid grid-cols-2 gap-6">
              <div>
                <label className="text-[#963f28] text-sm font-semibold block mb-2">Price Sort</label>
                <select
                  value={filters.priceSort}
                  onChange={(e) => handleFilterChange('priceSort', e.target.value)}
                  className="w-full p-2 rounded-lg bg-white text-[#c3015a] text-sm border"
                >
                  <option value="">Select</option>
                  {filterOptions.priceSort.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[#963f28] text-sm font-semibold block mb-2">Time</label>
                <select
                  value={filters.time}
                  onChange={(e) => handleFilterChange('time', e.target.value)}
                  className="w-full p-2 rounded-lg bg-white text-[#c3015a] text-sm border"
                >
                  <option value="">Select</option>
                  {filterOptions.time.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[#963f28] text-sm font-semibold block mb-2">Dietary</label>
                <select
                  value={filters.dietary[0] || ''}
                  onChange={(e) => handleFilterChange('dietary', e.target.value)}
                  className="w-full p-2 rounded-lg bg-white text-[#c3015a] text-sm border"
                >
                  <option value="">Select</option>
                  {filterOptions.dietary.map((diet) => (
                    <option key={diet} value={diet}>
                      {diet}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[#963f28] text-sm font-semibold block mb-2">Nutrients</label>
                <select
                  value={filters.nutrients[0] || ''}
                  onChange={(e) => handleFilterChange('nutrients', e.target.value)}
                  className="w-full p-2 rounded-lg bg-white text-[#c3015a] text-sm border"
                >
                  <option value="">Select</option>
                  {filterOptions.nutrients.map((nutrient) => (
                    <option key={nutrient} value={nutrient}>
                      {nutrient}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex gap-6">
                <div className="flex-1">
                  <label className="text-[#963f28] text-sm font-semibold block mb-2">Max Price: ₹{filters.priceRange}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[#963f28] text-sm font-semibold block mb-2">Max Distance: {(filters.distance * 1000).toFixed(0)}m</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={filters.distance}
                    onChange={(e) => handleFilterChange('distance', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-4 min-h-[calc(100vh-16rem)]">
            {filteredDishes.length === 0 ? (
              <p className="text-[#963f28] text-center w-full">No dishes match your filters.</p>
            ) : (
              filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className={`dish-card relative rounded-2xl shadow-lg bg-white overflow-hidden transition-all duration-300 ${hoveredDish === dish.id ? 'w-80 h-96' : 'w-64 h-72'}`}
                  onMouseEnter={() => setHoveredDish(dish.id)}
                  onMouseLeave={() => setHoveredDish(null)}
                >
                  <img
                    src={dish.image || 'https://via.placeholder.com/150'}
                    alt={dish.name || 'Dish'}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${dish.dietary === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}
                      ></span>
                      <h3 className="text-xl font-bold text-[#963f28]">{dish.name || 'Unknown Dish'}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-base font-semibold text-[#c3015a]">₹{(dish.price || 0).toFixed(2)}</p>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-[#963f28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-base font-semibold text-[#963f28]">{(getDistance(dish) * 1000).toFixed(0)}m</p>
                      </div>
                    </div>
                    {hoveredDish === dish.id && (
                      <div className="mt-2">
                        <p className="text-xs font-bold text-[#963f28] mb-1">{chefInfo.name}</p>
                        <p className="text-xs text-[#963f28] mb-1">Cooked {getCookedDay(dish.cookedAt)}</p>
                        <p className="text-xs text-[#963f28] mb-1">{dish.description || 'No description available'}</p>
                        {dish.nutrients?.length > 0 && (
                          <p className="text-xs text-[#963f28]">{dish.nutrients.join(', ')}</p>
                        )}
                        <button
                          onClick={() => handleAddToCart(dish)}
                          className="mt-2 bg-[#f5b110] text-white px-4 py-1 rounded-full hover:bg-[#bb0718] transition-colors text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;