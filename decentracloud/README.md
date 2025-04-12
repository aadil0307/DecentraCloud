![tw-banner](https://github.com/thirdweb-example/next-starter/assets/57885104/20c8ce3b-4e55-4f10-ae03-2fe4743a5ee8)

# DecentraCloud: Decentralized Cloud Storage

A decentralized cloud storage application built with Next.js and thirdweb.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your thirdweb Client ID:

   - Go to [thirdweb dashboard](https://thirdweb.com/create-api-key)
   - Create a new project to get your Client ID
   - Copy the `.env.example` file to `.env.local` and add your Client ID:
     ```
     NEXT_PUBLIC_TEMPLATE_CLIENT_ID="your-client-id-here"
     ```
   - For development purposes, a test Client ID is provided automatically

4. Deploy the smart contract:

   ```bash
   # Navigate to the ethereum directory
   cd ethereum

   # Install dependencies
   npm install

   # Compile the contract
   npx hardhat compile

   # Run tests
   npx hardhat test

   # Deploy to local network
   npx hardhat node
   # Open a new terminal and run:
   npx hardhat run scripts/deploy.ts --network localhost

   # Or deploy to a testnet (e.g., Sepolia)
   # Add your private key and RPC URL to .env file:
   # PRIVATE_KEY=your-private-key
   # SEPOLIA_RPC_URL=your-rpc-url
   # npx hardhat run scripts/deploy.ts --network sepolia
   ```

5. Update the contract address in your `.env.local` file:

   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS="your-deployed-contract-address"
   ```

6. Run the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Decentralized file storage using IPFS
- Web3 authentication with thirdweb
- Secure file sharing
- User-friendly interface

## Technologies Used

- Next.js
- thirdweb SDK
- Web3.js
- Hardhat
- Solidity
- IPFS
- TypeScript
- Tailwind CSS

## Smart Contract

The DecentraCloud smart contract manages file metadata on the Ethereum blockchain:

- `uploadFile`: Store file metadata (name, type, size, IPFS hash)
- `getFileCount`: Get the number of files
- `getFile`: Retrieve file metadata
- `deleteFile`: Mark a file as deleted

The actual file data is stored on IPFS, with only the metadata and hash references stored on the blockchain.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [thirdweb Documentation](https://portal.thirdweb.com/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [IPFS Documentation](https://docs.ipfs.tech/)

## Installation

Install the template using [thirdweb create](https://portal.thirdweb.com/cli/create)

```bash
  npx thirdweb create app --next
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`CLIENT_ID`

To learn how to create a client ID, refer to the [client documentation](https://portal.thirdweb.com/typescript/v5/client).

## Run locally

Install dependencies

```bash
yarn
```

Start development server

```bash
yarn dev
```

Create a production build

```bash
yarn build
```

Preview the production build

```bash
yarn start
```

## Resources

- [Documentation](https://portal.thirdweb.com/typescript/v5)
- [Templates](https://thirdweb.com/templates)
- [YouTube](https://www.youtube.com/c/thirdweb)
- [Blog](https://blog.thirdweb.com)

## Need help?

For help or feedback, please [visit our support site](https://thirdweb.com/support)
