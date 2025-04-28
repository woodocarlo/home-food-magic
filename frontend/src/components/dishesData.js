const dishes = [
    {
      id: 1,
      name: 'Grilled Chicken Bowl',
      category: 'PowerFuel',
      price: 12.99,
      cookedAt: '2025-04-27T10:30:00',
      dietary: 'Non-Veg',
      nutrients: ['Protein-Rich', 'Carbs-Rich'],
      image: 'https://i.postimg.cc/SKbXzLx4/crousel.jpg',
      description: 'High-protein grilled chicken with brown rice and veggies.'
    },
    {
      id: 2,
      name: 'Quinoa Power Salad',
      category: 'PowerFuel',
      price: 10.99,
      cookedAt: '2025-04-26T11:00:00',
      dietary: 'Veg',
      nutrients: ['Protein-Rich', 'Fiber-Rich'],
      image: 'https://i.postimg.cc/T3vKSqMs/6.jpg',
      description: 'Quinoa salad with chickpeas, avocado, and kale.'
    },
    {
      id: 3,
      name: 'Multigrain Veggie Wrap',
      category: 'VitalBite',
      price: 8.99,
      cookedAt: '2025-04-27T09:00:00',
      dietary: 'Veg',
      nutrients: ['Vitamin-Rich', 'Low-Calorie'],
      image: 'https://i.postimg.cc/T3vKSqMs/6.jpg',
      description: 'Nutrient-dense wrap with fresh veggies and hummus.'
    },
    {
      id: 4,
      name: 'Low-Oil Chicken Stir-Fry',
      category: 'VitalBite',
      price: 11.99,
      cookedAt: '2025-04-26T12:00:00',
      dietary: 'Non-Veg',
      nutrients: ['Vitamin-Rich', 'Mineral-Rich'],
      image: 'https://i.postimg.cc/SKbXzLx4/crousel.jpg',
      description: 'Lean chicken stir-fry with colorful bell peppers.'
    },
    {
      id: 5,
      name: 'Light Khichdi',
      category: 'HealSpoon',
      price: 6.99,
      cookedAt: '2025-04-27T08:00:00',
      dietary: 'Veg',
      nutrients: [],
      image: 'https://i.postimg.cc/Xqyv1X23/7.jpg',
      description: 'Soothing khichdi with lentils and rice.'
    },
    {
      id: 6,
      name: 'Butter Chicken',
      category: 'DailyCrave',
      price: 14.99,
      cookedAt: '2025-04-27T11:30:00',
      dietary: 'Non-Veg',
      nutrients: [],
      image: 'https://i.postimg.cc/WtL1BjKZ/8.jpg',
      description: 'Creamy butter chicken with naan.'
    },
    {
      id: 7,
      name: 'Egg Bhurji',
      category: 'DailyCrave',
      price: 7.99,
      cookedAt: '2025-04-27T10:00:00',
      dietary: 'Egg',
      nutrients: [],
      image: 'https://i.postimg.cc/WtL1BjKZ/8.jpg',
      description: 'Spicy scrambled eggs with Indian spices.'
    }
  ];
  
  // Export for easy replacement with backend API
  export default dishes;