import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SubscriptionsPopup({ onClose }) {
  const navigate = useNavigate();
  const [hoveredTile, setHoveredTile] = useState(null);

  const subscriptions = [
    {
      id: 1,
      name: 'Auntie Sunita’s Kitchen',
      weekPrice: 500,
      monthPrice: 1800,
      type: 'Health-Conscious',
      dietary: 'Vegan',
      distance: '2.0 km',
      slotsLeft: 4,
      description: 'Low-oil salads, millet rotis, and steamed veggies for a balanced diet.',
      image: 'https://i.postimg.cc/T3vKSqMs/6.jpg',
    },
    {
      id: 2,
      name: 'Rekha’s Homestyle Meals',
      weekPrice: 450,
      monthPrice: 1600,
      type: 'Homestyle',
      dietary: 'Veg',
      distance: '3.5 km',
      slotsLeft: 6,
      description: 'Comforting dal, sabzi, and fresh rotis, just like home.',
      image: 'https://i.postimg.cc/WtL1BjKZ/8.jpg',
    },
    {
      id: 3,
      name: 'Poonam’s Spicy Delights',
      weekPrice: 480,
      monthPrice: 1700,
      type: 'Spicy',
      dietary: 'Non-Veg',
      distance: '1.8 km',
      slotsLeft: 3,
      description: 'Fiery masala curries and street-style chaat to spice up your day.',
      image: 'https://i.postimg.cc/SKbXzLx4/crousel.jpg',
    },
    {
      id: 4,
      name: 'Anita’s Punjabi Thali',
      weekPrice: 520,
      monthPrice: 1900,
      type: 'Regional',
      dietary: 'Non-Veg',
      distance: '4.0 km',
      slotsLeft: 5,
      description: 'Authentic Punjabi dishes like butter chicken and sarson ka saag.',
      image: 'https://i.postimg.cc/1tYJ5q0z/diary-bg.png',
    },
    {
      id: 5,
      name: 'Latha’s South Indian Feast',
      weekPrice: 460,
      monthPrice: 1650,
      type: 'Regional',
      dietary: 'Veg',
      distance: '2.8 km',
      slotsLeft: 4,
      description: 'Crispy dosas, idlis, and tangy sambar from a South Indian home.',
      image: 'https://i.postimg.cc/Xqyv1X23/7.jpg',
    },
    {
      id: 6,
      name: 'Kavita’s Healthy Bites',
      weekPrice: 510,
      monthPrice: 1850,
      type: 'Health-Conscious',
      dietary: 'Vegan',
      distance: '3.2 km',
      slotsLeft: 5,
      description: 'Quinoa bowls, grilled veggies, and low-carb meals for fitness lovers.',
      image: 'https://i.postimg.cc/T3vKSqMs/6.jpg',
    },
    {
      id: 7,
      name: 'Meena’s Gujarati Thali',
      weekPrice: 470,
      monthPrice: 1750,
      type: 'Regional',
      dietary: 'Veg',
      distance: '2.5 km',
      slotsLeft: 6,
      description: 'Sweet-savory Gujarati dishes like dhokla, thepla, and undhiyu.',
      image: 'https://i.postimg.cc/WtL1BjKZ/8.jpg',
    },
    {
      id: 8,
      name: 'Shreya’s Bengali Kitchen',
      weekPrice: 490,
      monthPrice: 1800,
      type: 'Regional',
      dietary: 'Non-Veg',
      distance: '2.3 km',
      slotsLeft: 3,
      description: 'Bengali favorites like veggie bhajas, fish curry, and mishti.',
      image: 'https://i.postimg.cc/SKbXzLx4/crousel.jpg',
    },
    {
      id: 9,
      name: 'Rani’s Spicy Homecooking',
      weekPrice: 480,
      monthPrice: 1700,
      type: 'Spicy',
      dietary: 'Egg',
      distance: '3.7 km',
      slotsLeft: 4,
      description: 'Bold, spicy curries and tandoori snacks with occasional egg options.',
      image: 'https://i.postimg.cc/Xqyv1X23/7.jpg',
    },
    {
      id: 10,
      name: 'Suman’s Homestyle Comfort',
      weekPrice: 460,
      monthPrice: 1650,
      type: 'Homestyle',
      dietary: 'Veg',
      distance: '2.7 km',
      slotsLeft: 5,
      description: 'Simple, hearty meals with dal, rice, and seasonal sabzi.',
      image: 'https://i.postimg.cc/1tYJ5q0z/diary-bg.png',
    },
  ];

  const getDietaryLabel = (dietary) => {
    switch (dietary) {
      case 'Veg':
        return <span className="text-green-600 font-semibold">Veg</span>;
      case 'Non-Veg':
        return <span className="text-red-600 font-semibold">Non-Veg</span>;
      case 'Vegan':
        return <span className="text-blue-600 font-semibold">Vegan</span>;
      case 'Egg':
        return <span className="text-yellow-600 font-semibold">Egg</span>;
      default:
        return <span className="text-gray-600 font-semibold">Unknown</span>;
    }
  };

  const getSmallViewDietary = (dietary) => {
    return dietary === 'Veg' || dietary === 'Vegan' ? 'Veg' : 'Non-Veg';
  };

  const handleSubscribe = (subscription, duration) => {
    console.log(`Subscribed to ${subscription.name} for ${duration}`);
    navigate('/payment', { state: { subscription, duration } });
  };

  // Helper to determine tile position in 2x5 grid
  const getTilePosition = (index) => {
    const row = Math.floor(index / 5) + 1; // Row 1 or 2
    const col = (index % 5) + 1; // Col 1 to 5
    return { row, col };
  };

  // Helper to calculate transforms and transform-origin for tiles
  const getTransform = (index, hoveredIndex) => {
    if (index === hoveredIndex) {
      const { row, col } = getTilePosition(index);
      // Corner tiles: Adjust expansion with transform-origin and translation
      if (row === 1 && col === 1) {
        // Top-left: Expand right/down
        return { transform: 'translateX(80px) translateY(80px)', transformOrigin: 'top left' };
      }
      if (row === 1 && col === 5) {
        // Top-right: Expand left/down
        return { transform: 'translateX(-80px) translateY(80px)', transformOrigin: 'top right' };
      }
      if (row === 2 && col === 1) {
        // Bottom-left: Expand right/up
        return { transform: 'translateX(80px) translateY(-80px)', transformOrigin: 'bottom left' };
      }
      if (row === 2 && col === 5) {
        // Bottom-right: Expand left/up
        return { transform: 'translateX(-80px) translateY(-80px)', transformOrigin: 'bottom right' };
      }
      // Edge tiles (non-corners, col 1 or 5): Adjust to avoid left/right margins
      if (col === 1) {
        // Left edge: Expand right
        return { transform: 'translateX(80px)', transformOrigin: 'left center' };
      }
      if (col === 5) {
        // Right edge: Expand left
        return { transform: 'translateX(-80px)', transformOrigin: 'right center' };
      }
      // Non-edge tiles: Default centered expansion
      return { transform: '', transformOrigin: 'center center' };
    }

    const { row: currentRow, col: currentCol } = getTilePosition(index);
    const { row: hoveredRow, col: hoveredCol } = getTilePosition(hoveredIndex);

    // Adjacent tiles: Move diagonally
    if (currentRow === hoveredRow && Math.abs(currentCol - hoveredCol) === 1) {
      // Same row, adjacent column (left or right)
      const directionX = currentCol < hoveredCol ? -40 : 40; // Left: -40px, Right: +40px
      const directionY = currentRow === 1 ? -40 : 40; // Row 1: up, Row 2: down
      return { transform: `translateX(${directionX}px) translateY(${directionY}px) scale(0.9)`, transformOrigin: 'center center' };
    }
    if (currentCol === hoveredCol && Math.abs(currentRow - hoveredRow) === 1) {
      // Same column, adjacent row (above or below)
      const directionY = currentRow < hoveredRow ? -40 : 40; // Above: -40px, Below: +40px
      return { transform: `translateY(${directionY}px) scale(0.9)`, transformOrigin: 'center center' };
    }
    if (Math.abs(currentRow - hoveredRow) === 1 && Math.abs(currentCol - hoveredCol) === 1) {
      // Diagonal neighbors
      const directionX = currentCol < hoveredCol ? -40 : 40;
      const directionY = currentRow < hoveredRow ? -40 : 40;
      return { transform: `translateX(${directionX}px) translateY(${directionY}px) scale(0.9)`, transformOrigin: 'center center' };
    }

    // Non-adjacent tiles: Just shrink
    return { transform: 'scale(0.9)', transformOrigin: 'center center' };
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto p-12 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-[#c3015a] transition-colors"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#c3015a] text-center mb-10">Endless Home Cooked Love</h1>

        {/* Subscription Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative">
          {subscriptions.map((sub, index) => {
            const { transform, transformOrigin } = hoveredTile !== null ? getTransform(index, hoveredTile) : { transform: 'scale(1)', transformOrigin: 'center center' };
            return (
              <div
                key={sub.id}
                className={`relative flex flex-col items-center group transition-all duration-300 z-10`}
                style={{
                  transform,
                  transformOrigin,
                }}
                onMouseEnter={() => setHoveredTile(index)}
                onMouseLeave={() => setHoveredTile(null)}
              >
                {/* Tile (Circular in Default, Stadium Shape on Hover) */}
                <div
                  className={`relative overflow-hidden shadow-lg bg-cover bg-center transition-all duration-300 ${
                    hoveredTile === index
                      ? 'w-96 h-48 rounded-full z-20'
                      : 'w-32 h-32 rounded-full z-10'
                  }`}
                  style={{ backgroundImage: `url(${sub.image})` }}
                >
                  <div className={`absolute inset-0 ${hoveredTile === index ? 'bg-black/70' : 'bg-black/50'} flex flex-col items-center justify-center p-3`}>
                    {hoveredTile === index ? (
                      /* Expanded View */
                      <div className="flex flex-col items-center text-center h-full p-4">
                        <h4 className="text-lg font-bold text-white mb-2">{sub.name}</h4>
                        <div className="flex justify-between w-full text-sm text-white mb-1">
                          <p>
                            <span className="font-semibold">Type:</span> {sub.type}
                          </p>
                          <p>
                            <span className="font-semibold">Dietary:</span> {getDietaryLabel(sub.dietary)}
                          </p>
                        </div>
                        <div className="flex justify-between w-full text-sm text-white mb-2">
                          <p>
                            <span className="font-semibold">Distance:</span> {sub.distance}
                          </p>
                          <p>
                            <span className="font-semibold">Slots:</span> {sub.slotsLeft}
                          </p>
                        </div>
                        <p className="text-xs text-white mb-3 line-clamp-2 flex-1">{sub.description}</p>
                        <div className="flex justify-between gap-2 w-full">
                          <button
                            onClick={() => handleSubscribe(sub, '1 Week')}
                            className="flex-1 bg-[#f5b110] text-white px-3 py-1 rounded-full hover:bg-[#bb0718] transition-colors text-xs"
                          >
                            1 Week (₹{sub.weekPrice})
                          </button>
                          <button
                            onClick={() => handleSubscribe(sub, '1 Month')}
                            className="flex-1 bg-[#c3015a] text-white px-3 py-1 rounded-full hover:bg-[#bb0718] transition-colors text-xs"
                          >
                            1 Month (₹{sub.monthPrice})
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Small View */
                      <div className="flex flex-col items-center justify-center h-full">
                        <h3 className="text-white text-sm font-bold text-center leading-tight">{sub.name}</h3>
                        <p className="text-white text-xs font-semibold mt-1">
                          {getSmallViewDietary(sub.dietary)}
                        </p>
                        <p className="text-white text-xs font-semibold mt-1">₹{sub.monthPrice}/mo</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <p className="text-center text-gray-600 mt-10 text-sm">
          Connect with local housewives for delicious, home-cooked meals tailored for hostel students. Choose weekly or monthly plans!
        </p>
      </div>
    </div>
  );
}

export default SubscriptionsPopup;