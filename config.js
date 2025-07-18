// Configuration file for API keys and sensitive data
// This file should be loaded before main.js

// Default configuration - can be overridden by environment
window.APP_CONFIG = {
    BLOCKFROST_API_KEY: '',
    API_BASE_URL: 'https://cardano-mainnet.blockfrost.io/api/v0'
};

// Try to load from localStorage first (synchronous)
const storedKey = localStorage.getItem('BLOCKFROST_API_KEY');
if (storedKey) {
    window.APP_CONFIG.BLOCKFROST_API_KEY = storedKey;
}

// For development/testing, you can also set the key directly here
// window.APP_CONFIG.BLOCKFROST_API_KEY = 'mainnetzSooey1f8VOlvjpSW0P1Vloam1Hb7vJK';

// Function to load configuration from .env file (async, for future use)
async function loadConfigFromEnv() {
    try {
        const response = await fetch('./.env');
        if (response.ok) {
            const envContent = await response.text();
            const lines = envContent.split('\n');
            
            lines.forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    const cleanKey = key.trim();
                    const cleanValue = value.trim();
                    
                    if (cleanKey === 'BLOCKFROST_API_KEY' && cleanValue) {
                        window.APP_CONFIG.BLOCKFROST_API_KEY = cleanValue;
                        console.log('API key loaded from .env file');
                    }
                }
            });
        }
    } catch (error) {
        console.warn('Could not load .env file, using configuration from localStorage or defaults');
    }
}

// Load from .env file asynchronously
loadConfigFromEnv();
