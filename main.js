// Cardano wallet integration using CIP-30
// Modal functions
function showModal(title, message) {
    const modal = document.getElementById('alert-modal');
    const titleEl = document.getElementById('modal-title');
    const messageEl = document.getElementById('modal-message');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    modal.style.display = 'flex';
}

function hideModal() {
    document.getElementById('alert-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Set up modal event listeners only if elements exist
    const closeBtn = document.querySelector('.close-btn');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideModal);
    }
    if (confirmBtn) {
        confirmBtn.addEventListener('click', hideModal);
    }
    
    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('alert-modal');
        if (e.target === modal) hideModal();
    });

    // Wallet configuration with names and logos
    const wallets = [
        { 
            name: 'Eternl', 
            logo: 'https://eternl.io/favicon.ico',
            apiName: 'eternl' 
        },
        { 
            name: 'Gero', 
            logo: 'https://gerowallet.io/favicon.ico',
            apiName: 'gerowallet' 
        },
        { 
            name: 'Typhon', 
            logo: 'https://typhonwallet.io/favicon.ico',
            apiName: 'typhon' 
        },
        { 
            name: 'Vespr', 
            logo: 'https://docs.vespr.xyz/vespr/~gitbook/image?url=https%3A%2F%2F1666257432-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FxmgYWup0cXQteeId2qIa%252Ficon%252FES8dSmUlvzakbvjKoXY3%252FVESPR_logo_noglow.png%3Falt%3Dmedia%26token%3D8ad8f8b2-a354-4abf-9f79-dabfd2414080&width=32&dpr=1&quality=100&sign=2769d83d&sv=2',
            apiName: 'vespr' 
        },
        { 
            name: 'Lace', 
            logo: 'https://www.lace.io/favicon.ico',
            apiName: 'lace' 
        },
        { 
            name: 'Yoroi', 
            logo: 'data:image/png;base64,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',
            apiName: 'yoroi' 
        },
    ];

    // DOM elements
    const connectBtn = document.getElementById('connect-btn');
    const walletMenu = document.getElementById('wallet-menu');
    const walletAddress = document.getElementById('wallet-address');
    const assetsList = document.getElementById('assets-grid');
    const dashboardBtn = document.getElementById('dashboard-btn');
    const backBtn = document.getElementById('back-btn');
    
// Blockfrost API configuration
// API key is now loaded from configuration
let BLOCKFROST_API_KEY = window.APP_CONFIG?.BLOCKFROST_API_KEY || "";

// Wait for configuration to load
function waitForConfig() {
    return new Promise((resolve) => {
        const checkConfig = () => {
            const key = window.APP_CONFIG?.BLOCKFROST_API_KEY;
            if (key && key.length >= 20) {
                resolve(key);
            } else {
                // Check again after a short delay
                setTimeout(checkConfig, 100);
            }
        };
        
        // Also check localStorage as fallback
        const localKey = localStorage.getItem('BLOCKFROST_API_KEY');
        if (localKey && localKey.length >= 20) {
            window.APP_CONFIG.BLOCKFROST_API_KEY = localKey;
            resolve(localKey);
        } else {
            checkConfig();
        }
    });
}

// SPYD Coin asset ID (replace with your actual asset ID)
const ASSET_ID = "e1e47522d8f3906a958581817ca790e4cf492588eed81733d91b14e542697262";
    
    let connectedWallet = null;
    let walletAPI = null;
    let userAddress = null;
    
    // Initialize wallet menu with logout button
    function initWalletMenu() {
        walletMenu.innerHTML = '';
        
        // Add wallet buttons
        wallets.forEach(wallet => {
            const walletBtn = document.createElement('button');
            walletBtn.innerHTML = `<img src="${wallet.logo}" alt="${wallet.name} logo"> ${wallet.name}`;
            walletBtn.addEventListener('click', () => connectWallet(wallet));
            walletMenu.appendChild(walletBtn);
        });
        
        // Add logout button only if wallet is connected
        if (connectedWallet) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.textContent = 'Logout';
            logoutBtn.addEventListener('click', logoutWallet);
            walletMenu.appendChild(logoutBtn);
        }
    }
    
    // Logout wallet
function logoutWallet() {
    localStorage.removeItem('connectedWallet');
    connectedWallet = null;
    walletAPI = null;
    userAddress = null;
    
    // Update UI
    connectBtn.textContent = 'Connect Wallet';
    walletMenu.classList.add('hidden');
    updateConnectionStatus();
    
    console.log('User logged out');
    
    // Re-initialize wallet menu to remove logout button
    initWalletMenu();

    // Redirect to homepage after logout
    window.location.href = 'index.html';
}
    
    // Update connection status display
    function updateConnectionStatus() {
        const walletAddressEl = document.getElementById('wallet-address');
        const connectionStatusEl = document.getElementById('connection-status');
        const statusIndicator = document.querySelector('.status-indicator');
        
        if (walletAddressEl) {
            if (userAddress) {
                // Shorten address to first 6 and last 4 characters
                const prefix = userAddress.substring(0, 6);
                const suffix = userAddress.substring(userAddress.length - 4);
                walletAddressEl.textContent = `${prefix}...${suffix}`;
            } else {
                walletAddressEl.textContent = 'Not connected';
            }
        }
        
        if (connectionStatusEl) {
            connectionStatusEl.textContent = userAddress ? 'Connected' : 'Disconnected';
        }
        
        if (statusIndicator) {
            if (userAddress) {
                statusIndicator.classList.add('connected');
                statusIndicator.classList.remove('disconnected');
            } else {
                statusIndicator.classList.add('disconnected');
                statusIndicator.classList.remove('connected');
            }
        }
    }
    
    // Auto-connect wallet on page load if saved
    function autoConnectWallet() {
        const savedWallet = localStorage.getItem('connectedWallet');
        if (savedWallet) {
            try {
                const { apiName, address } = JSON.parse(savedWallet);
                const wallet = wallets.find(w => w.apiName === apiName);
                if (wallet) {
                    userAddress = address;
                    connectedWallet = wallet;
                    
                    // Update UI
                    connectBtn.textContent = `${wallet.name} Connected`;
                    updateConnectionStatus();
                    
                    console.log(`Auto-connected to ${wallet.name} wallet`);
                }
            } catch (e) {
                console.error('Error loading saved wallet:', e);
                localStorage.removeItem('connectedWallet');
            }
        }
    }
    
    // Connect to selected wallet
    async function connectWallet(wallet) {
        try {
            // Check if wallet is installed
            if (typeof window.cardano === 'undefined' || !window.cardano[wallet.apiName]) {
                throw new Error(`${wallet.name} wallet not detected!`);
            }
            
            // Enable wallet
            walletAPI = await window.cardano[wallet.apiName].enable();
            connectedWallet = wallet;
            
            // Get address
            const addresses = await walletAPI.getUsedAddresses();
            userAddress = addresses[0];
            
    // Update UI
    connectBtn.textContent = `${wallet.name} Connected`;
    walletMenu.classList.add('hidden');
    
    // Save wallet to local storage
    localStorage.setItem('connectedWallet', JSON.stringify({
        apiName: wallet.apiName,
        address: userAddress
    }));
    
    // Update connection status
    updateConnectionStatus();
    
    // Re-initialize wallet menu to show logout button
    initWalletMenu();
            
    // Redirect to dashboard after successful login
    if (!window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'dashboard.html';
    } else {
        // If already on dashboard, load assets
        loadAssets();
    }
    
    console.log(`Connected to ${wallet.name} wallet at address: ${userAddress}`);
        } catch (error) {
            console.error('Wallet connection failed:', error);
            showModal('Connection Failed', `Wallet connection failed: ${error.message}`);
        }
    }
    
    // Load wallet assets including ADA and tokens
    async function loadAssets() {
        if (!userAddress) return;
        
        try {
            // Show loading state
            assetsList.innerHTML = '<div class="asset-item loading"><div class="spinner"></div><p>Loading assets...</p></div>';
            
    // Handle Vespr wallet address format (remove chain code suffix)
    const cleanAddress = userAddress.includes(':') 
        ? userAddress.split(':')[0] 
        : userAddress;
    
    // First fetch ADA balance with error handling
    const adaResponse = await fetch(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/${cleanAddress}`, {
        headers: { 
            'project_id': BLOCKFROST_API_KEY,
            'Content-Type': 'application/json'
        }
    });
    
    if (!adaResponse.ok) {
        const errorBody = await adaResponse.text();
        throw new Error(`Failed to fetch address info: ${adaResponse.status} ${adaResponse.statusText} - ${errorBody}`);
    }
    
    const addressInfo = await adaResponse.json();
    const adaAmount = addressInfo.amount.find(a => a.unit === 'lovelace')?.quantity || '0';
    const adaBalance = (parseInt(adaAmount) / 1000000).toFixed(2);
    
    // Then fetch tokens
    // Fetch token assets with error handling
    const assetsResponse = await fetch(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/${cleanAddress}/utxos`, {
        headers: { 
            'project_id': BLOCKFROST_API_KEY,
            'Content-Type': 'application/json'
        }
    });
            
    if (!assetsResponse.ok) {
        const errorBody = await assetsResponse.text();
        
        // Handle rate limiting (status 429)
        if (assetsResponse.status === 429) {
            showModal('API Limit Exceeded', 'Blockfrost API rate limit exceeded. Please try again later.');
        }
        
        throw new Error(`Failed to fetch assets: ${assetsResponse.status} ${assetsResponse.statusText} - ${errorBody}`);
    }
            
            const utxos = await assetsResponse.json();
            const tokens = [];
            
            // Process all UTXOs to find tokens
            utxos.forEach(utxo => {
                if (utxo.amount) {
                    utxo.amount.forEach(asset => {
                        if (asset.unit !== 'lovelace') {
                            tokens.push(asset);
                        }
                    });
                }
            });
            
            // Group tokens by policy ID
            const tokenGroups = {};
            tokens.forEach(token => {
                const policyId = token.unit.substring(0, 56);
                if (!tokenGroups[policyId]) {
                    tokenGroups[policyId] = [];
                }
                tokenGroups[policyId].push(token);
            });
            
            // Update UI
            assetsList.innerHTML = '';
            
            // Add ADA balance
            const adaItem = document.createElement('div');
            adaItem.className = 'asset-item';
            adaItem.innerHTML = `
                <div class="asset-icon">₳</div>
                <div class="asset-info">
                    <h4>Cardano (ADA)</h4>
                    <p>Balance: ${adaBalance} ADA</p>
                </div>
            `;
            assetsList.appendChild(adaItem);
            
            // Add asset if exists
            const targetAsset = tokens.find(asset => asset.unit === ASSET_ID);
            if (targetAsset) {
                const assetItem = document.createElement('div');
                assetItem.className = 'asset-item';
                assetItem.innerHTML = `
                    <div class="asset-icon">🕷️</div>
                    <div class="asset-info">
                            <h4>SPYD Coin (SPDR)</h4>
                        <p>Amount: ${targetAsset.quantity}</p>
                        <p>Asset ID: ${targetAsset.unit}</p>
                    </div>
                `;
                assetsList.appendChild(assetItem);
            } else {
                // Show message if asset not found
                const assetItem = document.createElement('div');
                assetItem.className = 'asset-item error';
                assetItem.innerHTML = `
                    <div class="asset-icon">⚠️</div>
                    <div class="asset-info">
                        <h4>Asset Not Found</h4>
                        <p>The requested asset was not found in your wallet</p>
                    </div>
                `;
                assetsList.appendChild(assetItem);
            }
            
            // Store token groups for NFT tab
            window.tokenGroups = tokenGroups;
    } catch (error) {
        console.error('Error loading assets:', error);
        
        // Show detailed error in UI
        assetsList.innerHTML = `
            <div class="asset-item error">
                <div class="asset-icon">⚠️</div>
                <div class="asset-info">
                    <h4>Error Loading Assets</h4>
                    <p>${error.message}</p>
                </div>
            </div>
        `;
    }
    }
    
    // Event listeners
if (connectBtn) {
    connectBtn.addEventListener('click', () => {
        walletMenu.classList.toggle('hidden');
    });
}

// Add event listener for the new feature button
const featureBtn = document.getElementById('feature-btn');
if (featureBtn) {
    featureBtn.addEventListener('click', () => {
        walletMenu.classList.toggle('hidden');
    });
}

// Add event listener for the Whitepaper button
const whitepaperBtn = document.getElementById('whitepaper-btn');

if (whitepaperBtn) {
    whitepaperBtn.addEventListener('click', () => {
        console.log('Whitepaper button clicked');
        // Implement whitepaper functionality here
        showModal('Coming Soon', 'Whitepaper functionality coming soon!');
    });
}
    
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', () => {
            if (connectedWallet) {
                window.location.href = 'dashboard.html';
            } else {
                showModal('Wallet Required', 'Please connect your wallet first!');
                // Open the wallet menu
                walletMenu.classList.remove('hidden');
            }
        });
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    // Add event listener for the logout button in dashboard
    const logoutBtnDashboard = document.getElementById('logout-btn');
    if (logoutBtnDashboard) {
        logoutBtnDashboard.addEventListener('click', logoutWallet);
    }
    
    // Initialize wallet menu
    initWalletMenu();
    
    // Auto-connect to saved wallet
    autoConnectWallet();
    
    // If on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        if (connectedWallet) {
            loadAssets();
        } else {
            // Redirect to home page if not authenticated
            setTimeout(() => {
                showModal('Authentication Required', 'Please connect your wallet to access this page');
                window.location.href = 'index.html';
            }, 1000);
        }
    }
});

// Add CSS for spinner and asset items
const style = document.createElement('style');
style.textContent = `
    .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: var(--spider-purple);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .asset-item {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        display: flex;
        align-items: center;
    }
    
    .asset-icon {
        font-size: 2rem;
        margin-right: 15px;
    }
    
    .asset-info h4 {
        color: var(--spider-purple);
        margin-bottom: 5px;
    }
    
    .error {
        color: var(--spider-red);
    }
    
    .status-indicator {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 5px;
    }
    
    .status-indicator.connected {
        background-color: #4CAF50;
    }
    
    .status-indicator.disconnected {
        background-color: #f44336;
    }
`;
document.head.appendChild(style);
