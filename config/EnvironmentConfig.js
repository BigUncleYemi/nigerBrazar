/* eslint-disable prettier/prettier */
const dev = {
  API_ENDPOINT_URL: 'https://nigerbazaar-service.herokuapp.com/api',
};

const prod = {
  API_ENDPOINT_URL: 'https://nigerbazaar-service.herokuapp.com/api',
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev;
    case 'production':
      return prod;
    default:
      break;
  }
};

export const env = getEnv();
