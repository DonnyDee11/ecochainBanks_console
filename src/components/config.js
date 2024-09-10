// config.js

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  backendApiUrl: isProduction ? "https://eco-chain.azurewebsites.net" : "http://127.0.0.1:5000",
};

export default config;