"use client";

import type React from "react";

import { createContext, useState } from "react";
import Web3 from "web3";
import DecentraCloudABI from "@/contracts/DecentraCloud.json";

// Add TypeScript interfaces for Ethereum provider
interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (result: any) => void) => void;
  isMetaMask?: boolean;
}

// Declare window.ethereum
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const Web3Context = createContext<{
  web3: Web3 | null;
  account: string | null;
  contract: any | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  error: string | null;
}>({
  web3: null,
  account: null,
  contract: null,
  connect: async () => {},
  disconnect: () => {},
  isConnecting: false,
  error: null,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Contract address from deployment
  const contractAddress = "0xAb2f218aA7A387607450c57f1ae504B28090c006"; // Updated with newly deployed contract address
  
  // Required network ID (Sepolia = 11155111)
  const REQUIRED_NETWORK_ID = 11155111;

  console.log("Using contract address:", contractAddress);
  console.log("ABI available:", typeof DecentraCloudABI.abi !== "undefined");
  console.log("First ABI function:", DecentraCloudABI.abi[2]?.name);

  const initializeWeb3 = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Create Web3 instance
        const web3Instance = new Web3(window.ethereum as any);
        setWeb3(web3Instance);

        // Check network ID
        const networkId = await web3Instance.eth.net.getId();
        console.log("Connected to network ID:", networkId);

        if (networkId !== REQUIRED_NETWORK_ID) {
          setError("Please connect to Sepolia testnet");
          // Request network switch
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: Web3.utils.toHex(REQUIRED_NETWORK_ID) }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: Web3.utils.toHex(REQUIRED_NETWORK_ID),
                      chainName: "Sepolia",
                      nativeCurrency: {
                        name: "Sepolia ETH",
                        symbol: "ETH",
                        decimals: 18,
                      },
                      rpcUrls: ["https://rpc.sepolia.org"],
                      blockExplorerUrls: ["https://sepolia.etherscan.io"],
                    },
                  ],
                });
              } catch (addError) {
                console.error("Error adding network:", addError);
              }
            }
            return;
          }
        }

        if (accounts.length > 0) {
          const userAccount = accounts[0];
          setAccount(userAccount);
          console.log("Connected account:", userAccount);

          try {
            // Initialize contract
            try {
              console.log("Initializing contract with address:", contractAddress);
              console.log("ABI:", JSON.stringify(DecentraCloudABI.abi[0], null, 2));
              
              const contractInstance = new web3Instance.eth.Contract(
                DecentraCloudABI.abi,
                contractAddress
              );
              
              // Test if contract is accessible
              await contractInstance.methods.getFileCount().call();
              
              setContract(contractInstance);
              console.log("Contract initialized and tested successfully");
            } catch (contractError) {
              console.error("Contract initialization error:", contractError);
              setError("Failed to initialize contract. Make sure you're connected to Sepolia and the contract is deployed.");
              return;
            }

            // Test a simple contract call
            try {
              const fileCount = await contract.methods
                .getFileCount()
                .call({ from: userAccount });
              console.log("File count retrieved successfully:", fileCount);
            } catch (callError) {
              console.error("Test contract call failed:", callError);
              setError(
                "Contract connection error: Unable to make test call. Make sure your wallet is connected to the right network."
              );
            }
          } catch (contractError) {
            console.error("Contract initialization error:", contractError);
            setError(
              "Failed to initialize contract. Check console for details."
            );
          }
        }

        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          setAccount(accounts[0] || null);
        });

        // Listen for chain changes
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error initializing web3:", error);
        setError("Failed to connect to wallet");
      }
    } else {
      setError("Please install MetaMask to use this application");
    }
  };

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      await initializeWeb3();
    } catch (error) {
      console.error("Connection error:", error);
      setError("Failed to connect to wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setContract(null);
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        account,
        contract,
        connect,
        disconnect,
        isConnecting,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
