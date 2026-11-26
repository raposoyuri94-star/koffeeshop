const name = 'Koffee Shop. EI';
const street = 'n.º 1015, Av. Josina Machel';
const city = 'Maputo, Moçambique';
const query = encodeURIComponent(`${name}, ${street}, ${city}`);

export const location = {
  name,
  street,
  city,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
  embedUrl: `https://www.google.com/maps?q=${query}&output=embed&hl=pt`,
};
