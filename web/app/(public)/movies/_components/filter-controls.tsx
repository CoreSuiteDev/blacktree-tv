"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type definition for props
interface FilterDropdownProps {
  label: string;
  items: string[];
}

export function FilterControls() {
  return (
    <section className="w-full   py-4 ">
      <div className="container px-4 md:px-0  mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-items-stretch">
          <Button className="w-full h-[46px] bg-primary/90 hover:bg-primary text-foreground font-bold uppercase tracking-wider rounded-md transition-all shadow-md">
            ALL
          </Button>

          <FilterDropdown
            label="CATAGORY"
            items={["ACTION", "HOROR", "COMEDY"]}
          />
          <FilterDropdown label="YEAR" items={["2024", "2023", "2022"]} />
          <FilterDropdown
            label="LANGUAGE"
            items={["English", "Spanish", "French"]}
          />
        </div>
      </div>
    </section>
  );
}

function FilterDropdown({ label, items }: FilterDropdownProps) {
  return (
    /* TypeScript error fix: Removed 'modal={false}' as it's not supported in your version */
    <Select>
      <SelectTrigger className="w-full h-[52px] py-5 rounded-md bg-[#0a0a0a] border-zinc-800 text-zinc-400 focus:ring-1  focus:ring-offset-0 transition-all outline-none">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 whitespace-nowrap">
            {label}:
          </span>
          <SelectValue placeholder="All" />
        </div>
      </SelectTrigger>

      <SelectContent
        position="popper"
        sideOffset={5}
        className="bg-zinc-950 border-zinc-800 text-zinc-200 min-w-[var(--radix-select-trigger-width)]"
      >
        <SelectGroup>
          <SelectLabel className="text-zinc-500 text-[10px] uppercase tracking-widest px-2 py-2">
            Filter by {label}
          </SelectLabel>
          {items.map((item) => (
            <SelectItem
              key={item}
              value={item.toLowerCase()}
              className="focus:bg-primary focus:text-white data-ptimary:bg-red-600 data-frondground:text-white cursor-pointer py-2 transition-colors rounded-lg mx-1"
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
