import { useLocation, useNavigate } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { subscription, duration } = state || {};

  const handlePayment = () => {
    if (subscription && duration) {
      console.log(`Processing payment for ${subscription.name} - ${duration}`);
    }
    navigate('/order-food');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-[#c3015a] mb-4">Complete Your Subscription</h1>
        {subscription && duration ? (
          <>
            <p className="text-lg text-gray-700 mb-2">Plan: {subscription.name}</p>
            <p className="text-lg text-gray-700 mb-2">Duration: {duration}</p>
            <p className="text-lg text-gray-700 mb-4">
              Price: ₹{duration === '1 Week' ? subscription.weekPrice : subscription.monthPrice}
            </p>
            <button
              onClick={handlePayment}
              className="bg-[#f5b110] text-white px-6 py-2 rounded-full hover:bg-[#bb0718] transition-colors"
            >
              Proceed to Payment
            </button>
          </>
        ) : (
          <p className="text-lg text-gray-700 mb-4">No subscription selected.</p>
        )}
        <button
          onClick={() => navigate('/order-food')}
          className="mt-4 text-[#c3015a] hover:text-[#bb0718] transition-colors"
        >
          Back to Order
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;