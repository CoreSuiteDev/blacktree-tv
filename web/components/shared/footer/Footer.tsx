import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Clapperboard } from "lucide-react";
import { footerLinks } from "@/constants/footer";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { brand, sections } = footerLinks;

  return (
    <footer className="bg-black text-zinc-400 py-12 px-6 md:px-16 border-t border-zinc-900">
      <div className="container mx-auto flex flex-col gap-12 lg:grid lg:grid-cols-5 lg:gap-12">
        {/* Brand Section: Full width on mobile, 1 col on LG */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-lg">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
            {/* Show brand name on large, hide/style on mini if needed to match image */}
            <span className="text-white font-bold text-xl tracking-tight lg:block">
              {brand.name}
            </span>
          </div>
          <p className="text-sm md:text-base leading-relaxed max-w-xs text-zinc-500">
            {brand.description}
          </p>
          <div className="flex items-center gap-2 text-[#E50914] font-bold text-xs uppercase tracking-widest mt-2">
            <Clapperboard size={16} />
            {brand.badge}
          </div>
        </div>

        {/* Link Sections: 3 Columns on mini device, 1 col each on LG */}
        <div className="grid grid-cols-3 gap-4 md:contents">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4 lg:col-span-1">
              <h3 className="text-white font-semibold text-base md:text-lg">
                {section.title}
              </h3>
              <nav className="flex flex-col gap-3 text-sm">
                {section.links.map((link, linkIdx) => (
                  <Link
                    key={linkIdx}
                    href={link.href}
                    className="hover:text-[#E50914] transition-colors text-zinc-500"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Connect Section: Full width on mobile, 1 col on LG */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <h3 className="text-white font-semibold text-lg">Connect With Us</h3>
          <div className="bg-[#0A0A0A] border border-zinc-900 p-5 rounded-xl">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-4">
              Stay Updated
            </label>
            <div className="flex w-full items-center gap-0">
              <Input
                type="email"
                placeholder="Email"
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 rounded-r-none h-11 focus-visible:ring-1 focus-visible:ring-[#E50914]"
              />
              <Button
                type="submit"
                className="bg-[#E50914] hover:bg-[#b20710] text-white rounded-l-none h-11 px-3 shadow-none flex-shrink-0"
              >
                <SendHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="container mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-[10px] md:text-xs text-zinc-600">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
