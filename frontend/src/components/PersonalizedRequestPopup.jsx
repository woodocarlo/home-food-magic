import React, { useState, useEffect } from 'react';

function PersonalizedRequestPopup({ onClose }) {
  const [requestType, setRequestType] = useState('Dish');
  const [orderType, setOrderType] = useState('Delivery');
  const [dishes, setDishes] = useState([{ id: 1 }]);
  const [activeDish, setActiveDish] = useState(1);
  const [dishDetails, setDishDetails] = useState({
    1: {
      cuisine: '',
      dishName: '',
      description: '',
      dietType: 'Vegetarian',
      quantity: '',
      quantityUnit: 'kg',
      cookingInstructions: '',
    },
  });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [photos, setPhotos] = useState([null, null]); // Store up to 2 photos

  const requestOptions = [
    { value: 'Dish', label: 'Dish', icon: '🍲' },
    { value: 'Catering', label: 'Catering', icon: '🍽️' },
    { value: 'Snack', label: 'Snack', icon: '🍟' },
    { value: 'Bakery', label: 'Bakery', icon: '🥐' },
    { value: 'Sweet Dish', label: 'Sweet Dish', icon: '🍰' },
  ];

  const orderOptions = [
    { value: 'Delivery', label: 'Delivery', icon: '🚚' },
    { value: 'Pickup', label: 'Pickup', icon: '🏃‍♂️' },
    { value: 'Dine-In', label: 'Dine-In', icon: '🍽️' },
  ];

  const dietOptions = ['Vegetarian', 'Non-vegetarian', 'Ketogenic Diet', 'Dairy-free', 'Halal', 'Gluten-free'];
  const quantityUnits = ['kg', 'no. of people', 'no. of serves'];

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo && photo.preview) {
          URL.revokeObjectURL(photo.preview);
        }
      });
    };
  }, [photos]);

  const handlePhotoUpload = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotos = [...photos];
      if (newPhotos[index]) {
        URL.revokeObjectURL(newPhotos[index].preview);
      }
      newPhotos[index] = {
        file,
        preview: URL.createObjectURL(file),
      };
      setPhotos(newPhotos);
    }
  };

  const removePhoto = (index) => {
    const newPhotos = [...photos];
    if (newPhotos[index]) {
      URL.revokeObjectURL(newPhotos[index].preview);
      newPhotos[index] = null;
      setPhotos(newPhotos);
    }
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const updateDishDetails = (field, value) => {
    setDishDetails((prev) => ({
      ...prev,
      [activeDish]: {
        ...prev[activeDish],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      requestType,
      orderType,
      dishes: dishDetails,
      date,
      time,
      photos,
    });
    onClose();
  };

  const addNewDish = () => {
    const newId = dishes.length > 0 ? Math.max(...dishes.map((d) => d.id)) + 1 : 1;
    setDishes([...dishes, { id: newId }]);
    setActiveDish(newId);
    setDishDetails((prev) => ({
      ...prev,
      [newId]: {
        cuisine: '',
        dishName: '',
        description: '',
        dietType: 'Vegetarian',
        quantity: '',
        quantityUnit: 'kg',
        cookingInstructions: '',
      },
    }));
  };

  const switchDish = (id) => {
    setActiveDish(id);
  };

  const currentDish = dishDetails[activeDish] || {
    cuisine: '',
    dishName: '',
    description: '',
    dietType: 'Vegetarian',
    quantity: '',
    quantityUnit: 'kg',
    cookingInstructions: '',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-[#FFF5EE] to-[#FFE4D6] p-8 rounded-2xl shadow-2xl w-full max-w-4xl min-h-0 mt-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-[#c3015a] hover:text-[#f5b110] transition-colors bg-white/80 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#963f28] mb-2">Personalized Food Request</h2>
          <p className="text-[#c3015a]">
            Food that listens to your heart — Customize every bite, because you deserve it!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="bg-white/80 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#963f28] mb-4 flex items-center gap-2">
              <span className="text-2xl">📷</span> Add Photos
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {[0, 1].map((index) => (
                <div key={index} className="relative">
                  <label
                    className="w-32 h-32 border-2 border-dashed border-[#f5b110] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#FFF5EE] transition-all overflow-hidden"
                  >
                    {photos[index] ? (
                      <img
                        src={photos[index].preview}
                        alt={`Uploaded photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl text-[#c3015a]">+</span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload(index)}
                      className="hidden"
                    />
                  </label>
                  {photos[index] && (
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 text-[#c3015a] hover:text-[#f5b110] text-xl transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Request Type Selection */}
          <div className="bg-white/80 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#963f28] mb-4 flex items-center gap-2">
              <span className="text-2xl">🍽️</span> Type of Request
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {requestOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setRequestType(option.value)}
                  className={`p-3 rounded-lg cursor-pointer transition-all flex flex-col items-center ${
                    requestType === option.value
                      ? 'bg-[#c3015a] text-white shadow-md'
                      : 'bg-[#FFF5EE] hover:bg-[#FFE4D6] text-[#963f28]'
                  }`}
                >
                  <span className="text-3xl mb-1">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Type Selection */}
          <div className="bg-white/80 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#963f28] mb-4 flex items-center gap-2">
              <span className="text-2xl">🚀</span> Order Type
            </h3>
            <div className="flex flex-wrap gap-4">
              {orderOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOrderTypeChange(option.value)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full cursor-pointer transition-all ${
                    orderType === option.value
                      ? 'bg-[#c3015a] text-white shadow-md hover:bg-[#a1014c]'
                      : 'bg-[#FFF5EE] hover:bg-[#FFE4D6] text-[#963f28]'
                  }`}
                >
                  <span className="text-xl">{option.icon}</span>
                  <span>{option.label}</span>
                  <input
                    type="radio"
                    name="orderType"
                    className="hidden"
                    checked={orderType === option.value}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dishes Navigation */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {dishes.map((dish) => (
              <button
                key={dish.id}
                type="button"
                onClick={() => switchDish(dish.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeDish === dish.id
                    ? 'bg-[#c3015a] text-white'
                    : 'bg-[#FFF5EE] text-[#963f28]'
                }`}
              >
                Dish {dish.id}
              </button>
            ))}
            <button
              type="button"
              onClick={addNewDish}
              className="px-4 py-2 rounded-full bg-[#f5b110] text-white hover:bg-[#c3015a] transition-colors flex items-center gap-2"
            >
              <span>+</span> Add Dish
            </button>
          </div>

          {/* Dish Details */}
          <div className="bg-white/80 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#963f28] mb-4 flex items-center gap-2">
              <span className="text-2xl">🍲</span> Dish Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#963f28] mb-1">Cuisine Name/Origin</label>
                  <div className="relative">
                    <select
                      value={currentDish.cuisine}
                      onChange={(e) => updateDishDetails('cuisine', e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#FFF5EE] text-[#963f28] border border-[#f5b110] appearance-none focus:ring-2 focus:ring-[#c3015a] focus:border-transparent"
                    >
                      <option value="">Select Cuisine</option>
                      <option value="Indian">Indian</option>
                      <option value="Italian">Italian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Mexican">Mexican</option>
                      <option value="Continental">Continental</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-[#c3015a]">▼</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#963f28] mb-1">Dish Name*</label>
                  <input
                    type="text"
                    value={currentDish.dishName}
                    onChange={(e) => updateDishDetails('dishName', e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FFF5EE] text-[#963f28] border border-[#f5b110] focus:ring-2 focus:ring-[#c3015a] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#963f28] mb-1">Diet Type</label>
                  <div className="relative">
                    <select
                      value={currentDish.dietType}
                      onChange={(e) => updateDishDetails('dietType', e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#FFF5EE] text-[#963f28] border border-[#f5b110] appearance-none focus:ring-2 focus:ring-[#c3015a] focus:border-transparent"
                    >
                      {dietOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-[#c3015a]">▼</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#963f28] mb-1">Item Description*</label>
                  <textarea
                    value={currentDish.description}
                    onChange={(e) => updateDishDetails('description', e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FFF5EE] text-[#963f28] border border-[#f5b110] focus:ring-2 focus:ring-[#c3015a] focus:border-transparent h-32"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#963f28] mb-1">Quantity</label>
                    <input
                      type="text"
                      value={currentDish.quantity}
                      onChange={(e) => updateDishDetails('quantity', e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#FFF5EE] text-[#963f28] border border-[#f5b110] focus:ring-2 focus:ring-[#c3015a] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#963f28] mb-1">Unit</label>
                    <div className="relative">
                      <select
                        value={currentDish.quantityUnit}
                        onChange={(e) => updateDishDetails('quantityUnit', e.target.value)}
                        className="w-full p-3 rounded-xl bg-[#FFF5EE] text-[#963f28] border border-[#f5b110] appearance-none focus:ring-2 focus:ring-[#c3015a] focus:border-transparent"
                      >
                        {quantityUnits.map((unit) => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-[#c3015a]">▼</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-[#963f28] mb-1">Cooking Instructions</label>
              <textarea
                value={currentDish.cookingInstructions}
                onChange={(e) => updateDishDetails('cookingInstructions', e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FFF5EE] text-[#963f28] border border-#f5b110] focus:ring-2 focus:ring-[#c3015a] focus:border-transparent"
                placeholder="Any special instructions for preparation..."
              />
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="bg-white/80 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#963f28] mb-4 flex items-center gap-2">
              <span className="text-2xl">⏰</span> When Do You Need It?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#963f28] mb-1">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FFF5EE] text-[#963f28] border border-[#f5b110] focus:ring-2 focus:ring-[#c3015a] focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-[#c3015a]">📅</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#963f28] mb-1">Time</label>
                <div className="relative">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FFF5EE] text-[#963f28] border border-[#f5b110] focus:ring-2 focus:ring-[#c3015a] focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-[#c3015a]">⏱️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#f5b110] text-white text-lg font-bold rounded-xl hover:bg-[#c3015a] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span className="text-xl">✨</span> Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default PersonalizedRequestPopup;
