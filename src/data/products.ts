export type Product = {
  id: number
  name: string
  category: string
  price: string
  inStock: boolean
  quantity: string
  image: string
}

export const products: Product[] = [
  // =========================
  // Fruits & Veg
  // =========================
  {
    id: 1,
    name: 'Organic Apples',
    category: 'Fruits & Veg',
    price: '$3.49 / kg',
    inStock: true,
    quantity: 'Plenty',
    image:
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&h=500&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'Ripe Bananas',
    category: 'Fruits & Veg',
    price: '$1.99 / bunch',
    inStock: true,
    quantity: 'A few left',
    image:
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=500&h=500&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'Cherry Tomatoes',
    category: 'Fruits & Veg',
    price: '$2.79 / punnet',
    inStock: false,
    quantity: 'Out of stock',
    image:
      'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=500&h=500&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Baby Spinach',
    category: 'Fruits & Veg',
    price: '$2.29 / bag',
    inStock: true,
    quantity: 'Plenty',
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=500&fit=crop&auto=format',
  },

  // =========================
  // Dairy
  // =========================
  {
    id: 5,
    name: 'Whole Milk',
    category: 'Dairy',
    price: '$1.89 / L',
    inStock: true,
    quantity: 'Plenty',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=500&fit=crop&auto=format',
  },
  {
    id: 6,
    name: 'Greek Yogurt',
    category: 'Dairy',
    price: '$3.99 / tub',
    inStock: true,
    quantity: 'A few left',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=500&fit=crop&auto=format',
  },
  {
    id: 7,
    name: 'Aged Cheddar',
    category: 'Dairy',
    price: '$5.49 / block',
    inStock: true,
    quantity: 'Plenty',
    image:
      'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=500&h=500&fit=crop&auto=format',
  },

  // =========================
  // Bakery
  // =========================
  {
    id: 8,
    name: 'Sourdough Loaf',
    category: 'Bakery',
    price: '$4.50',
    inStock: true,
    quantity: "Today's batch",
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop&auto=format',
  },
  {
    id: 9,
    name: 'Butter Croissants',
    category: 'Bakery',
    price: '$4.99 / pack',
    inStock: true,
    quantity: 'Fresh today',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop&auto=format',
  },

  // =========================
  // Pantry
  // =========================
  {
    id: 10,
    name: 'Olive Oil (500ml)',
    category: 'Pantry',
    price: '$8.99',
    inStock: true,
    quantity: 'Plenty',
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop&auto=format',
  },
  {
    id: 11,
    name: 'Basmati Rice (1kg)',
    category: 'Pantry',
    price: '$4.99',
    inStock: true,
    quantity: 'Plenty',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop&auto=format',
  },

  // =========================
  // Beverages
  // =========================
  {
    id: 12,
    name: 'Orange Juice',
    category: 'Beverages',
    price: '$3.49 / bottle',
    inStock: true,
    quantity: 'Plenty',
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop&auto=format',
  },
  {
    id: 13,
    name: 'Sparkling Water',
    category: 'Beverages',
    price: '$2.49 / pack',
    inStock: true,
    quantity: 'A few left',
    image:
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&h=500&fit=crop&auto=format',
  },

  // =========================
  // Snacks
  // =========================
  {
  id: 14,
  name: 'Dark Chocolate',
  category: 'Snacks',
  price: '$3.99 / bar',
  inStock: true,
  quantity: 'Plenty',
  image:
    'https://images.unsplash.com/photo-1772985444874-791aa7dc8706?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
},
  {
    id: 15,
    name: 'Mixed Nuts (200g)',
    category: 'Snacks',
    price: '$6.49 / pack',
    inStock: true,
    quantity: 'A few left',
    image:
'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&h=500&fit=crop&auto=format',  },
]