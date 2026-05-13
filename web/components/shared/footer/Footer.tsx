import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Clapperboard } from "lucide-react";
import { footerLinks } from "@/constants/footer";

import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  const { brand, sections } = footerLinks;

  return (
    <footer className={cn("bg-background text-muted-foreground py-12 px-6 md:px-16 border-t border-border", className)}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-lg">
              <Image src={brand.logo} alt={brand.name} width={70} height={70} />
            </div>
            <span className="text-foreground font-bold text-xl tracking-tight">
              {brand.name}
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs text-muted-foreground">
            {brand.description}
          </p>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mt-2">
            <Clapperboard size={16} />
            {brand.badge}
          </div>
        </div>

        {/* Dynamic Link Sections (Quick Links, Categories, Support) */}
        {sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <h3 className="text-foreground font-semibold text-lg">
              {section.title}
            </h3>
            <nav className="flex flex-col gap-2 text-sm">
              {section.links.map((link, linkIdx) => (
                <Link
                  key={linkIdx}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}

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
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
