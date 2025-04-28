import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import AboutAppDetails from './components/AboutAppDetails';
import SignupContact from './components/SignupContact';
import Footer from './components/Footer';
import OrderFood from './components/OrderFood';
import CategoryPage from './components/CategoryPage';
import ChefDashboard from './components/ChefDashboard';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';

// Create CartContext
export const CartContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, showCart, setShowCart }}>
      <Router>
        <div className="min-h-screen bg-gray-50 font-poppins">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <HowItWorks />
                  <Testimonials />
                  <AboutAppDetails />
                  <SignupContact />
                  <Footer />
                </>
              }
            />
            <Route path="/order-food" element={<OrderFood />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/chef-dashboard" element={<ChefDashboard />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </div>
      </Router>
    </CartContext.Provider>
  );
}

export default App;