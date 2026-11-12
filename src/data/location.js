const street = 'Av. Josina Machel, n.º 1015';
const city = 'Maputo, Moçambique';
const query = encodeURIComponent(`${street}, ${city}`);

export const location = {
  street,
  city,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
  embedUrl: `https://www.google.com/maps?q=${query}&output=embed&hl=pt`,
};
