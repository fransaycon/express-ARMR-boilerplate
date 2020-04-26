const config = {
  PORT: 3000,
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_COOLDOWN_IN_MINUTES: 5,
  TOKEN_EXPIRATION_IN_MINUTES: 5,
  REFRESH_EXPIRATION_IN_MINUTES: 24 * 60,
  COOKIE_OPTIONS: {
    httpOnly: true,
  },
};

export default config;
