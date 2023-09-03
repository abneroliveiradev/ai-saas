"use client";
import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  Code,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const tools = [ 
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    icon: MessageSquare,
  },
  {
    label: "Image Generation",
    href: "/image",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    icon: ImageIcon,
  },
  {
    label: "Video Generation",
    href: "/video",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    icon: VideoIcon,
  },
  {
    label: "Music Generation",
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    icon: MusicIcon,
  },
  {
    label: "Code Generation",
    href: "/code",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    icon: Code,
  },
];

export default function DashboardPage() {
  const router = useRouter()
  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Explore the power of AI
      </h2>
      <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Chat with the smartiest AI - Experience the power of AI
      </p>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center gap-x-4 rounded-md justify-between
            hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>           
            <ArrowRight className="w-4 h-4" />
          </Card>
        ))}
      </div>
    </div>
  );
}
