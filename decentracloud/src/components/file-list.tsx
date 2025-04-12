"use client";

import { useState, useEffect } from "react";
import { useWeb3 } from "@/hooks/use-web3";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileIcon, Trash2 } from "lucide-react";
import { formatBytes } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { ipfsDownload } from "@/lib/ipfs";

interface FileData {
  id: number;
  name: string;
  fileType: string;
  size: number;
  ipfsHash: string;
  uploadDate: number;
}

export function FileList() {
  const { contract, account } = useWeb3();
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFiles = async () => {
    if (!contract || !account) return;

    try {
      setLoading(true);
      setError("");

      console.log("Loading files for account:", account);
      console.log("Contract instance:", contract);
      console.log("Contract methods:", Object.keys(contract.methods));

      try {
        // Get file count from contract
        const fileCount = await contract.methods
          .getFileCount()
          .call({ from: account });

        console.log("File count:", fileCount);

        // Get all files
        const filesData: FileData[] = [];

        // Convert fileCount to a number to ensure proper for loop
        const count = parseInt(fileCount.toString(), 10);
        console.log("Processing", count, "files");

        for (let i = 0; i < count; i++) {
          try {
            console.log("Fetching file", i);

            // Wrap in try-catch to handle potentially deleted files
            try {
              // Call getFile with proper gas limit to avoid out-of-gas errors
              const file = await contract.methods.getFile(i).call({
                from: account,
                gas: 500000, // Explicit gas limit to prevent out of gas errors
              });

              console.log("Raw file data:", file);

              // Check if we received valid data before processing
              if (file) {
                let fileName = "";
                let fileType = "";
                let fileSize = 0;
                let ipfsHash = "";
                let uploadDate = 0;

                // Handle different return formats from Web3.js
                if (typeof file === "object") {
                  if (Array.isArray(file)) {
                    // Handle array-like result
                    [fileName, fileType, fileSize, ipfsHash, uploadDate] = file;
                  } else if ("0" in file || 0 in file) {
                    // Handle object with numeric keys (most common Web3.js format)
                    fileName = file["0"] || file[0] || "";
                    fileType = file["1"] || file[1] || "";
                    fileSize = file["2"] || file[2] || 0;
                    ipfsHash = file["3"] || file[3] || "";
                    uploadDate = file["4"] || file[4] || 0;
                  } else if ("name" in file) {
                    // Handle object with named properties
                    fileName = file.name || "";
                    fileType = file.fileType || "";
                    fileSize = file.size || 0;
                    ipfsHash = file.ipfsHash || "";
                    uploadDate = file.uploadDate || 0;
                  }

                  // Only add the file if we got valid data
                  if (fileName && ipfsHash) {
                    const fileData = {
                      id: i,
                      name: fileName,
                      fileType: fileType,
                      size: parseInt(fileSize.toString() || "0", 10),
                      ipfsHash: ipfsHash,
                      uploadDate:
                        parseInt(uploadDate.toString() || "0", 10) * 1000,
                    };

                    filesData.push(fileData);
                    console.log("Processed file data:", fileData);
                  }
                }
              }
            } catch (err) {
              console.error(`Error processing file ${i}:`, err);
              // Skip this file but continue with others
            }
          } catch (fileError) {
            console.error(`Error retrieving file ${i}:`, fileError);
            // Skip this file but continue with others
          }
        }

        // Sort by upload date (newest first)
        filesData.sort((a, b) => b.uploadDate - a.uploadDate);

        console.log("All processed files:", filesData);
        setFiles(filesData);
      } catch (contractError: any) {
        console.error("Contract call error:", contractError);
        setError(
          `Failed to call contract methods: ${
            contractError.message || "Unknown error"
          }. Ensure you're connected to the correct network.`
        );
      }
    } catch (error: any) {
      console.error("Error loading files:", error);
      setError(
        `Failed to load your files: ${error.message || "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (ipfsHash: string, fileName: string) => {
    try {
      toast.loading("Preparing download...");
      
      // Get file extension and type
      const fileExt = fileName.split('.').pop() || '';
      const fileType = getFileType(fileExt);
      
      // Create dummy content based on file type
      let content = '';
      if (fileType.startsWith('text/')) {
        content = `This is a dummy file for ${fileName}\nIPFS Hash: ${ipfsHash}\nCreated for demonstration purposes.`;
      } else if (fileType.startsWith('image/')) {
        // Create a small colored square as dummy image
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#' + ipfsHash.substr(2, 6);
          ctx.fillRect(0, 0, 100, 100);
          content = canvas.toDataURL().split(',')[1];
        }
      }
      
      // Create blob with appropriate type
      const blob = fileType.startsWith('image/') 
        ? new Blob([Uint8Array.from(atob(content), c => c.charCodeAt(0))], { type: fileType })
        : new Blob([content], { type: fileType });
      
      // Create download URL
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      
      // Trigger download
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
      
      toast.success("Download started!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file. Please try again.");
    }
  };

  // Helper function to determine file type
  const getFileType = (extension: string): string => {
    const typeMap: { [key: string]: string } = {
      // Text files
      'txt': 'text/plain',
      'md': 'text/markdown',
      'js': 'text/javascript',
      'ts': 'text/typescript',
      'html': 'text/html',
      'css': 'text/css',
      // Image files
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'webp': 'image/webp',
      // Document files
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // Default
      'default': 'application/octet-stream'
    };
    
    return typeMap[extension.toLowerCase()] || typeMap.default;
  };

  const handleDelete = async (fileId: number) => {
    if (!contract || !account) return;

    try {
      console.log("Deleting file with ID:", fileId);
      await contract.methods.deleteFile(fileId).send({ from: account });
      console.log("File deleted successfully");
      // Refresh file list
      loadFiles();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Load files on component mount and when account changes
  useEffect(() => {
    if (contract && account) {
      loadFiles();
    }
  }, [contract, account]);

  // Listen for file upload events
  useEffect(() => {
    const handleFileUploaded = () => {
      loadFiles();
    };

    window.addEventListener("fileUploaded", handleFileUploaded);

    return () => {
      window.removeEventListener("fileUploaded", handleFileUploaded);
    };
  }, []);

  if (loading) {
    return <p className="text-center py-4">Loading your files...</p>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        <FileIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>You haven't uploaded any files yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="border border-muted/20 rounded-lg overflow-hidden">
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="text-primary/90 font-semibold">
              Name
            </TableHead>
            <TableHead className="hidden md:table-cell text-primary/90 font-semibold">
              Size
            </TableHead>
            <TableHead className="hidden md:table-cell text-primary/90 font-semibold">
              Date
            </TableHead>
            <TableHead className="text-right text-primary/90 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow
              key={file.id}
              className="hover:bg-muted/10 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4 text-primary" />
                  <span className="truncate max-w-[180px]">{file.name}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {formatBytes(file.size)}
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {new Date(file.uploadDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDownload(file.ipfsHash, file.name)}
                    title="Download"
                    className="hover:text-primary hover:border-primary transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(file.id)}
                    title="Delete"
                    className="hover:text-destructive hover:border-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
