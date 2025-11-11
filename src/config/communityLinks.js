const getEnvUrl = (key, fallback) => {
  const value = import.meta.env[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
};

export const TELEGRAM_URL = getEnvUrl('VITE_TELEGRAM_URL', 'https://t.me/SPLShieldOfficial');
export const DISCORD_URL = getEnvUrl('VITE_DISCORD_URL', 'https://discord.gg/HWyURyg6uH');

export default {
  TELEGRAM_URL,
  DISCORD_URL,
};
