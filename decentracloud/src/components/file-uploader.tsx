"use client";

import { useState, useRef } from "react";
import { useWeb3 } from "@/hooks/use-web3";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

export function FileUploader() {
  const { contract, account } = useWeb3();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError("");
      setSuccess(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setUploadProgress(0);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadToIPFS = async (file: File) => {
    // Simulate IPFS upload with progress for demo purposes
    // In a real app, you would use a service like Pinata, Infura, or Web3.Storage

    return new Promise<string>((resolve) => {
      const totalSteps = 10;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep += 1;
        setUploadProgress(Math.floor((currentStep / totalSteps) * 100));

        if (currentStep === totalSteps) {
          clearInterval(interval);
          // Return mock IPFS hash
          resolve(
            `Qm${Math.random().toString(36).substring(2, 15)}${Math.random()
              .toString(36)
              .substring(2, 15)}`
          );
        }
      }, 300);
    });
  };

  const handleUpload = async () => {
    if (!file || !contract || !account) return;

    try {
      setUploading(true);
      setError("");
      setSuccess(false);
      setUploadProgress(0);

      // 1. Upload to IPFS (or simulated in this case)
      const ipfsHash = await uploadToIPFS(file);

      // 2. Save file metadata to smart contract
      const tx = await contract.methods
        .uploadFile(file.name, file.type, file.size, ipfsHash)
        .send({ from: account });

      console.log("Transaction successful:", tx);
      setSuccess(true);

      // Reset form after success
      resetForm();

      // Dispatch event so FileList can refresh
      window.dispatchEvent(new Event("fileUploaded"));
    } catch (error: any) {
      console.error("Upload error:", error);
      setError(error.message || "Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors rounded-lg p-6 text-center relative">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />

        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <Label className="block text-base font-medium">
            {file ? file.name : "Click or drag to upload a file"}
          </Label>
          {file && (
            <p className="text-sm text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          )}
        </div>
      </div>

      {uploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2 bg-muted" />
          <p className="text-xs text-muted-foreground text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {error && (
        <Alert
          variant="destructive"
          className="bg-destructive/10 text-destructive border-destructive/20"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>File uploaded successfully!</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2">
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="flex gap-2 items-center bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all flex-1"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload"}
        </Button>

        {file && !uploading && (
          <Button variant="outline" onClick={resetForm} className="flex-none">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
