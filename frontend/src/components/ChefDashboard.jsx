// src/components/ChefDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ChefDashboard() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');
  const [isRecording, setIsRecording] = useState(false);
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: 'Dal Khichdi',
      category: 'HealSpoon',
      type: 'veg',
      price: '₹60',
      note: 'Light and easy to digest',
      prepTime: '30 mins',
      images: ['https://via.placeholder.com/150?text=Dal+Khichdi+1', 'https://via.placeholder.com/150?text=Dal+Khichdi+2']
    },
    {
      id: 2,
      name: 'Chicken Curry',
      category: 'PowerFuel',
      type: 'non-veg',
      price: '₹120',
      note: 'Spicy with medium gravy',
      prepTime: '45 mins',
      images: ['https://via.placeholder.com/150?text=Chicken+1', 'https://via.placeholder.com/150?text=Chicken+2']
    }
  ]);

  const [newDish, setNewDish] = useState({
    name: '',
    category: 'DailyCrave',
    type: 'veg',
    price: '',
    note: '',
    prepTime: '',
    images: ['', '']
  });

  const categories = [
    { name: 'PowerFuel', desc: 'High-protein meals for fitness' },
    { name: 'VitalBite', desc: 'Healthy, nutrient-rich food' },
    { name: 'HealSpoon', desc: 'Light meals when feeling unwell' },
    { name: 'DailyCrave', desc: 'Regular comfort food' }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, this would use the Web Speech API
    alert(language === 'english' ? 
      "Recording note... (This is a demo. In a real app, it would use microphone)" : 
      "नोट रिकॉर्ड किया जा रहा है... (यह डेमो है)");
    
    setTimeout(() => {
      setIsRecording(false);
      setNewDish({...newDish, note: language === 'english' ? 
        "This is a demo voice note. Real app would convert speech to text." : 
        "यह एक डेमो वॉयस नोट है। असली ऐप में स्पीच को टेक्स्ट में बदला जाएगा।"});
    }, 2000);
  };

  const handleAddDish = () => {
    if (!newDish.name || !newDish.price) {
      alert(language === 'english' ? 'Please fill all required fields' : 'कृपया सभी आवश्यक फील्ड भरें');
      return;
    }
    
    const dish = {
      ...newDish,
      id: dishes.length + 1,
      images: [
        newDish.images[0] || 'https://via.placeholder.com/150?text=Dish+1',
        newDish.images[1] || 'https://via.placeholder.com/150?text=Dish+2'
      ]
    };
    
    setDishes([...dishes, dish]);
    setNewDish({
      name: '',
      category: 'DailyCrave',
      type: 'veg',
      price: '',
      note: '',
      prepTime: '',
      images: ['', '']
    });
  };

  const translations = {
    english: {
      title: 'My Kitchen',
      addDish: 'Add Dish',
      dishName: 'Dish Name',
      category: 'Category',
      type: 'Type',
      veg: 'Vegetarian',
      nonVeg: 'Non-Vegetarian',
      egg: 'Contains Egg',
      price: 'Price (₹)',
      note: 'Note',
      prepTime: 'Preparation Time',
      image1: 'Photo 1 of Dish',
      image2: 'Photo 2 of Dish',
      recordNote: 'Record Note',
      currentDishes: 'Your Dishes',
      save: 'Save',
      clear: 'Clear',
      languageToggle: 'हिंदी में बदलें'
    },
    hindi: {
      title: 'मेरी रसोई',
      addDish: 'पकवान जोड़ें',
      dishName: 'पकवान का नाम',
      category: 'श्रेणी',
      type: 'प्रकार',
      veg: 'शाकाहारी',
      nonVeg: 'मांसाहारी',
      egg: 'अंडा सहित',
      price: 'कीमत (₹)',
      note: 'नोट',
      prepTime: 'बनाने का समय',
      image1: 'पकवान की तस्वीर 1',
      image2: 'पकवान की तस्वीर 2',
      recordNote: 'नोट रिकॉर्ड करें',
      currentDishes: 'आपके पकवान',
      save: 'सहेजें',
      clear: 'साफ़ करें',
      languageToggle: 'Switch to English'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 font-simple">
      {/* Simple Header */}
      <div className="bg-green-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <button 
            onClick={toggleLanguage}
            className="bg-white text-green-600 px-3 py-1 rounded-md text-sm font-medium"
          >
            {t.languageToggle}
          </button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Add Dish Form - Simple Card */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.addDish}</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.dishName}</label>
              <input
                type="text"
                value={newDish.name}
                onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={language === 'english' ? 'e.g. Dal Khichdi' : 'जैसे दाल खिचड़ी'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.category}</label>
              <select
                value={newDish.category}
                onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name} - {language === 'english' ? cat.desc : 
                      cat.name === 'PowerFuel' ? 'फिटनेस के लिए प्रोटीन भरा भोजन' :
                      cat.name === 'VitalBite' ? 'पौष्टिक, स्वस्थ भोजन' :
                      cat.name === 'HealSpoon' ? 'बीमारी में हल्का भोजन' : 'रोज़मर्रा का आरामदायक भोजन'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.type}</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="veg"
                    checked={newDish.type === 'veg'}
                    onChange={() => setNewDish({...newDish, type: 'veg'})}
                    className="h-4 w-4 text-green-500"
                  />
                  <span className="ml-2">{t.veg}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="non-veg"
                    checked={newDish.type === 'non-veg'}
                    onChange={() => setNewDish({...newDish, type: 'non-veg'})}
                    className="h-4 w-4 text-green-500"
                  />
                  <span className="ml-2">{t.nonVeg}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="egg"
                    checked={newDish.type === 'egg'}
                    onChange={() => setNewDish({...newDish, type: 'egg'})}
                    className="h-4 w-4 text-green-500"
                  />
                  <span className="ml-2">{t.egg}</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.price}</label>
                <input
                  type="text"
                  value={newDish.price}
                  onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="₹"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.prepTime}</label>
                <input
                  type="text"
                  value={newDish.prepTime}
                  onChange={(e) => setNewDish({...newDish, prepTime: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={language === 'english' ? 'e.g. 30 mins' : 'जैसे 30 मिनट'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.note}</label>
              <div className="flex">
                <input
                  type="text"
                  value={newDish.note}
                  onChange={(e) => setNewDish({...newDish, note: e.target.value})}
                  className="flex-1 p-2 border border-gray-300 rounded-l-md"
                  placeholder={language === 'english' ? 'Any special notes...' : 'कोई विशेष नोट...'}
                />
                <button
                  onClick={startRecording}
                  className={`px-3 bg-green-500 text-white rounded-r-md ${isRecording ? 'animate-pulse' : ''}`}
                >
                  {isRecording ? '...' : '🎤'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.image1}</label>
                <input
                type="text"
                value={newDish.images[0]}
                onChange={(e) => setNewDish({...newDish, images: [e.target.value, newDish.images[1]]})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={language === 'english' ? 'Paste image URL' : 'छवि URL पेस्ट करें'}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.image2}</label>
                <input
                type="text"
                value={newDish.images[1]}
                onChange={(e) => setNewDish({...newDish, images: [newDish.images[0], e.target.value]})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={language === 'english' ? 'Paste image URL' : 'छवि URL पेस्ट करें'}
                />
            </div>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setNewDish({
                  name: '',
                  category: 'DailyCrave',
                  type: 'veg',
                  price: '',
                  note: '',
                  prepTime: '',
                  images: ['', '']
                })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                {t.clear}
              </button>
              <button
                onClick={handleAddDish}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>

        {/* Current Dishes - Simple List */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.currentDishes}</h2>
          
          {dishes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              {language === 'english' ? 'No dishes added yet' : 'अभी तक कोई पकवान नहीं जोड़ा गया'}
            </p>
          ) : (
            <div className="space-y-4">
              {dishes.map(dish => (
                <div key={dish.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Dish Images */}
                    <div className="flex space-x-2">
                      {dish.images.map((img, idx) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt={dish.name} 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ))}
                    </div>
                    
                    {/* Dish Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{dish.name}</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-1">
                        <div>
                          <span className="text-gray-500">{t.category}: </span>
                          <span>{dish.category}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">{t.type}: </span>
                          <span className={`font-medium ${
                            dish.type === 'veg' ? 'text-green-600' : 
                            dish.type === 'non-veg' ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {dish.type === 'veg' ? t.veg : dish.type === 'non-veg' ? t.nonVeg : t.egg}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">{t.price}: </span>
                          <span className="font-medium">{dish.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">{t.prepTime}: </span>
                          <span>{dish.prepTime}</span>
                        </div>
                      </div>
                      {dish.note && (
                        <div className="mt-1">
                          <span className="text-gray-500">{t.note}: </span>
                          <span className="italic">{dish.note}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Simple Footer */}
      <div className="bg-gray-100 p-4 mt-8 text-center text-sm text-gray-600">
        {language === 'english' 
          ? 'Need help? Call us at 9876543210' 
          : 'मदद चाहिए? हमें 9876543210 पर कॉल करें'}
      </div>
    </div>
  );
}

export default ChefDashboard;