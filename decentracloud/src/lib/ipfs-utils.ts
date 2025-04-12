// Function to convert CIDv0 to CIDv1
export function convertToV1CID(cidv0: string): string {
  try {
    // Check if it's already a CIDv1 (starts with 'b')
    if (cidv0.startsWith('b')) {
      return cidv0;
    }

    // If it's a CIDv0 (starts with 'Qm'), convert to base32
    if (cidv0.startsWith('Qm')) {
      // Use base32 encoding for better browser compatibility
      return `b${cidv0}`;
    }

    return cidv0;
  } catch (error) {
    console.error('Error converting CID:', error);
    return cidv0;
  }
}

// Function to get a working IPFS gateway URL
export function getIPFSUrl(ipfsHash: string, fileName: string): string {
  const gateways = [
    'https://ipfs.io/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
    'https://gateway.pinata.cloud/ipfs/',
    'https://dweb.link/ipfs/'
  ];

  // Use the first gateway as default
  const baseUrl = gateways[0];
  const encodedFileName = encodeURIComponent(fileName);
  
  return `${baseUrl}${ipfsHash}?filename=${encodedFileName}`;
}
