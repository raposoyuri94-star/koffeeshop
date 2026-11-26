import { useEffect, useState } from 'react';
import { menu } from '../data/menu';
import { whatsapp } from '../data/social';

export const menuGroups = Object.entries(menu).flatMap(([category, entries]) => entries.map(group => ({ ...group, category })));
const selectionKey = 'koffeeshop-order-v1';
export const money = value => `${value.toLocaleString('pt-MZ')} MT`;
const itemId = (group, item, option) => JSON.stringify([group.category, group.name, item.name, option]);
const available = new Map(menuGroups.flatMap(group => group.items.flatMap(item => item.prices.map((price, option) => {
  const id = itemId(group, item, option);
  return [id, { id, name: item.name, group: group.name, size: item.prices.length > 1 ? ['M', 'L'][option] : '', price }];
}))));

function restoreSelection() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(selectionKey) || '[]');
    if (!Array.isArray(saved)) return [];
    const restored = new Map();
    for (const line of saved) {
      if (available.has(line?.id) && Number.isSafeInteger(line.quantity) && line.quantity > 0 && line.quantity <= 99) {
        restored.set(line.id, { ...available.get(line.id), quantity: line.quantity });
      }
    }
    return [...restored.values()];
  } catch { return []; }
}

export default function useMenuOrder() {
  const [selection, setSelection] = useState(restoreSelection);
  const [announcement, setAnnouncement] = useState('');
  const count = selection.reduce((sum, line) => sum + line.quantity, 0);
  const total = selection.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const message = [
    'Olá, Koffee! Gostaria de confirmar este pedido:', '',
    ...selection.map(line => `${line.quantity} × ${line.name}${line.size ? ` (${line.size})` : ''} — ${line.group}\n${money(line.price)} cada · Subtotal: ${money(line.price * line.quantity)}`),
    '', `Total: ${money(total)}`, '', 'Podem confirmar a disponibilidade, o valor e como levantar o pedido?',
  ].join('\n');
  const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    try { sessionStorage.setItem(selectionKey, JSON.stringify(selection.map(({ id, quantity }) => ({ id, quantity })))); }
    catch { /* Ordering remains usable when storage is unavailable. */ }
  }, [selection]);

  function addItem(group, item, option) {
    const line = available.get(itemId(group, item, option));
    if (!line) return;
    setSelection(current => current.some(entry => entry.id === line.id)
      ? current.map(entry => entry.id === line.id ? { ...entry, quantity: Math.min(99, entry.quantity + 1) } : entry)
      : [...current, { ...line, quantity: 1 }]);
    setAnnouncement(`${line.name}${line.size ? ` ${line.size}` : ''} adicionado ao saco.`);
  }

  function changeQuantity(id, delta) {
    setSelection(current => current.map(line => line.id === id
      ? { ...line, quantity: Math.min(99, line.quantity + delta) } : line).filter(line => line.quantity > 0));
  }
  function clearSelection() {
    setSelection([]);
    setAnnouncement('Saco vazio.');
  }
  return { selection, count, total, announcement, whatsappUrl, addItem, changeQuantity, clearSelection };
}
