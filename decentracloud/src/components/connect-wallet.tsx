"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/hooks/use-web3";
import { Wallet } from "lucide-react";

export function ConnectWallet() {
  const { account, connect, disconnect } = useWeb3();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!account) {
    return (
      <Button onClick={connect} variant="outline" size="sm">
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <Button onClick={disconnect} variant="outline" size="sm">
      <Wallet className="mr-2 h-4 w-4" />
      {account.substring(0, 6)}...{account.substring(account.length - 4)}
    </Button>
  );
}
