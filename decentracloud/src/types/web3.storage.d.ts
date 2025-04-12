declare module 'web3.storage' {
  export interface Web3StorageOptions {
    token: string;
  }

  export interface PutOptions {
    name?: string;
    maxRetries?: number;
    onRootCidReady?: (cid: string) => void;
    onStoredChunk?: (size: number) => void;
  }

  export class Web3Storage {
    constructor(options: Web3StorageOptions);
    put(files: File[], options?: PutOptions): Promise<string>;
    get(cid: string): Promise<Web3Response>;
  }

  export interface Web3Response {
    ok: boolean;
    files(): Promise<Web3File[]>;
  }

  export interface Web3File extends File {
    cid: string;
  }
}
