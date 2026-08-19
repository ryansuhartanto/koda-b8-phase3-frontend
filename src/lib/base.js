export const base = import.meta.env.VITE_BASE_URL ?? globalThis.location.origin;

export const host = URL.parse(base)?.host ?? base;
