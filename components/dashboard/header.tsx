"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, User, Sun, Moon, BarChart3, Calendar } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Avatar } from "@/components/ui/avatar";

// AccentColorPicker component
const ACCENT_COLORS = [
  { hsl: "12 76% 61%", display: "#F64C67" }, // pink
  { hsl: "271 83% 67%", display: "#8b5cf6" }, // purple
  { hsl: "173 58% 39%", display: "#06b6d4" }, // cyan
  { hsl: "160 84% 39%", display: "#10b981" }, // green
  { hsl: "43 74% 66%", display: "#f59e0b" }, // yellow
  { hsl: "0 84% 60%", display: "#ef4444" }, // red
];

function AccentColorPicker() {
  const [colorIdx, setColorIdx] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("accentColor");
      const idx = ACCENT_COLORS.findIndex(c => c.hsl === stored);
      return idx === -1 ? 0 : idx;
    }
    return 0;
  });
  const color = ACCENT_COLORS[colorIdx].hsl;

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", color);
    localStorage.setItem("accentColor", color);
  }, [color]);

  const handleClick = () => {
    setColorIdx((prev) => (prev + 1) % ACCENT_COLORS.length);
  };

  return (
    <button
      className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 shadow transition-transform duration-200 ml-4`}
      style={{ background: `hsl(${color})` }}
      aria-label="Cycle accent color"
      onClick={handleClick}
    />
  );
}

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center">
            <img src="/web_logo.svg" alt="Logo" className="w-24 h-14 object-contain" />
            <AccentColorPicker />
          </div>
          <Badge variant="secondary" className="bg-accent/10 text-accent border-0 text-xs px-2 py-0.5 -mt-[20px] ml-3">
            Live Data
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search anything..."
              className="pl-10 w-64 bg-muted/50"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button variant="ghost" size="icon" className="relative hover:bg-muted">
            <Bell className="h-5 w-5 text-accent" />
            <span className="absolute -top-2 -right-2 flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-sm font-bold shadow-lg ring-2 ring-white dark:ring-gray-900 border-2 border-white dark:border-gray-900">
              3
            </span>
          </Button>

          {/* Profile Avatar */}
          <Avatar className="w-8 h-8 ml-2 border-2 border-accent shadow">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </Avatar>
        </div>
      </div>
    </motion.header>
  );
}