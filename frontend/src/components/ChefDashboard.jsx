import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ChefDashboard() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');
  const [isRecording, setIsRecording] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false); // State for loading custom requests
  const [customRequests, setCustomRequests] = useState([]); // Initially empty
  const [inviteDetails, setInviteDetails] = useState({
    mealType: 'Breakfast',
    date: '',
    time: ''
  });
  const [donationDetails, setDonationDetails] = useState({
    foodType: '',
    quantity: '',
    description: '',
    pickupTime: ''
  });
  const [profileDetails, setProfileDetails] = useState({
    kitchenName: 'Spicy Delights Kitchen',
    type: 'Spicy',
    dietary: 'Non-Veg',
    distance: '1.8 km',
    slots: '4',
    description: 'Fiery masala curries and street-style chaat to spice up your day',
    pricingWeek: '₹480',
    pricingMonth: '₹1700'
  });
  const [students, setStudents] = useState([
    { id: 1, name: 'Amit Sharma', acceptedToday: true, inviteSent: false },
    { id: 2, name: 'Priya Patel', acceptedToday: false, inviteSent: false },
    { id: 3, name: 'Rahul Verma', acceptedToday: true, inviteSent: false },
    { id: 4, name: 'Sneha Gupta', acceptedToday: false, inviteSent: false }
  ]);
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

  // Handle Escape key to trigger loading and show custom requests
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && !isLoadingRequests && customRequests.length === 0) {
        setIsLoadingRequests(true);
        setTimeout(() => {
          setCustomRequests([
            {
              id: 1,
              requestType: 'Dish',
              orderType: 'Pickup',
              date: '01-05-2025',
              time: '16:10',
              dishes: [
                {
                  dishName: 'Pasta',
                  cuisine: 'Italian',
                  dietType: 'Vegetarian',
                  quantity: '3',
                  quantityUnit: 'people',
                  description: 'White sauce pasta with extra chilli flakes and oregano, make it a bit spicy and thick',
                  cookingInstructions: 'None'
                }
              ],
              photos: [],
              status: 'pending'
            }
          ]);
          setIsLoadingRequests(false);
        }, 1500); // 1.5-second loading animation
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isLoadingRequests, customRequests]);

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  const startRecording = () => {
    setIsRecording(true);
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

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert(language === 'english' ? 'Please upload an image file' : 'कृपया एक छवि फ़ाइल अपलोड करें');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(language === 'english' ? 'Image size should be less than 5MB' : 'छवि का आकार 5MB से कम होना चाहिए');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...newDish.images];
        updatedImages[index] = reader.result;
        setNewDish({...newDish, images: updatedImages});
      };
      reader.readAsDataURL(file);
    }
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

  const handleInviteClick = (student) => {
    setSelectedStudent(student);
    setShowInvitePopup(true);
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteDetails.mealType || !inviteDetails.date || !inviteDetails.time) {
      alert(language === 'english' ? 'Please fill all invite details' : 'कृपया सभी निमंत्रण विवरण भरें');
      return;
    }
    setStudents(students.map(student => 
      student.id === selectedStudent.id ? { ...student, inviteSent: true } : student
    ));
    setShowInvitePopup(false);
    setInviteDetails({ mealType: 'Breakfast', date: '', time: '' });
    alert(language === 'english' ? `Invite sent to ${selectedStudent.name}!` : `${selectedStudent.name} को निमंत्रण भेजा गया!`);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (!donationDetails.foodType || !donationDetails.quantity) {
      alert(language === 'english' ? 'Please fill all required fields for donation' : 'कृपया दान के लिए सभी आवश्यक फील्ड भरें');
      return;
    }
    setShowDonationForm(false);
    alert(language === 'english' ? 'Donation submitted!' : 'दान सबमिट किया गया!');
    setDonationDetails({
      foodType: '',
      quantity: '',
      description: '',
      pickupTime: ''
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert(language === 'english' ? 'Profile updated!' : 'प्रोफाइल अपडेट किया गया!');
    setShowProfileDropdown(false);
  };

  const handleAcceptRequest = (requestId) => {
    setCustomRequests(customRequests.map(request =>
      request.id === requestId ? { ...request, status: 'accepted' } : request
    ));
    alert(language === 'english' ? 'Request accepted!' : 'अनुरोध स्वीकार किया गया!');
  };

  const handleRejectRequest = (requestId) => {
    setCustomRequests(customRequests.map(request =>
      request.id === requestId ? { ...request, status: 'rejected' } : request
    ));
    alert(language === 'english' ? 'Request rejected!' : 'अनुरोध अस्वीकार किया गया!');
  };

  const translations = {
    english: {
      title: 'HFM | My Kitchen',
      addDish: 'Add Dish',
      dishName: 'Dish Name',
      category: 'Category',
      type: 'Type',
      veg: 'Vegetarian',
      nonVeg: 'Non-Vegetarian',
      egg: 'Contains Egg',
      price: 'Price (₹)',
      note: 'Note',
      prepTime: 'Time of Preparation',
      image1: 'Photo 1 of Dish',
      image2: 'Photo 2 of Dish',
      uploadImage1: 'Upload Photo 1',
      uploadImage2: 'Upload Photo 2',
      recordNote: 'Record Note',
      connectedStudents: 'Connected Students',
      donateNGO: 'Donate to NGO',
      foodType: 'Food Type',
      quantity: 'Quantity',
      description: 'Description',
      pickupTime: 'Pickup Time',
      customRequests: 'Custom Requests',
      save: 'Save',
      clear: 'Clear',
      submitDonation: 'Submit Donation',
      cancel: 'Cancel',
      invite: 'Invite for Dine-In',
      mealType: 'Meal Type',
      date: 'Date',
      time: 'Time',
      submitInvite: 'Send Invite',
      profile: 'Profile',
      kitchenName: 'Kitchen Name',
      dietary: 'Dietary',
      distance: 'Distance',
      slots: 'Slots',
      pricingWeek: '1 Week Price',
      pricingMonth: '1 Month Price',
      noOneHere: 'No one here',
      updateProfile: 'Update Profile',
      languageToggle: 'हिंदी में बदलें',
      accept: 'Accept',
      reject: 'Reject',
      loadingRequests: 'Loading requests...'
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
      uploadImage1: 'तस्वीर 1 अपलोड करें',
      uploadImage2: 'तस्वीर 2 अपलोड करें',
      recordNote: 'नोट रिकॉर्ड करें',
      connectedStudents: 'जुड़े हुए छात्र',
      donateNGO: 'एनजीओ को दान करें',
      foodType: 'भोजन का प्रकार',
      quantity: 'मात्रा',
      description: 'विवरण',
      pickupTime: 'पिकअप समय',
      customRequests: 'कस्टम अनुरोध',
      save: 'सहेजें',
      clear: 'साफ़ करें',
      submitDonation: 'दान सबमिट करें',
      cancel: 'रद्द करें',
      invite: 'डाइन-इन के लिए आमंत्रित करें',
      mealType: 'भोजन का प्रकार',
      date: 'तारीख',
      time: 'समय',
      submitInvite: 'निमंत्रण भेजें',
      profile: 'प्रोफाइल',
      kitchenName: 'रसोई का नाम',
      dietary: 'आहार',
      distance: 'दूरी',
      slots: 'स्लॉट्स',
      pricingWeek: '1 सप्ताह की कीमत',
      pricingMonth: '1 महीने की कीमत',
      noOneHere: 'यहाँ कोई नहीं',
      updateProfile: 'प्रोफाइल अपडेट करें',
      languageToggle: 'Switch to English',
      accept: 'स्वीकार करें',
      reject: 'अस्वीकार करें',
      loadingRequests: 'अनुरोध लोड हो रहे हैं...'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 font-simple">
      {/* Simple Header */}
      <div className="bg-green-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <div className="flex space-x-2 relative">
            <button 
              onClick={toggleLanguage}
              className="bg-white text-green-600 px-3 py-1 rounded-md text-sm font-medium"
            >
              {t.languageToggle}
            </button>
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="bg-white text-green-600 px-3 py-1 rounded-md text-sm font-medium"
            >
              {t.profile}
            </button>
            {showProfileDropdown && (
              <div className="absolute top-10 right-0 bg-white rounded-lg shadow-xl p-4 w-80 z-50">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">{t.profile}</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.kitchenName}</label>
                    <input
                      type="text"
                      value={profileDetails.kitchenName}
                      onChange={(e) => setProfileDetails({...profileDetails, kitchenName: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      placeholder={language === 'english' ? 'e.g. Spicy Delights' : 'जैसे मसालेदार रसोई'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.type}</label>
                    <input
                      type="text"
                      value={profileDetails.type}
                      onChange={(e) => setProfileDetails({...profileDetails, type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      placeholder={language === 'english' ? 'e.g. Spicy' : 'जैसे मसालेदार'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.dietary}</label>
                    <input
                      type="text"
                      value={profileDetails.dietary}
                      onChange={(e) => setProfileDetails({...profileDetails, dietary: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      placeholder={language === 'english' ? 'e.g. Non-Veg' : 'जैसे मांसाहारी'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.distance}</label>
                    <input
                      type="text"
                      value={profileDetails.distance}
                      onChange={(e) => setProfileDetails({...profileDetails, distance: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      placeholder={language === 'english' ? 'e.g. 1.8 km' : 'जैसे 1.8 किमी'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.slots}</label>
                    <input
                      type="text"
                      value={profileDetails.slots}
                      onChange={(e) => setProfileDetails({...profileDetails, slots: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      placeholder={language === 'english' ? 'e.g. 4' : 'जैसे 4'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.description}</label>
                    <textarea
                      value={profileDetails.description}
                      onChange={(e) => setProfileDetails({...profileDetails, description: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      placeholder={language === 'english' ? 'e.g. Fiery curries...' : 'जैसे मसालेदार करी...'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.pricingWeek}</label>
                    <input
                      type="text"
                      value={profileDetails.pricingWeek}
                      onChange={(e) => setProfileDetails({...profileDetails, pricingWeek: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      placeholder={language === 'english' ? 'e.g. ₹480' : 'जैसे ₹480'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.pricingMonth}</label>
                    <input
                      type="text"
                      value={profileDetails.pricingMonth}
                      onChange={(e) => setProfileDetails({...profileDetails, pricingMonth: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      placeholder={language === 'english' ? 'e.g. ₹1700' : 'जैसे ₹1700'}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowProfileDropdown(false)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                    >
                      {t.updateProfile}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
        {/* Left Partition - Connected Students */}
        <div className="w-full md:w-1/4 bg-green-100 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.connectedStudents}</h2>
          <div className="space-y-2">
            {students.map(student => (
              <div key={student.id} className="bg-white rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm">{student.name}</span>
                  {student.acceptedToday && (
                    <span className="ml-2 text-green-500">✔</span>
                  )}
                </div>
                <button
                  onClick={() => handleInviteClick(student)}
                  disabled={student.inviteSent}
                  className={`px-2 py-1 rounded-md text-sm ${
                    student.inviteSent 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {student.inviteSent ? 'Invited' : '+ Invite'}
                </button>
              </div>
            ))}
            {[5, 6].map(id => (
              <div key={id} className="bg-white rounded-md p-2 flex flex-col items-center justify-center">
                <span className="text-sm text-gray-400">{t.noOneHere}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 flex flex-col gap-4">
          {/* Add Dish Form */}
          <div className="bg-white rounded-lg shadow-md p-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.uploadImage1}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(0, e)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {newDish.images[0] && (
                    <img 
                      src={newDish.images[0]} 
                      alt="Dish Preview 1" 
                      className="mt-2 w-24 h-24 object-cover rounded-md"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.uploadImage2}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(1, e)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {newDish.images[1] && (
                    <img 
                      src={newDish.images[1]} 
                      alt="Dish Preview 2" 
                      className="mt-2 w-24 h-24 object-cover rounded-md"
                    />
                  )}
                </div>
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
                    {isRecording ? '...' : '\uD83C\uDFA4'}
                  </button>
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

          {/* Donate to NGO Button */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <button
              onClick={() => setShowDonationForm(true)}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {t.donateNGO}
            </button>
          </div>

          {/* Custom Requests */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.customRequests}</h2>
            {isLoadingRequests ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mb-2"></div>
                <p className="text-gray-500 text-sm">{t.loadingRequests}</p>
              </div>
            ) : customRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                {language === 'english' ? 'No custom requests yet' : 'अभी तक कोई कस्टम अनुरोध नहीं'}
              </p>
            ) : (
              <div className="space-y-4">
                {customRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm">
                    <h3 className="font-semibold text-lg text-gray-800">{request.requestType}</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-1">
                      <div>
                        <span className="text-gray-500">Order Type: </span>
                        <span>{request.orderType}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Date: </span>
                        <span>{request.date}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Time: </span>
                        <span>{request.time}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-500">Dishes: </span>
                      {request.dishes.map((dish, dishIndex) => (
                        <div key={dishIndex} className="ml-4">
                          <div><strong>Dish {dishIndex + 1}:</strong> {dish.dishName}</div>
                          <div>Cuisine: {dish.cuisine}</div>
                          <div>Diet Type: {dish.dietType}</div>
                          <div>Quantity: {dish.quantity} {dish.quantityUnit}</div>
                          <div>Description: {dish.description}</div>
                          <div>Cooking Instructions: {dish.cookingInstructions}</div>
                        </div>
                      ))}
                    </div>
                    {request.photos.some(photo => photo) && (
                      <div className="mt-2 flex space-x-2">
                        {request.photos.map((photo, idx) => (
                          photo && (
                            <img 
                              key={idx} 
                              src={photo.preview} 
                              alt={`Request photo ${idx + 1}`} 
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )
                        ))}
                      </div>
                    )}
                    {request.status === 'pending' && (
                      <div className="mt-3 flex justify-end space-x-2">
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transform transition-transform hover:scale-105"
                        >
                          {t.accept}
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transform transition-transform hover:scale-105"
                        >
                          {t.reject}
                        </button>
                      </div>
                    )}
                    {request.status === 'accepted' && (
                      <div className="mt-3 text-green-600 text-sm font-semibold">
                        {language === 'english' ? 'Request Accepted' : 'अनुरोध स्वीकार किया गया'}
                      </div>
                    )}
                    {request.status === 'rejected' && (
                      <div className="mt-3 text-red-600 text-sm font-semibold">
                        {language === 'english' ? 'Request Rejected' : 'अनुरोध अस्वीकार किया गया'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.donateNGO}</h2>
            <form onSubmit={handleDonationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.foodType}</label>
                <input
                  type="text"
                  value={donationDetails.foodType}
                  onChange={(e) => setDonationDetails({...donationDetails, foodType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={language === 'english' ? 'e.g. Rice, Dal' : 'जैसे चावल, दाल'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.quantity}</label>
                <input
                  type="text"
                  value={donationDetails.quantity}
                  onChange={(e) => setDonationDetails({...donationDetails, quantity: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={language === 'english' ? 'e.g. 5 kg' : 'जैसे 5 किलो'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                <textarea
                  value={donationDetails.description}
                  onChange={(e) => setDonationDetails({...donationDetails, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={language === 'english' ? 'Any details...' : 'कोई विवरण...'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.pickupTime}</label>
                <input
                  type="datetime-local"
                  value={donationDetails.pickupTime}
                  onChange={(e) => setDonationDetails({...donationDetails, pickupTime: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowDonationForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  {t.submitDonation}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invite Popup */}
      {showInvitePopup && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {language === 'english' 
                ? `Invite ${selectedStudent.name} for Dine-In` 
                : `${selectedStudent.name} को डाइन-इन के लिए आमंत्रित करें`}
            </h2>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.mealType}</label>
                <select
                  value={inviteDetails.mealType}
                  onChange={(e) => setInviteDetails({...inviteDetails, mealType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Breakfast">{language === 'english' ? 'Breakfast' : 'नाश्ता'}</option>
                  <option value="Lunch">{language === 'english' ? 'Lunch' : 'दोपहर का भोजन'}</option>
                  <option value="Dinner">{language === 'english' ? 'Dinner' : 'रात का भोजन'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.date}</label>
                <input
                  type="date"
                  value={inviteDetails.date}
                  onChange={(e) => setInviteDetails({...inviteDetails, date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.time}</label>
                <input
                  type="time"
                  value={inviteDetails.time}
                  onChange={(e) => setInviteDetails({...inviteDetails, time: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInvitePopup(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  {t.submitInvite}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple Footer */}
      <div className="bg-gray-100 p-4 mt-8 text-center text-sm text-gray-600">
        {language === 'english' 
          ? 'Need help? Call us at 9958330247' 
          : 'मदद चाहिए? हमें 9876543210 पर कॉल करें'}
      </div>
    </div>
  );
}

export default ChefDashboard;