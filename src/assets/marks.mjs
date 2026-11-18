import { html } from "../lib.mjs";

/** Logotype: "Factor Inédito" set in the display face; the acute accent of the É is a four-point spark (the only warm colour on the site). */
export const logo = (cls = "") => html`<span class="logo ${cls}" aria-label="Factor Inédito"><span aria-hidden="true">Factor <span class="logo-i">In<span class="e-acute">e<svg class="spark" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0 L12.2 7.8 L20 10 L12.2 12.2 L10 20 L7.8 12.2 L0 10 L7.8 7.8 Z"/></svg></span>dito</span></span></span>`;

/** Small original glyphs for the topics (stroke drawings, 32×32). */
export const glyphs = {
  ciencia: `<circle cx="16" cy="16" r="2.4"/><ellipse cx="16" cy="16" rx="13" ry="5"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)"/>`,
  universo: `<circle cx="16" cy="16" r="7"/><ellipse cx="16" cy="16" rx="14.5" ry="4.2" transform="rotate(-18 16 16)"/><circle cx="27" cy="6" r="1"/><circle cx="5" cy="27" r="0.8"/>`,
  tecnologia: `<rect x="9" y="9" width="14" height="14" rx="2"/><path d="M13 9V4M19 9V4M13 28v-5M19 28v-5M9 13H4M9 19H4M28 13h-5M28 19h-5"/><path d="M13 16h6"/>`,
  historia: `<path d="M5 27h22M7 27V12M12 27V12M20 27V12M25 27V12M4 12h24L16 5z"/>`,
  curiosidades: `<path d="M16 3l2.6 8.4L27 14l-8.4 2.6L16 25l-2.6-8.4L5 14l8.4-2.6z"/><circle cx="26" cy="26" r="1.4"/>`,
  preguntas: `<path d="M11.5 11.5a4.5 4.5 0 1 1 6.6 4c-1.4.8-2.1 1.7-2.1 3.3v1"/><circle cx="16" cy="24.5" r="1"/><circle cx="16" cy="16" r="13" stroke-dasharray="2 3.2"/>`,
};
export const glyph = (k, cls = "glyph") => html`<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${glyphs[k]}</svg>`;

export const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#050A1C"/><path fill="#E8ECFA" d="M14 52V22c0-8 5-12 13-12h3v7h-3c-3.5 0-5 1.5-5 5v30z"/><path fill="#E8ECFA" d="M8 26h20v6H8z"/><path fill="#3D7BFF" d="M36 26h8v26h-8z"/><path fill="#FFCB6B" d="M40 5l2 6.5 6.5 2-6.5 2-2 6.5-2-6.5-6.5-2 6.5-2z"/></svg>`;
