import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Lock,
  Database,
  Cloud,
  Code,
  Users,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="container py-16 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 rainbow-text">
          About DecentraCloud
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Revolutionizing cloud storage with blockchain technology. Secure,
          decentralized, and accessible to everyone.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <Card className="feature-card border border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
            <CardDescription>
              Empowering users with secure, decentralized storage solutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              DecentraCloud aims to revolutionize the way we store and manage
              digital assets. By leveraging blockchain technology, we provide a
              secure, transparent, and accessible storage solution that puts
              users in control of their data.
            </p>
          </CardContent>
        </Card>

        <Card className="feature-card border border-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-secondary" />
              Our Vision
            </CardTitle>
            <CardDescription>
              Building the future of decentralized storage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We envision a world where data storage is secure, transparent, and
              accessible to everyone. Our platform combines cutting-edge
              blockchain technology with user-friendly interfaces to create a
              seamless experience for storing and managing digital assets.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Technology Stack */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Technology Stack
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="feature-card border border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Smart Contracts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built on Ethereum using Solidity, our smart contracts ensure
                secure and transparent file storage operations.
              </p>
            </CardContent>
          </Card>

          <Card className="feature-card border border-secondary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-secondary" />
                IPFS Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Leveraging IPFS for distributed file storage, ensuring high
                availability and redundancy.
              </p>
            </CardContent>
          </Card>

          <Card className="feature-card border border-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-accent" />
                Web3.js
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Using Web3.js for seamless blockchain interaction and real-time
                updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="feature-card border border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                End-to-end encryption and blockchain-based verification ensure
                your data remains secure and tamper-proof.
              </p>
            </CardContent>
          </Card>

          <Card className="feature-card border border-secondary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-secondary" />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your data is encrypted and distributed across the network,
                ensuring complete privacy and control.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust DecentraCloud for their storage
          needs. Start storing your files securely on the blockchain today.
        </p>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="gap-1.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
          >
            Start Using DecentraCloud
          </Button>
        </Link>
      </div>
    </div>
  );
}
