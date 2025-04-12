// IPFS Gateway URLs
const IPFS_GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://gateway.ipfs.io/ipfs/'
];

// Helper to get a random gateway URL
const getRandomGateway = () => {
  const index = Math.floor(Math.random() * IPFS_GATEWAYS.length);
  return IPFS_GATEWAYS[index];
};

// Helper to create a CID from file content
async function calculateCID(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  
  // Simple hash function for demo (replace with proper CID calculation in production)
  let hash = 0;
  for (let i = 0; i < bytes.length; i++) {
    hash = ((hash << 5) - hash) + bytes[i];
    hash = hash & hash;
  }
  
  // Create a mock CID format
  return `Qm${Math.abs(hash).toString(16).padStart(44, '0')}`;
}

export async function ipfsUpload(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    // Show initial progress
    if (onProgress) onProgress(10);

    // Validate file
    if (!file) throw new Error('No file provided');
    console.log('Processing file:', file.name, 'Size:', file.size);

    // Calculate mock CID
    if (onProgress) onProgress(30);
    const cid = await calculateCID(file);
    console.log('Generated CID:', cid);

    // Store file in localStorage for demo
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      content: await file.text()
    };
    localStorage.setItem(`ipfs_${cid}`, JSON.stringify(fileData));
    
    if (onProgress) onProgress(90);
    console.log('File stored locally with CID:', cid);

    // Show completion
    if (onProgress) onProgress(100);


    return cid;
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw error;
  }
}

export async function ipfsDownload(hash: string): Promise<Blob> {
  try {
    // Validate hash
    if (!hash) throw new Error('No IPFS hash provided');
    console.log('Retrieving file with hash:', hash);

    // For demo: get file from localStorage
    const storedData = localStorage.getItem(`ipfs_${hash}`);
    if (storedData) {
      const fileData = JSON.parse(storedData);
      console.log('File found:', fileData.name);
      
      // Create blob from stored content
      const blob = new Blob([fileData.content], {
        type: fileData.type || 'application/octet-stream'
      });
      
      console.log('Blob created. Size:', blob.size);
      return blob;
    }

    throw new Error('File not found in local storage');
  } catch (error) {
    console.error('File retrieval error:', error);
    throw error;
  }
}
