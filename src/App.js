import { useState } from 'react';
import { Client } from '@storacha/client';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setCid('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    setUploading(true);
    try {
      const storacha = new Client();
      const uploadedFile = await storacha.upload(file);
      setCid(uploadedFile.cid);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please check the console for more details.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Storacha Mini DApp</h1>
        <div className="upload-container">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={!file || uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {cid && (
          <div className="result-container">
            <p>File uploaded successfully!</p>
            <p>
              <strong>CID:</strong> {cid}
            </p>
            <p>
              <strong>Gateway Link:</strong>{' '}
              <a
                href={`https://gateway.storacha.net/ipfs/${cid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`https://gateway.storacha.net/ipfs/${cid}`}
              </a>
            </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
