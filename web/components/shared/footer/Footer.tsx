import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Clapperboard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background text-muted-foreground py-12 px-6 md:px-16 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-accent">
              {/* Actual logo path with primary gradient */}
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60" />
            </div>
            <span className="text-foreground font-bold text-xl tracking-tight">
              BlackTree.TV
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs text-muted-foreground">
            Watch unlimited movies, TV shows & web series anytime, anywhere.
          </p>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mt-2">
            <Clapperboard size={16} />
            Premium Streaming
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground font-semibold text-lg">Quick Links</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/movies"
              className="hover:text-primary transition-colors"
            >
              Movies
            </Link>
            <Link
              href="/series"
              className="hover:text-primary transition-colors"
            >
              TV Series
            </Link>
            <Link href="/live" className="hover:text-primary transition-colors">
              Live
            </Link>
            <Link
              href="/my-list"
              className="hover:text-primary transition-colors"
            >
              My List
            </Link>
          </nav>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground font-semibold text-lg">Categories</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <Link
              href="/action"
              className="hover:text-primary transition-colors"
            >
              Action
            </Link>
            <Link
              href="/comedy"
              className="hover:text-primary transition-colors"
            >
              Comedy
            </Link>
            <Link
              href="/horror"
              className="hover:text-primary transition-colors"
            >
              Horror
            </Link>
            <Link
              href="/romance"
              className="hover:text-primary transition-colors"
            >
              Romance
            </Link>
            <Link
              href="/sci-fi"
              className="hover:text-primary transition-colors"
            >
              Sci-Fi
            </Link>
          </nav>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground font-semibold text-lg">Support</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
          </nav>
        </div>

        {/* Connect Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground font-semibold text-lg">
            Connect With Us
          </h3>
          <div className="bg-card border border-border p-6 rounded-xl">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-4">
              Stay Updated
            </label>
            <div className="flex w-full max-w-sm items-center space-x-0">
              <Input
                type="email"
                placeholder="Email"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground rounded-r-none h-11 focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                className="bg-primary hover:opacity-90 text-primary-foreground rounded-l-none h-11 px-3 shadow-none"
              >
                <SendHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BlackTree.TV. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
