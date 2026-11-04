// Replace these paths with the shop's own photos when they are ready.
const imagePath = name => `${import.meta.env.BASE_URL}images/kofeeshop/${name}`;

export const images = {
  hero: { src: imagePath('cafe.jpg'), alt: 'A welcoming café with glowing lights, hanging lamps, and a coffee bar' },
  coffee: { src: imagePath('coffee.jpg'), alt: 'A freshly brewed black coffee in a white cup, viewed from above' },
  pastries: { src: imagePath('pastries.jpg'), alt: 'Flaky golden croissants dusted with powdered sugar' },
  sandwich: { src: imagePath('sandwich.jpg'), alt: 'Golden toasted sandwiches served with dipping sauces' },
  story: { src: imagePath('gather.jpg'), alt: 'A sunlit café with wooden tables, greenery, and places to settle in' },
};

export const favorites = [
  { category: 'Coffee', image: 'coffee', title: 'A really good cup.', description: 'Bold espresso, silky lattes, and cold coffee for warm days. Made just how you like it.', link: 'Find your coffee' },
  { category: 'Breakfast', image: 'pastries', title: 'Morning, made better.', description: 'Something buttery. Something toasty. Something worth getting out of bed for.', link: 'Meet your breakfast' },
  { category: 'Lunch', image: 'sandwich', title: 'Take a proper break.', description: 'Freshly filled sandwiches and good things between bread. Settle in. Lunch is sorted.', link: 'See what’s for lunch' },
];

export const menu = {
  Coffee: [
    { name: 'Espresso', price: '$3.50', description: 'Small cup. Big personality. A straight-up shot of the good stuff.' },
    { name: 'Flat white', price: '$4.50', description: 'Double espresso, velvety steamed milk. Beautifully balanced.' },
    { name: 'Latte', price: '$5.00', description: 'Our espresso with silky milk and a little art on top.' },
    { name: 'Cold brew', price: '$5.00', description: 'Slow-steeped, smooth, and served over ice.' },
  ],
  Breakfast: [
    { name: 'Butter croissant', price: '$3.75', description: 'Golden, flaky, and lovely with your first coffee.' },
    { name: 'Egg & cheese bagel', price: '$7.50', description: 'Soft eggs and melted cheddar on a toasted bagel.' },
    { name: 'Avocado toast', price: '$8.00', description: 'Smashed avocado, lemon, and chili flakes on sourdough.' },
    { name: 'Granola bowl', price: '$6.50', description: 'Crunchy granola, yogurt, seasonal fruit, and a drizzle of honey.' },
  ],
  Lunch: [
    { name: 'The cheese toastie', price: '$8.50', description: 'A golden sourdough toastie with a generous cheese middle.' },
    { name: 'Pesto chicken', price: '$10.00', description: 'Chicken, basil pesto, tomato, and greens on toasted bread.' },
    { name: 'Garden sandwich', price: '$9.00', description: 'Hummus, avocado, crisp cucumber, and fresh greens.' },
    { name: 'Soup & sourdough', price: '$8.00', description: 'A comforting seasonal soup with bread for the last spoonful.' },
  ],
  'Something else': [
    { name: 'Matcha latte', price: '$5.50', description: 'Earthy green matcha, whisked with your choice of milk.' },
    { name: 'Chai latte', price: '$5.00', description: 'Warming spices and steamed milk. A hug in a cup.' },
    { name: 'Hot chocolate', price: '$4.50', description: 'Rich chocolate, steamed milk, and an excellent excuse to pause.' },
    { name: 'Seasonal tea', price: '$3.50', description: 'A rotating selection of loose-leaf favorites.' },
  ],
};
