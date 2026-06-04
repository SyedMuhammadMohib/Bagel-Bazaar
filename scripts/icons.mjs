/** Professional inline SVG icons (no emojis) */
const paths = {
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  pin:
    '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  clock:
    '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  cart:
    '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  mobile:
    '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/>',
  bolt: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  food:
    '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/>',
  car:
    '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 8H6l-2.5 3.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M6 8h12v5H6z"/>',
  repeat:
    '<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  star:
    '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
};

export function icon(name, className = "ui-icon") {
  const body = paths[name];
  if (!body) return "";
  const stroke = name === "star" || name === "bolt" ? "" : ' stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
  const fill = name === "star" || name === "bolt" ? ' fill="currentColor"' : ' fill="none"';
  return `<svg class="${className}" viewBox="0 0 24 24"${fill}${stroke} aria-hidden="true">${body}</svg>`;
}

export function stars(count = 5, className = "star-row") {
  return `<span class="${className}" aria-hidden="true">${Array.from({ length: count }, () => icon("star", "ui-icon ui-icon--star")).join("")}</span>`;
}

export const HOURS_HTML =
  "Mon to Fri: 4:30 AM to 5 PM<br>Sat: 4:30 AM to 4 PM<br>Sun: 4:30 AM to 3 PM";

export const HOURS_SHORT =
  "Mon to Fri 4:30 AM to 5 PM. Sat 4:30 AM to 4 PM. Sun 4:30 AM to 3 PM";
