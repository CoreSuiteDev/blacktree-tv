// "use client";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { useAuth } from "@/hooks/useAuth";
// import { cn } from "@/lib/utils";

// import {
//   Bookmark,
//   CreditCard,
//   LogOut,
//   ShieldCheck,
//   Sliders,
//   User,
//   BadgeCheck,
//   Bell,
//   ChevronsUpDown,
//   Sparkles,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const navigationItems = [
//   { id: "details", label: "Overview", icon: User, path: "/profile" },
//   {
//     id: "billing",
//     label: "Membership",
//     icon: CreditCard,
//     path: "/profile/billing",
//   },
//   {
//     id: "security",
//     label: "Security & Privacy",
//     icon: ShieldCheck,
//     path: "/profile/security",
//   },
//   {
//     id: "playback",
//     label: "Preferences",
//     icon: Sliders,
//     path: "/profile/playback",
//   },
//   {
//     id: "watchlist",
//     label: "Watchlist",
//     icon: Bookmark,
//     path: "/profile/watchlist",
//   },
// ] as const;

// export function UserProfileSidebar() {
//   const pathname = usePathname();
//   const { state } = useSidebar();
//   const isCollapsed = state === "collapsed";

//   return (
//     <Sidebar collapsible="icon" className="border-r border-neutral-900 bg-black shadow-sm">
//       <SidebarHeader className={cn(
//         "border-b border-neutral-900 flex flex-row items-center gap-3 overflow-hidden transition-all duration-200",
//         isCollapsed ? "px-2 py-3 justify-center" : "px-4 py-3"
//       )}>
       
//           <span className={cn(
//             "font-medium text-sm tracking-wider text-white uppercase whitespace-nowrap transition-all duration-200",
//             isCollapsed ? "w-0 opacity-0 pointer-events-none hidden" : "w-auto opacity-100"
//           )}>
//             BlackTree TV
//           </span>
//         </Link>
//       </SidebarHeader>

//       {/* SECTION 2: INTERACTIVE NAVIGATION LINKS */}
//       <SidebarContent className={cn("transition-all duration-200", isCollapsed ? "p-0" : "p-2")}>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu className="space-y-1">
//               {navigationItems.map((item) => {
//                 const IconComponent = item.icon;
//                 const isActive = pathname === item.path;

//                 return (
//                   <SidebarMenuItem key={item.id}>
//                     <SidebarMenuButton
//                       asChild
//                       isActive={isActive}
//                       tooltip={item.label}
//                       className={cn(
//                         "w-full transition-all duration-200 cursor-pointer",
//                         isCollapsed
//                           ? "flex items-center justify-center p-0 h-8 w-8 mx-auto rounded-lg"
//                           : "flex items-center gap-3 px-4 py-3 h-auto rounded-lg text-xs font-bold tracking-wide",
//                         isActive
//                           ? isCollapsed
//                             ? "bg-muted text-foreground border border-primary/50"
//                             : "bg-muted text-foreground border-l-2 border-primary pl-3"
//                           : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
//                       )}
//                     >
//                       <Link
//                         href={item.path}
//                         className={cn(
//                           "flex items-center w-full h-full",
//                           isCollapsed ? "justify-center" : "gap-3"
//                         )}
//                       >
//                         <IconComponent
//                           size={16}
//                           className={cn(
//                             "transition-colors shrink-0",
//                             isActive ? "text-primary" : "text-muted-foreground/70",
//                           )}
//                         />
//                         {!isCollapsed && <span>{item.label}</span>}
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 );
//               })}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>


//     </Sidebar>
//   );
// }
