import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Black Tree Media. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms-conditions" className="hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/privacy-policy" className="hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
