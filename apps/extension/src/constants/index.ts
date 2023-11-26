export const WHITELISTED_DOMAINS = ['chrome://extensions/', 'notion.so'];
export const HARBE_APP_PORT = process.env.HARBE_APP_PORT || '3040';
export const HARPE_APP_URL =
  (process.env.ENV == 'local' && `http://localhost:${HARBE_APP_PORT}`) ||
  'https://harpe.app';
