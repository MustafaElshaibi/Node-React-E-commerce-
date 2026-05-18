import chair1 from '../../assets/chair-1.jpg'
import chair2 from '../../assets/chair-2.jpg'
import sofa1 from '../../assets/sofa-1.jpg'
import sofa2 from '../../assets/sofa-2.jpg'
import modernFurniture1 from '../../assets/modern-furniture-1.jpg'
import modernFurniture2 from '../../assets/modern-furniture-2.jpg'

export const products = [
  {
    productId: 'PROD-001',
    title: 'Loveseat Sofa',
    image: null,
    price: 199.00,
    description: 'A stylish and comfortable loveseat sofa, perfect for any modern living space. Made with high-quality materials for durability and comfort. Features premium fabric upholstery and solid wood frame construction.',
    brand: '3legant',
    model: 'LS-2024',
    color: 'Grey',
    category: 'Sofas',
    popular: true,
    discount: 50,
    colors: ['Grey', 'Navy', 'Beige'],
    rating: 4.8,
    edition: 'Limited Edition',
    onSale: true,
    images: [sofa1, sofa2],
    specifications: {
      'Dimensions': '70" W x 35" D x 30" H',
      'Weight': '120 lbs',
      'Material': 'Premium fabric, solid wood frame',
      'Warranty': '5 years',
      'Assembly': 'Required'
    },
    features: [
      'Premium fabric upholstery',
      'Solid hardwood frame',
      'High-density foam cushions',
      'Removable cushion covers',
      'Anti-sag spring system'
    ],
    reviews: [
      { id: 1, author: 'Sarah Johnson', rating: 5, comment: 'Absolutely love this sofa! The quality is exceptional and it\'s incredibly comfortable. The grey color is perfect for our living room.', date: '2024-01-15' },
      { id: 2, author: 'Mike Chen', rating: 5, comment: 'Great value for money. The limited edition design is beautiful and the construction feels very solid.', date: '2024-01-10' },
      { id: 3, author: 'Emily Davis', rating: 4, comment: 'Very comfortable and well-made. Assembly was straightforward. Only minor complaint is that it\'s a bit firmer than expected.', date: '2024-01-05' }
    ]
  },
  {
    productId: 'PROD-002',
    title: 'Modern Table Lamp',
    image: modernFurniture2,
    price: 89.99,
    description: 'Contemporary table lamp with adjustable brightness and sleek design. Perfect for reading or ambient lighting in any room.',
    brand: 'LightCraft',
    model: 'MTL-150',
    color: 'Black',
    category: 'Lighting',
    popular: false,
    discount: 0,
    colors: ['Black', 'White', 'Gold'],
    rating: 4.5,
    edition: null,
    onSale: false,
    images: [modernFurniture2, modernFurniture1],
    specifications: {
      'Dimensions': '12" W x 12" D x 24" H',
      'Weight': '8 lbs',
      'Material': 'Metal base, fabric shade',
      'Bulb Type': 'LED compatible',
      'Warranty': '2 years'
    },
    features: [
      'Adjustable brightness',
      'Touch control',
      'Energy efficient LED',
      'Stable weighted base',
      'Modern minimalist design'
    ],
    reviews: [
      { id: 1, author: 'Alex Rivera', rating: 5, comment: 'Perfect lamp for my desk. The touch controls are very responsive and the light quality is excellent.', date: '2024-01-12' },
      { id: 2, author: 'Lisa Wong', rating: 4, comment: 'Great design and functionality. The only downside is the cord could be a bit longer.', date: '2024-01-08' }
    ]
  },
  {
    productId: 'PROD-003',
    title: 'Ergonomic Office Chair',
    image: chair1,
    price: 299.99,
    description: 'Professional office chair with lumbar support and adjustable features. Designed for long hours of comfortable seating.',
    brand: 'ComfortSeating',
    model: 'EOC-Pro',
    color: 'Beige',
    category: 'Chairs',
    popular: true,
    discount: 25,
    colors: ['Beige', 'Black', 'Grey'],
    rating: 4.7,
    edition: 'Pro Series',
    onSale: true,
    images: [chair1, chair2],
    specifications: {
      'Dimensions': '26" W x 26" D x 42-46" H',
      'Weight': '45 lbs',
      'Material': 'Mesh back, fabric seat',
      'Weight Capacity': '300 lbs',
      'Warranty': '3 years'
    },
    features: [
      'Adjustable lumbar support',
      'Height adjustable',
      'Breathable mesh back',
      '360-degree swivel',
      'Smooth rolling casters'
    ],
    reviews: [
      { id: 1, author: 'David Kim', rating: 5, comment: 'Best office chair I\'ve ever owned. The lumbar support is fantastic and it\'s very comfortable for long work sessions.', date: '2024-01-14' },
      { id: 2, author: 'Rachel Green', rating: 4, comment: 'Great chair overall. Assembly took a while but the end result is worth it.', date: '2024-01-09' }
    ]
  },
  {
    productId: 'PROD-004',
    title: 'Minimalist Dining Chair',
    image: chair2,
    price: 149.99,
    description: 'Clean lines and modern design for your dining space. Comfortable seating with a contemporary aesthetic.',
    brand: 'MinimalHome',
    model: 'MDC-001',
    color: 'White',
    category: 'Chairs',
    popular: false,
    discount: 15,
    colors: ['White', 'Black', 'Natural'],
    rating: 4.3,
    edition: null,
    onSale: false,
    images: [chair2, chair1],
    specifications: {
      'Dimensions': '18" W x 20" D x 32" H',
      'Weight': '12 lbs',
      'Material': 'Molded plastic, steel legs',
      'Weight Capacity': '250 lbs',
      'Warranty': '1 year'
    },
    features: [
      'Stackable design',
      'Easy to clean',
      'Lightweight yet sturdy',
      'Modern aesthetic',
      'Scratch-resistant legs'
    ],
    reviews: [
      { id: 1, author: 'Tom Wilson', rating: 4, comment: 'Nice looking chairs that are comfortable enough for dinner. Good value for the price.', date: '2024-01-11' },
      { id: 2, author: 'Maria Garcia', rating: 4, comment: 'Love the minimalist design. They stack nicely when not in use.', date: '2024-01-06' }
    ]
  },
  {
    productId: 'PROD-005',
    title: 'Luxury Sectional Sofa',
    image: sofa2,
    price: 1299.99,
    description: 'Premium sectional sofa with premium materials and exceptional comfort. Perfect centerpiece for any living room.',
    brand: '3legant',
    model: 'LSS-Premium',
    color: 'Charcoal',
    category: 'Sofas',
    popular: true,
    discount: 30,
    colors: ['Charcoal', 'Cream', 'Navy'],
    rating: 4.9,
    edition: 'Premium Collection',
    onSale: true,
    images: [sofa2, sofa1],
    specifications: {
      'Dimensions': '120" W x 80" D x 32" H',
      'Weight': '280 lbs',
      'Material': 'Top-grain leather, hardwood frame',
      'Warranty': '10 years',
      'Assembly': 'White glove delivery'
    },
    features: [
      'Top-grain leather upholstery',
      'Kiln-dried hardwood frame',
      'Down-filled cushions',
      'Reversible chaise',
      'Hidden storage compartment'
    ],
    reviews: [
      { id: 1, author: 'Jennifer Adams', rating: 5, comment: 'This sectional is absolutely gorgeous and incredibly comfortable. The leather quality is outstanding.', date: '2024-01-13' },
      { id: 2, author: 'Robert Taylor', rating: 5, comment: 'Worth every penny. The craftsmanship is exceptional and it looks amazing in our living room.', date: '2024-01-07' }
    ]
  },
  {
    productId: 'PROD-006',
    title: 'Modern Floor Lamp',
    image: modernFurniture1,
    price: 199.99,
    description: 'Sleek floor lamp with ambient lighting capabilities. Features adjustable height and multiple brightness settings.',
    brand: 'LightCraft',
    model: 'MFL-200',
    color: 'Brass',
    category: 'Lighting',
    popular: false,
    discount: 0,
    colors: ['Brass', 'Chrome', 'Black'],
    rating: 4.4,
    edition: null,
    onSale: false,
    images: [modernFurniture1, modernFurniture2],
    specifications: {
      'Dimensions': '16" W x 16" D x 60-72" H',
      'Weight': '25 lbs',
      'Material': 'Metal construction',
      'Bulb Type': 'LED included',
      'Warranty': '2 years'
    },
    features: [
      'Adjustable height',
      'Dimmable LED lighting',
      'Remote control included',
      'Stable weighted base',
      'Energy efficient'
    ],
    reviews: [
      { id: 1, author: 'Chris Martinez', rating: 4, comment: 'Great floor lamp with good build quality. The remote control is a nice touch.', date: '2024-01-10' },
      { id: 2, author: 'Amanda Lee', rating: 4, comment: 'Provides excellent ambient lighting. The brass finish looks very elegant.', date: '2024-01-04' }
    ]
  }
];

export const getProductById = (productId) => {
  return products.find(product => product.productId === productId);
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getPopularProducts = () => {
  return products.filter(product => product.popular);
};

export const getOnSaleProducts = () => {
  return products.filter(product => product.onSale);
};

export const getCategories = () => {
  return [...new Set(products.map(product => product.category))];
};

export const getBrands = () => {
  return [...new Set(products.map(product => product.brand))];
};





