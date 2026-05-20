"use client";

import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAVIGATION_ITEMS } from "@/constants";
import { useNavbar } from "@/store/public/use-navbar-store";
import { Container } from "../container";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = false;
  const { isSearchOpen, setSearch, isMobileMenuOpen, setMobileMenu } =
    useNavbar();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // State to track scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Monitor window scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Automatically close the mobile sidebar menu if the screen resizes to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileMenu]);

  // 3. Focus search input when search bar opens
  useEffect(() => {
    if (isSearchOpen) {
      const timeout = setTimeout(() => searchInputRef.current?.focus(), 400);
      return () => clearTimeout(timeout);
    }
  }, [isSearchOpen]);

  return (
    <header
      className={cn(
        "fixed top-0  z-100 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/80 backdrop-blur-md py-0 shadow-sm"
          : "bg-transparent border-transparent py-2",
      )}
    >
      <Container>
        <div className=" flex h-16 md:h-20 items-center justify-between relative">
          {/* LEFT: LOGO */}
          <div
            className={cn(
              "shrink-0 flex items-center transition-all duration-500 z-130",
              // Removed layout scaling/opacity on desktop for search status
              isSearchOpen
                ? "opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
                : "opacity-100",
            )}
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-xl bg-card/50 shadow-sm">
                <Image
                  src="/assets/images/BTTV New Logo2 2.png"
                  alt="Logo"
                  fill
                  className="object-cover p-1"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* MIDDLE: DESKTOP MENU */}
          <nav
            className={cn(
              "hidden lg:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 transition-all duration-500 w-full max-w-[45%] lg:max-w-[55%]",
              isSearchOpen
                ? "opacity-0 pointer-events-none scale-95"
                : "opacity-100",
            )}
          >
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3 lg:px-4 py-2 text-sm font-medium transition-all hover:text-primary relative whitespace-nowrap",
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground",
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT: ACTIONS */}
          <div
            className={cn(
              "flex items-center gap-2 md:gap-4 shrink-0 relative z-130 transition-all duration-500",
              // Actions stay contextually present and interactive on desktop layout streams
              isSearchOpen
                ? "opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
                : "opacity-100",
            )}
          >
            {!isSearchOpen && (
              <div className="p-0.5 md:p-1 border rounded-full border-white/20 hover:border-primary/50 transition-colors bg-black/10 backdrop-blur-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearch(true)}
                  className="rounded-full h-8 w-8 md:h-9 md:w-9 cursor-pointer"
                >
                  <Search className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
                </Button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button
                onClick={() => router.push("/subscription")}
                className="px-5 py-5 rounded-lg hover:scale-105 hover:bg-primary/90 duration-300 ease-in-out transition-colors text-white backdrop-blur-sm cursor-pointer"
              >
                Subscribe Now
              </Button>
              <Button
                onClick={() => router.push("/login")}
                className="rounded-lg px-5 py-5 bg-cyan-700 hover:scale-105 duration-300 ease-in-out hover:bg-cyan-800/80 transition-colors text-white backdrop-blur-sm cursor-pointer"
              >
                LogIn
              </Button>
            </div>

            {user && (
              <div className="flex items-center gap-2 md:gap-3 pl-2 border-l border-white/20 ml-1">
                <div className="hidden lg:flex flex-col text-right">
                  <p className="text-xs lg:text-sm font-bold leading-none text-foreground">
                    Jamal
                  </p>
                  <p className="text-[10px] text-primary font-bold uppercase mt-1">
                    Premium
                  </p>
                </div>
                <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-primary ring-2 ring-background shadow-sm">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-primary/5 text-primary text-xs">
                    JH
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            {/* Mobile and Tablet Menu Trigger Container */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenu}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 cursor-pointer"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6 text-primary" />
                    ) : (
                      <Menu className="h-6 w-6 text-foreground" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85vw] p-0 z-150 border-l border-white/10"
                >
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Access navigation links and user account settings.
                  </SheetDescription>
                  <div className="flex flex-col h-full pt-20 px-6 bg-background">
                    {NAVIGATION_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenu(false)}
                        className={cn(
                          "py-4 text-sm font-medium border-b border-border/40 transition-colors",
                          pathname === item.href
                            ? "text-primary font-bold italic"
                            : "text-foreground hover:text-primary",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* DYNAMIC SEARCH BAR OVERLAY */}
          <div
            className={cn(
              // On mobile, it covers the whole row. On desktop (lg), it sits exactly where the nav links were.
              "absolute inset-y-0 z-140 flex items-center justify-center transition-all duration-500",
              "inset-x-4 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-[45%] lg:max-w-[55%]",
              isSearchOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none",
            )}
          >
            <div className="w-full flex items-center gap-3 bg-background border border-primary/40 rounded-full px-4 h-11 shadow-lg overflow-hidden">
              <Search className="h-5 w-5 text-primary shrink-0" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 h-full p-0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearch(false)}
                className="h-8 w-8 rounded-full hover:bg-primary/10 shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
