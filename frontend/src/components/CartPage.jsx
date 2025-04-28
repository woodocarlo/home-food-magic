import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../App';

function CartPopup({ onClose }) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [deliveryOption, setDeliveryOption] = useState('Pickup');
  const [addressOption, setAddressOption] = useState('current');
  const [customAddress, setCustomAddress] = useState('');
  const [pincode, setPincode] = useState('122017');
  const [locationStatus, setLocationStatus] = useState('success');

  // Load Stripe Buy Button script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDetectLocation = () => {
    setLocationStatus('fetching');
    setTimeout(() => {
      setPincode('122017');
      setLocationStatus('success');
    }, 2000);
  };

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const deliveryCharge = deliveryOption === 'Delivery' ? 20 : 0;
  const gst = (subtotal + deliveryCharge) * 0.09; // 9% GST
  const total = subtotal + deliveryCharge + gst;

  // Remove item from cart
  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update item quantity
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FFE0B2] rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#963f28] text-white p-4 rounded-t-2xl flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onClose(); // Call the onClose function
            }}
            className="text-white hover:text-[#f5b110] text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#963f28] text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#f5b110] text-white rounded-lg hover:bg-[#c3015a] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Location Section */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[#963f28] font-semibold">Delivery Location</h3>
                  <span className="text-sm bg-[#f5b110] text-white px-2 py-1 rounded">
                    {pincode}
                  </span>
                </div>
                <button
                  onClick={handleDetectLocation}
                  disabled={locationStatus === 'fetching'}
                  className="text-sm text-[#c3015a] hover:text-[#963f28] flex items-center gap-1"
                >
                  {locationStatus === 'fetching' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Detecting...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Detect My Location
                    </>
                  )}
                </button>
              </div>

              {/* Order Preferences */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold text-[#963f28] mb-3">Order Preferences</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-[#963f28]">
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
                    <label className="flex items-center gap-2 text-[#963f28]">
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
                  {deliveryOption === 'Delivery' && (
                    <div className="space-y-2">
                      <p className="text-[#963f28] font-semibold">Delivery Address:</p>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[#963f28]">
                          <input
                            type="radio"
                            name="addressOption"
                            value="current"
                            checked={addressOption === 'current'}
                            onChange={() => setAddressOption('current')}
                            className="text-[#f5b110]"
                          />
                          Current Address
                        </label>
                        <label className="flex items-center gap-2 text-[#963f28]">
                          <input
                            type="radio"
                            name="addressOption"
                            value="custom"
                            checked={addressOption === 'custom'}
                            onChange={() => setAddressOption('custom')}
                            className="text-[#f5b110]"
                          />
                          Custom Address
                        </label>
                        {addressOption === 'custom' && (
                          <input
                            type="text"
                            value={customAddress}
                            onChange={(e) => setCustomAddress(e.target.value)}
                            placeholder="Enter delivery address"
                            className="p-2 rounded border w-full text-sm"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cart Items */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold text-[#963f28] mb-3">Your Items</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="text-[#963f28] font-semibold">{item.name}</p>
                          <p className="text-[#c3015a] text-sm">₹{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-[#f5b110] text-white rounded-full flex items-center justify-center hover:bg-[#bb0718]"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-[#f5b110] text-white rounded-full flex items-center justify-center hover:bg-[#bb0718]"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-[#c3015a] hover:text-[#bb0718] ml-2"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold text-[#963f28] mb-3">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#963f28]">Subtotal</span>
                    <span className="text-[#963f28]">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {deliveryOption === 'Delivery' && (
                    <div className="flex justify-between">
                      <span className="text-[#963f28]">Delivery Charge</span>
                      <span className="text-[#963f28]">₹{deliveryCharge.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#963f28]">GST (9%)</span>
                    <span className="text-[#963f28]">₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2 mt-2">
                    <span className="text-[#963f28]">Total</span>
                    <span className="text-[#963f28]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="flex justify-center">
                <stripe-buy-button
                  buy-button-id="buy_btn_1RIpY9PD1Vz5JCDZDyzC9f1w"
                  publishable-key="pk_test_51RIpGrPD1Vz5JCDZWik5WFnRQfCNzzOxZ3inrYlGp9it0Ev86VgHAUu57pD6QMSvfDpzGpmNi4eP8HkqZu20M5KW00CvMeB6BD"
                ></stripe-buy-button>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white p-4 rounded-lg shadow text-sm">
                <h2 className="text-lg font-bold text-[#963f28] mb-2">Terms</h2>
                <ul className="list-disc pl-5 space-y-1 text-[#963f28]">
                  <li>Orders cannot be modified once confirmed</li>
                  <li>Delivery times are estimates</li>
                  <li>Complete payment before processing</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPopup;