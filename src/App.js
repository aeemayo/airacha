import { useState, useEffect } from 'react';
import { create } from '@storacha/client';
import './App.css';
import backgroundImage from './airacha.png';

function App() {
  const [client, setClient] = useState(null);
  const [account, setAccount] = useState(null);
  const [space, setSpace] = useState(null);
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [spaceName, setSpaceName] = useState('');
  const [isCreatingSpace, setIsCreatingSpace] = useState(false);
  const [spaceDid, setSpaceDid] = useState('');
  const [isLoadingSpace, setIsLoadingSpace] = useState(false);
  const [spaceMode, setSpaceMode] = useState(null); // 'create' or 'use-existing'

  // Initialize the Storacha client
  useEffect(() => {
    const initializeClient = async () => {
      try {
        const newClient = await create();
        setClient(newClient);
      } catch (error) {
        console.error('Error initializing Storacha client:', error);
      }
    };
    initializeClient();

    // Load uploaded files from localStorage
    const savedFiles = localStorage.getItem('uploadedFiles');
    if (savedFiles) {
      try {
        setUploadedFiles(JSON.parse(savedFiles));
      } catch (error) {
        console.error('Error loading saved files:', error);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !client) return;

    setIsLoggingIn(true);
    try {
      const newAccount = await client.login(email);
      setAccount(newAccount);
      
      // Wait for payment plan
      await newAccount.plan.wait();
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Check your email and try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
    if (!spaceName || !account || !client) return;

    setIsCreatingSpace(true);
    try {
      const newSpace = await client.createSpace(spaceName, { account });
      await client.setCurrentSpace(newSpace.did());
      setSpace(newSpace);
    } catch (error) {
      console.error('Error creating space:', error);
      alert('Error creating space. Please try again.');
    } finally {
      setIsCreatingSpace(false);
    }
  };

  const handleUseExistingSpace = async (e) => {
    e.preventDefault();
    if (!spaceDid || !client) return;

    setIsLoadingSpace(true);
    try {
      // Set the current space using the DID
      await client.setCurrentSpace(spaceDid);
      
      // Get the current space to confirm it was set
      const currentSpace = await client.currentSpace();
      if (!currentSpace) {
        throw new Error('Failed to load space. The DID may be invalid.');
      }
      
      setSpace(currentSpace);
      setSpaceName(currentSpace.name || `Space ${spaceDid.substring(0, 10)}...`);
    } catch (error) {
      console.error('Error loading space:', error);
      alert(`Error loading space: ${error.message || 'Make sure the DID is correct and you have access to this space.'}`);
    } finally {
      setIsLoadingSpace(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !space) {
      alert('Please select a file and ensure a space is created!');
      return;
    }

    setUploading(true);
    try {
      const cid = await client.uploadFile(file);
      const fileEntry = {
        id: Date.now(), // Unique identifier for each upload
        name: file.name,
        cid: cid.toString(),
        size: file.size,
        uploadedAt: new Date().toLocaleString(),
        spaceDid: space.did(),
      };
      
      const updatedFiles = [fileEntry, ...uploadedFiles];
      setUploadedFiles(updatedFiles);
      
      // Save to localStorage
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      
      setFile(null);
      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please check the console for more details.');
    } finally {
      setUploading(false);
    }
  };

  const getGatewayUrl = (cid) => {
    return `https://${cid}.ipfs.storacha.link`;
  };

  const handleDeleteFile = (fileId) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
  };

  const handleClearAllFiles = () => {
    if (window.confirm('Are you sure you want to clear all uploaded files from history?')) {
      setUploadedFiles([]);
      localStorage.removeItem('uploadedFiles');
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url('${backgroundImage}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>
      <header className="App-header">
        <h1>🪡 Airacha - DApp Storage</h1>
        
        {!isLoggedIn ? (
          <div className="auth-container">
            <h2>Login with Storacha</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={isLoggingIn || !client}>
                {isLoggingIn ? 'Sending verification email...' : 'Login'}
              </button>
            </form>
            <p className="info-text">Check your email for a confirmation link to complete login.</p>
          </div>
        ) : !space ? (
          <div className="space-mode-container">
            {!spaceMode ? (
              <div className="space-options">
                <h2>Choose an Option</h2>
                <button onClick={() => setSpaceMode('create')} className="mode-btn">
                  Create New Space
                </button>
                <button onClick={() => setSpaceMode('use-existing')} className="mode-btn">
                  Use Existing Space
                </button>
              </div>
            ) : spaceMode === 'create' ? (
              <div className="space-container">
                <button 
                  onClick={() => setSpaceMode(null)} 
                  className="back-btn"
                >
                  ← Back
                </button>
                <h2>Create Your Storage Space</h2>
                <form onSubmit={handleCreateSpace}>
                  <input
                    type="text"
                    placeholder="Enter space name (e.g., my-storage)"
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={isCreatingSpace}>
                    {isCreatingSpace ? 'Creating space...' : 'Create Space'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-container">
                <button 
                  onClick={() => setSpaceMode(null)} 
                  className="back-btn"
                >
                  ← Back
                </button>
                <h2>Use Existing Space</h2>
                <form onSubmit={handleUseExistingSpace}>
                  <textarea
                    placeholder="Paste your Space DID here (e.g., did:key:...)"
                    value={spaceDid}
                    onChange={(e) => setSpaceDid(e.target.value)}
                    rows="4"
                    required
                  />
                  <button type="submit" disabled={isLoadingSpace}>
                    {isLoadingSpace ? 'Loading space...' : 'Use Space'}
                  </button>
                </form>
                <p className="info-text">Don't have a Space DID? Create a new space instead.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="upload-section">
            <div className="space-info">
              <p><strong>Space:</strong> {spaceName}</p>
              <p><strong>Space DID:</strong> {space.did()}</p>
            </div>
            
            <div className="upload-container">
              <h2>Upload Your Files</h2>
              <input 
                type="file" 
                onChange={handleFileChange} 
                disabled={uploading}
              />
              <button 
                onClick={handleUpload} 
                disabled={!file || uploading}
              >
                {uploading ? 'Uploading...' : 'Upload File'}
              </button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="files-list-container">
                <div className="files-header">
                  <h2>Uploaded Files ({uploadedFiles.length})</h2>
                  <button 
                    onClick={handleClearAllFiles}
                    className="clear-all-btn"
                  >
                    Clear History
                  </button>
                </div>
                <div className="files-list">
                  {uploadedFiles.map((fileEntry) => (
                    <div key={fileEntry.id} className="file-item">
                      <div className="file-details">
                        <p><strong>Name:</strong> {fileEntry.name}</p>
                        <p><strong>CID:</strong> <code>{fileEntry.cid.substring(0, 20)}...</code></p>
                        <p><strong>Size:</strong> {(fileEntry.size / 1024).toFixed(2)} KB</p>
                        <p><strong>Uploaded:</strong> {fileEntry.uploadedAt}</p>
                      </div>
                      <div className="file-links">
                        <a 
                          href={getGatewayUrl(fileEntry.cid)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="gateway-link"
                        >
                          View on Gateway
                        </a>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(fileEntry.cid);
                            alert('CID copied to clipboard!');
                          }}
                          className="copy-btn"
                        >
                          Copy CID
                        </button>
                        <button 
                          onClick={() => handleDeleteFile(fileEntry.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
