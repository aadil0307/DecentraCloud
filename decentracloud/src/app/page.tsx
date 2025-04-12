import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Database,
  Lock,
  Upload,
  Shield,
  Cloud,
  Zap,
  Globe,
  Users,
  CheckCircle2,
  BarChart,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10"></div>
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-white/5 -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <span className="rainbow-text">Decentralized</span> Cloud
                    Storage
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Store your files securely on the blockchain. No central
                    authority, no data breaches, just pure decentralized
                    storage.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="gap-1.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/10"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="feature-card flex flex-col items-center space-y-2 rounded-xl p-4 border border-primary/10 shadow-sm">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Secure</h3>
                    <p className="text-center text-muted-foreground">
                      Your files are encrypted and stored across the blockchain
                    </p>
                  </div>
                  <div className="feature-card flex flex-col items-center space-y-2 rounded-xl p-4 border border-secondary/10 shadow-sm">
                    <div className="p-2 bg-secondary/10 rounded-full">
                      <Database className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold">Decentralized</h3>
                    <p className="text-center text-muted-foreground">
                      No single point of failure or central authority
                    </p>
                  </div>
                  <div className="feature-card flex flex-col items-center space-y-2 rounded-xl p-4 border border-secondary/10 shadow-sm">
                    <div className="p-2 bg-secondary/10 rounded-full">
                      <Upload className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold">Easy to Use</h3>
                    <p className="text-center text-muted-foreground">
                      Simple interface for uploading and managing files
                    </p>
                  </div>
                  <div className="feature-card flex flex-col items-center space-y-2 rounded-xl p-4 border border-primary/10 shadow-sm">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Affordable</h3>
                    <p className="text-center text-muted-foreground">
                      Pay only for what you use with transparent pricing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="feature-card border border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">10,000+</p>
                  <p className="text-muted-foreground">Trusting our platform</p>
                </CardContent>
              </Card>
              <Card className="feature-card border border-secondary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-secondary" />
                    Files Stored
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">1M+</p>
                  <p className="text-muted-foreground">Securely stored</p>
                </CardContent>
              </Card>
              <Card className="feature-card border border-accent/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" />
                    Network Nodes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">100+</p>
                  <p className="text-muted-foreground">Distributed globally</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose DecentraCloud?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the future of file storage with our cutting-edge
                blockchain technology
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="feature-card border border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Lightning Fast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Upload and download files at blazing speeds with our
                    optimized network
                  </p>
                </CardContent>
              </Card>
              <Card className="feature-card border border-secondary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-secondary" />
                    Cost Effective
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pay only for what you use with our transparent pricing model
                  </p>
                </CardContent>
              </Card>
              <Card className="feature-card border border-accent/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    24/7 Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Access your files anytime, anywhere with our global network
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple, secure, and efficient file storage process
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Upload</h3>
                <p className="text-muted-foreground">
                  Select your files and upload them to our secure network
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-secondary/10 rounded-full mb-4">
                  <Lock className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Encrypt</h3>
                <p className="text-muted-foreground">
                  Your files are encrypted and distributed across the network
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                  <Cloud className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Access</h3>
                <p className="text-muted-foreground">
                  Access your files securely from anywhere in the world
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to get started?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of users who trust DecentraCloud for their
                  storage needs
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="gap-1.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                  >
                    Connect Your Wallet
                    <Cloud className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
