const imagePath = name => `${import.meta.env.BASE_URL}images/${name.split('/').map(encodeURIComponent).join('/')}`;

export const images = {
  hero: {
    src: imagePath('kofee 3.jpeg'),
    alt: 'Amigos sentados num campo azul, a partilhar cafés gelados da Koffé',
  },
  story: {
    src: imagePath('Koffee 2.jpeg'),
    alt: 'Um café gelado da Koffé ao lado de um telemóvel e de um portátil',
  },
  storyMoment: {
    src: imagePath('kofee 4.jpeg'),
    alt: 'Uma pausa com um matcha gelado da Koffé numa mesa ao ar livre',
  },
  catering: {
    src: imagePath('Koffee 5.jpg'),
    alt: 'Sanduíches da Koffé com recheios variados, acompanhadas por uma bebida gelada e sumo',
  },
  menuCoffee: {
    src: imagePath('Koffee 8.jpg'),
    alt: 'Menu da Koffé com expressos, chás, chocolate quente, frappuccinos e cafés gelados, com preços em meticais',
  },
  menuDrinks: {
    src: imagePath('koffee 7.jpg'),
    alt: 'Menu da Koffé com matcha, chás gelados, bebidas com Red Bull, affogatos e extras, com preços em meticais',
  },
  menuFood: {
    src: imagePath('koffee 6.jpg'),
    alt: 'Menu da Koffé com petiscos, tostas, croissants, sanduíches e pequeno-almoço, com preços em meticais',
  },
  seasonal: {
    src: imagePath('Koffe.jpeg'),
    alt: 'Cartaz de Outubro de bebidas de abóbora e especiarias: chai gelado 400 MT, Red Bull gelado 250 MT, latte gelado 350 MT e matcha gelado 350 MT',
  },
};
