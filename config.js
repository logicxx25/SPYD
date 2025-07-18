// Configuration file for API keys and sensitive data
// This file should be loaded before main.js

// Default configuration - can be overridden by environment
window.APP_CONFIG = {
    BLOCKFROST_API_KEY: '',
    API_BASE_URL: 'https://cardano-mainnet.blockfrost.io/api/v0'
};

// Method 1: Try to load from localStorage first (synchronous)
const storedKey = localStorage.getItem('BLOCKFROST_API_KEY');
if (storedKey) {
    window.APP_CONFIG.BLOCKFROST_API_KEY = storedKey;
    console.log('API key loaded from localStorage');
}

// Method 2: For immediate use, you can set the key directly here
// This is the most reliable method for client-side applications
// Replace this with your actual API key:
window.APP_CONFIG.BLOCKFROST_API_KEY = 'mainnetzSooey1f8VOlvjpSW0P1Vloam1Hb7vJK';

// Method 3: Allow manual configuration via console
window.setApiKey = function(key) {
    if (key && key.length >= 20) {
        window.APP_CONFIG.BLOCKFROST_API_KEY = key;
        localStorage.setItem('BLOCKFROST_API_KEY', key);
        console.log('API key set successfully');
        return true;
    } else {
        console.error('Invalid API key format');
        return false;
    }
};

// Method 4: Try to load from .env file (may be blocked by CORS)
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
                        localStorage.setItem('BLOCKFROST_API_KEY', cleanValue);
                        console.log('API key loaded from .env file');
                    }
                }
            });
        }
    } catch (error) {
        console.warn('Could not load .env file due to CORS restrictions. Using localStorage or default configuration.');
    }
}

// Load from .env file asynchronously (may not work due to CORS)
loadConfigFromEnv();
