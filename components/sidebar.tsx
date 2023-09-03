"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  Code,
  Settings,
} from "lucide-react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const router = [
  {
    label: "Dashboard",
    href: "/dashboard",
    color: "text-sky-500",
    icon: LayoutDashboard,
  },
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-violet-500",
    icon: MessageSquare,
  },
  {
    label: "Image Generation",
    href: "/image",
    color: "text-pink-500",
    icon: ImageIcon,
  },
  {
    label: "Video Generation",
    href: "/video",
    color: "text-orange-500",
    icon: VideoIcon,
  },
  {
    label: "Music Generation",
    href: "/music",
    color: "text-emerald-500",
    icon: MusicIcon,
  },
  {
    label: "Code Generation",
    href: "/code",
    color: "text-green-500",
    icon: Code,
  },
  {
    label: "Settings",
    href: "/settings",
    color: "text-zinc-500",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div
      className="space-y-4 py-4 flex flex-col h-full
      bg-[#111827] text-white"
    >
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image src="/logo.png" fill alt="logo" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          {router.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start" +
                  "font-medium cursor-pointer hover:text-white" +
                  "hover:bg-white/10 rounded-lg transition-colors duration-200",
                pathname === route.href
                  ? "text-white bg-white/10 "
                  : "text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
