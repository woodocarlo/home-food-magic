import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import AboutAppDetails from './components/AboutAppDetails';
import AboutApplication from './components/AboutApplication';
import SignupContact from './components/SignupContact';
import Footer from './components/Footer';
import OrderFood from './components/OrderFood';

function App() {
  return (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;