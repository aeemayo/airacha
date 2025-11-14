# 🪡 Airacha - Decentralized Storage DApp

A modern, user-friendly decentralized application (DApp) for uploading, managing, and sharing files using **Storacha** (decentralized IPFS storage). Built with React and the `@storacha/client` library.

## 🚀 Features

### Core Functionality
- ✅ **Email-based Authentication** - Secure login via Storacha
- ✅ **Create Storage Spaces** - Create unique, personal storage namespaces
- ✅ **Use Existing Spaces** - Join and collaborate on shared spaces
- ✅ **File Upload** - Upload any file type (images, documents, videos, etc.)
- ✅ **IPFS Gateway Links** - Instant shareable links for uploaded content
- ✅ **File History** - Persistent file tracking with localStorage
- ✅ **File Management** - Copy CIDs, view on gateway, delete from history

### Technical Features
- 🌐 Built with **React** and **Storacha Client**
- 📦 **IPFS/Content Addressing** - Cryptographic file identification
- 🔐 **Decentralized** - No centralized servers, truly peer-to-peer
- 💾 **Persistent Storage** - Browser localStorage for file history
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎨 **Beautiful UI** - Modern dark theme with smooth animations

## 📋 Prerequisites

- **Node.js** version 22 or higher
- **npm** version 7 or higher
- A Storacha account (free at [storacha.network](https://storacha.network))

Check your versions:
```bash
node --version && npm --version
```

## 🛠️ Installation

1. **Clone the repository:**
```bash
git clone https://github.com/aeemayo/airacha.git
cd airacha
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### 1️⃣ **Create a New Space**

```
1. Click "Create New Space"
2. Enter your email address
3. Check your email and click the verification link
4. Select a payment plan (if prompted)
5. Enter a space name (e.g., "my-storage")
6. Click "Create Space"
```

Once created, you'll see your **Space DID** - this is your unique identifier you can share with others.

### 2️⃣ **Join an Existing Space**

```
1. Click "Use Existing Space"
2. Paste the Space DID shared by another user
3. Click "Use Space"
4. You can now upload and manage files in this shared space
```

### 3️⃣ **Upload Files**

```
1. Select a file from your device
2. Click "Upload File"
3. Wait for the upload to complete
4. View your file in the "Uploaded Files" section
```

### 4️⃣ **Share Your Files**

Each uploaded file has:
- **CID** (Content IDentifier) - The cryptographic hash of your file
- **Gateway Link** - View button to access on IPFS gateway
- **Copy CID** - Share the hash with anyone

Gateway URL format:
```
https://{CID}.ipfs.storacha.link
```

## 📁 Project Structure

```
airacha/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── airacha.png          # Background image
├── src/
│   ├── App.js               # Main DApp component
│   ├── App.css              # Styling
│   ├── index.js             # React entry point
│   ├── App.test.js          # Tests
│   └── setupTests.js
├── package.json
└── README.md
```

## 🔧 Available Commands

### Development
```bash
npm start
```
Runs the app in development mode with hot reload.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `build/` folder.

### Run Tests
```bash
npm test
```
Launches the test runner in interactive watch mode.

## 🌐 Deployment

Deploy your DApp to the web using any of these services:

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
# Follow GitHub Pages setup in package.json
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build first
npm run build

# Drag and drop 'build' folder to Netlify
# Or use Netlify CLI
```

## 🔑 Key Concepts

### Space
A unique storage namespace identified by a **DID** (Decentralized Identifier). Think of it as a personal or shared folder in the cloud.

### CID (Content Identifier)
A cryptographic hash of your file content. It's unique to the file data and can never change. Share CIDs to let others retrieve your files.

### IPFS Gateway
A server that retrieves content from the IPFS network using a CID. Storacha provides a default gateway at `storacha.link`.

### DID (Decentralized Identifier)
A unique identifier for your space. Format: `did:key:z6MkhaXgBZDvotDtL5M7bs...`

## 📚 Documentation

- **Storacha Docs**: [docs.storacha.network](https://docs.storacha.network/)
- **JS Client Guide**: [docs.storacha.network/js-client](https://docs.storacha.network/js-client/)
- **Awesome Storacha**: [github.com/storacha/awesome-storacha](https://github.com/storacha/awesome-storacha)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Storacha Network](https://storacha.network) - Decentralized storage infrastructure
- [IPFS](https://ipfs.tech) - InterPlanetary File System
- [React](https://react.dev) - UI library
- [Create React App](https://create-react-app.dev) - Project bootstrapping

## 💬 Support

Need help? Check out:
- [Storacha Discord](https://discord.gg/pqa6Dn6RnP)
- [GitHub Issues](https://github.com/aeemayo/airacha/issues)
- [Storacha Docs FAQ](https://docs.storacha.network/faq/)

---

**Built with ❤️ using Storacha**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
