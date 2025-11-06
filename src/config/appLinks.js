const getEnvUrl = (keys, fallback) => {
  for (const key of keys) {
    const value = import.meta.env[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return fallback;
};

export const SCANNER_URL = getEnvUrl(
  ['VITE_APP_SCANNER_URL', 'VITE_SCANNER_URL'],
  'https://app.splshield.com'
);

export const EXCHANGE_URL = getEnvUrl(
  ['VITE_APP_EXCHANGE_URL', 'VITE_EXCHANGE_URL'],
  'https://presale.splshield.com'
);

export const API_URL = getEnvUrl(
  ['VITE_APP_API_URL', 'VITE_API_URL'],
  'https://api.splshield.com'
);

export default {
  SCANNER_URL,
  EXCHANGE_URL,
  API_URL,
};
