"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Cloud, Home, Database, Info } from "lucide-react";
import { useWeb3 } from "@/hooks/use-web3";
import { Button } from "./ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const { account, connect, disconnect } = useWeb3();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover-lift">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold rainbow-text">
              DecentraCloud
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center text-sm font-medium transition-colors hover:text-primary hover-lift ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="mr-1 h-4 w-4" />
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`flex items-center text-sm font-medium transition-colors hover:text-primary hover-lift ${
              pathname === "/dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <Database className="mr-1 h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/about"
            className={`flex items-center text-sm font-medium transition-colors hover:text-primary hover-lift ${
              pathname === "/about" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Info className="mr-1 h-4 w-4" />
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <ThemeToggle />
          </div>

          {account ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="text-sm px-3 py-2 bg-primary/10 text-primary rounded-md font-mono hover-lift">
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={disconnect}
                className="border-primary/20 text-primary hover:bg-primary/10 hover-lift"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              onClick={connect}
              size="sm"
              className="gap-1.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover-lift"
            >
              Connect
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
