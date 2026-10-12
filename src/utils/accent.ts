export interface Accent {
  name: string;
  hex: string;
}

export const ACCENTS: Accent[] = [
  { name: "Neon green", hex: "#00ff88" },
  { name: "Violet", hex: "#9b6bff" },
  { name: "Coral", hex: "#ff5c7a" },
  { name: "Amber", hex: "#ffc94d" },
  { name: "Cyan", hex: "#38d9ff" },
];

// Keep in sync with the inline script in index.html, which applies the saved
// accent before React mounts so there is no flash of the default color.
const STORAGE_KEY = "accent";
export const ACCENT_EVENT = "accentchange";

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

export const getAccent = (): string => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ACCENTS.some((a) => a.hex === saved)) return saved;
  } catch {
    /* storage blocked */
  }
  return ACCENTS[0].hex;
};

/** Current accent as an "r, g, b" string, for canvas drawing. */
export const getAccentRgb = (): string =>
  getComputedStyle(document.documentElement)
    .getPropertyValue("--accentRgb")
    .trim() || "0, 255, 136";

export const applyAccent = (hex: string) => {
  const root = document.documentElement.style;
  root.setProperty("--accentColor", hex);
  root.setProperty("--accentRgb", hexToRgb(hex));
  try {
    localStorage.setItem(STORAGE_KEY, hex);
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new CustomEvent(ACCENT_EVENT, { detail: hex }));
};
