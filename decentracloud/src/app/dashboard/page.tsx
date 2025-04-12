"use client";

import { useState, useEffect } from "react";
import { useWeb3 } from "@/hooks/use-web3";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { FileList } from "@/components/file-list";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Wallet, Database, HardDrive } from "lucide-react";

export default function Dashboard() {
  const { account, connect } = useWeb3();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!account) {
    return (
      <div className="container py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="glass-card border-none shadow-xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg opacity-10 -z-10"></div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Connect Your Wallet
              </CardTitle>
              <CardDescription className="text-center">
                You need to connect your wallet to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="bg-muted/50 border-primary/20">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertTitle>Wallet Required</AlertTitle>
                <AlertDescription>
                  DecentraCloud uses blockchain technology to store your files
                  securely. Please connect your Ethereum wallet to continue.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button
                onClick={connect}
                className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 px-4">
      <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/10">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-white/5"></div>
        <h1 className="text-3xl font-bold rainbow-text">
          Your Decentralized Storage
        </h1>
        <p className="text-muted-foreground mt-2">
          Securely store and manage your files on the blockchain
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="feature-card border border-primary/10 shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <HardDrive className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Upload Files</CardTitle>
            </div>
            <CardDescription>
              Upload your files to decentralized storage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader />
          </CardContent>
        </Card>

        <Card className="feature-card border border-secondary/10 shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-secondary/10">
                <Database className="h-5 w-5 text-secondary" />
              </div>
              <CardTitle>Your Files</CardTitle>
            </div>
            <CardDescription>Manage your stored files</CardDescription>
          </CardHeader>
          <CardContent>
            <FileList />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Connected wallet: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      </div>
    </div>
  );
}
