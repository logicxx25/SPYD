// Configuration file for API keys and sensitive data
// This file should be loaded before main.js

// Default configuration - can be overridden by environment
window.APP_CONFIG = {
    BLOCKFROST_API_KEYS: [],
    BLOCKFROST_API_KEY: '', // Legacy single key for backward compatibility
    API_BASE_URL: 'https://cardano-mainnet.blockfrost.io/api/v0',
    currentKeyIndex: 0
};

// API Key Pool Manager for parallel fetching
window.API_KEY_MANAGER = {
    keys: [],
    currentIndex: 0,
    
    // Get next API key in round-robin fashion
    getNextKey() {
        if (this.keys.length === 0) return null;
        const key = this.keys[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.keys.length;
        return key;
    },
    
    // Get a random API key for load balancing
    getRandomKey() {
        if (this.keys.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.keys.length);
        return this.keys[randomIndex];
    },
    
    // Get multiple keys for parallel requests
    getKeysForParallel(count) {
        if (this.keys.length === 0) return [];
        const selectedKeys = [];
        for (let i = 0; i < Math.min(count, this.keys.length); i++) {
            selectedKeys.push(this.getNextKey());
        }
        return selectedKeys;
    },
    
    // Initialize keys from config
    initializeKeys(keys) {
        this.keys = keys.filter(key => key && key.length > 0);
        this.currentIndex = 0;
        console.log(`Initialized ${this.keys.length} API keys for parallel fetching`);
    }
};

// Parallel fetch utility with automatic key rotation
window.PARALLEL_FETCH = {
    // Make a single request with automatic key selection
    async makeRequest(url, options = {}) {
        const apiKey = window.API_KEY_MANAGER.getNextKey();
        if (!apiKey) {
            throw new Error('No API keys available');
        }
        
        const headers = {
            'project_id': apiKey,
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        const response = await fetch(url, {
            ...options,
            headers
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
        }
        
        return response.json();
    },
    
    // Make multiple parallel requests with different API keys
    async makeParallelRequests(requests) {
        const keys = window.API_KEY_MANAGER.getKeysForParallel(requests.length);
        
        const promises = requests.map((request, index) => {
            const apiKey = keys[index % keys.length];
            const headers = {
                'project_id': apiKey,
                'Content-Type': 'application/json',
                ...request.options?.headers
            };
            
            return fetch(request.url, {
                ...request.options,
                headers
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Request ${index} failed: ${response.status}`);
                }
                return response.json();
            }).catch(error => {
                console.error(`Parallel request ${index} failed:`, error);
                return { error: error.message, index };
            });
        });
        
        return Promise.all(promises);
    },
    
    // Batch process with rate limiting
    async batchProcess(items, processor, batchSize = 5, delayMs = 100) {
        const results = [];
        
        for (let i = 0; i < items.length; i += batchSize) {
            const batch = items.slice(i, i + batchSize);
            const batchPromises = batch.map(item => processor(item));
            
            try {
                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults);
            } catch (error) {
                console.error(`Batch ${Math.floor(i / batchSize)} failed:`, error);
                // Continue with next batch even if current batch fails
                results.push(...batch.map(() => ({ error: error.message })));
            }
            
            // Add delay between batches to respect rate limits
            if (i + batchSize < items.length && delayMs > 0) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        }
        
        return results;
    }
};

// Function to initialize configuration with API keys
function initializeConfig() {
    // Use the API keys directly from the configuration
    const apiKeys = [
        'mainnetXXzealBK3I6LNdPvzmFZ5PUqJL0L9vp0',
        'mainnetExfubYtwlbbd2GOnZr7SAzvtSZatUxSq',
        'mainnetweguh0mB2J3KwDoadUyW2nFEPn4yd8au',
        'mainnetD6AWzlBZ47svjG5zxBEqzhLlC3Awq1Ik',
        'mainnetfqafERNeqtPg5kKvQDZMomvpmlwhlOsX',
        'mainnetVK4pgPC2mtTumFcqMSEGiDhZJQzwTl0W',
        'mainnetQcqIDWbkVkqzhPKhAeCyeruYJbnHgKLc',
        'mainnetvjYI2rsQK0AoLOIcy5OulXHczrQRIiOQ',
        'mainnetuYKN47riu6BHUS7IdSWdbHAwHQmwUhnT',
        'mainnetKakwoRkyCFmBI2vwHv2K7z6vNkDD4lR4'
    ];
    
    // Initialize API key manager
    window.APP_CONFIG.BLOCKFROST_API_KEYS = apiKeys;
    window.APP_CONFIG.BLOCKFROST_API_KEY = apiKeys[0]; // Set first key as legacy fallback
    window.API_KEY_MANAGER.initializeKeys(apiKeys);
    
    console.log(`Initialized ${apiKeys.length} API keys for parallel fetching`);
}

// Initialize configuration immediately
initializeConfig();
