import React from "react";
import { cn } from "@/lib/utils"; // Assumes you have standard shadcn utils setup

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("container mx-auto px-4", className)}>{children}</div>
  );
};
