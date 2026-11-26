const name = 'Koffee Shop. El';
const street = 'n1015, Av. Josina Machel';
const city = 'Maputo, Mozambique';
const query = encodeURIComponent(`${name}, ${street}, ${city}`);

export const location = {
  name,
  street,
  city,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
  embedUrl: `https://www.google.com/maps?q=${query}&output=embed&hl=pt`,
};
