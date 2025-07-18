# SPYD Coin - Trap scammers in your web

## Setup Instructions

### API Key Configuration

This project uses Blockfrost API to interact with the Cardano blockchain. You need to configure your API key:

1. **Get your Blockfrost API key**:
   - Visit [https://blockfrost.io/dashboard](https://blockfrost.io/dashboard)
   - Sign up for a free account
   - Copy your API key (starts with "mainnet" or "testnet")

2. **Configure the API key**:
   - Open the `.env` file in the project root
   - Replace the placeholder with your actual API key:
   ```
   BLOCKFROST_API_KEY=your_actual_api_key_here
   ```

3. **Security Notes**:
   - The `.env` file is already added to `.gitignore` to prevent accidental commits
   - Never commit your API key to version control
   - If you need to share the project, share only the `.env.example` file (create one with dummy values)

### Alternative Configuration Methods

If you prefer not to use the `.env` file, you can also:

1. **Set the API key in localStorage**:
   ```javascript
   localStorage.setItem('BLOCKFROST_API_KEY', 'your_api_key_here');
   ```

2. **Modify the config directly**:
   - Edit `config.js` and set the default value:
   ```javascript
   window.APP_CONFIG = {
       BLOCKFROST_API_KEY: 'your_api_key_here',
       API_BASE_URL: 'https://cardano-mainnet.blockfrost.io/api/v0'
   };
   ```

### Running the Project

1. Ensure all files are in the same directory
2. Open `index.html` in your web browser
3. The application will automatically load your API key from the `.env` file

### Troubleshooting

- **"Invalid Blockfrost API key" error**: Check that your API key is correctly set in the `.env` file
- **CORS issues**: Ensure you're running the project from a local server (not directly from file://)
- **API rate limits**: Free Blockfrost accounts have rate limits; consider upgrading if needed

### Project Structure

```
├── index.html          # Main landing page
├── dashboard.html      # NFT dashboard
├── styles.css          # Styling
├── main.js            # Main application logic
├── config.js          # Configuration loader
├── three-web.js       # 3D web effects
├── .env               # Environment variables (not in git)
├── .gitignore         # Git ignore rules
└── images/            # Project assets
    └── logo.png
