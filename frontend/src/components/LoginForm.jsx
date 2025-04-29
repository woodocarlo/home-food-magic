import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

function LoginForm({ role, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaValue) {
      setError('Please verify you are not a robot.');
      return;
    }

    // Check credentials based on role
    if (role === 'chef') {
      if (username !== 'chahat_1' || password !== '1234') {
        setError('Invalid username or password');
        return;
      }
    } else if (role === 'food') {
      if (username !== 'yashika_04' || password !== '1234') {
        setError('Invalid username or password');
        return;
      }
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login submitted:', { role, username, password });
      if (role === 'food') {
        navigate('/order-food');
      } else if (role === 'chef') {
        navigate('/chef-dashboard');
      }
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const colorConfig = {
    food: {
      border: 'border-orange-400',
      focus: 'focus:ring-orange-400 focus:border-orange-400',
      button: 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600'
    },
    chef: {
      border: 'border-green-500',
      focus: 'focus:ring-green-500 focus:border-green-500',
      button: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
    }
  };
  
  const colors = colorConfig[role] || colorConfig.food;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}
      
      <div className="relative">
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError('');
          }}
          className={`peer mt-1 block w-full px-3 py-2 border ${colors.border} rounded-lg shadow-sm focus:outline-none ${colors.focus} transition-all placeholder-transparent`}
          placeholder=" "
          required
        />
        <label 
          htmlFor="username" 
          className="absolute left-2 -top-2.5 bg-white px-1 text-xs font-medium text-gray-700 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-gray-700 peer-focus:text-xs transition-all"
        >
          Username
        </label>
      </div>
      
      <div className="relative">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          className={`peer mt-1 block w-full px-3 py-2 border ${colors.border} rounded-lg shadow-sm focus:outline-none ${colors.focus} transition-all placeholder-transparent`}
          placeholder=" "
          required
        />
        <label 
          htmlFor="password" 
          className="absolute left-2 -top-2.5 bg-white px-1 text-xs font-medium text-gray-700 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-gray-700 peer-focus:text-xs transition-all"
        >
          Password
        </label>
      </div>

      <div className="flex justify-center">
        <div className="scale-90 transform origin-center">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={(value) => {
              setRecaptchaValue(value);
              setError('');
            }}
            size="normal"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded-lg font-semibold text-white ${colors.button} transition-all shadow-lg flex items-center justify-center transform hover:-translate-y-1 ${isLoading ? 'opacity-75' : ''}`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
          </>
        ) : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;