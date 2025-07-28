"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, User, Sun, Moon, BarChart3, Calendar, Check, X, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: "New Campaign Performance",
    message: "Your 'Summer Sale 2024' campaign has exceeded targets by 15%",
    time: "2 minutes ago",
    type: "success",
    read: false
  },
  {
    id: 2,
    title: "System Alert",
    message: "Scheduled maintenance will occur tonight at 2 AM EST",
    time: "1 hour ago",
    type: "warning",
    read: false
  },
  {
    id: 3,
    title: "New User Signup",
    message: "John Doe from TechCorp has joined your platform",
    time: "3 hours ago",
    type: "info",
    read: false
  },
  {
    id: 4,
    title: "Revenue Milestone",
    message: "Congratulations! You've reached $50K monthly revenue",
    time: "1 day ago",
    type: "success",
    read: true
  },
  {
    id: 5,
    title: "API Integration Complete",
    message: "Google Analytics integration has been successfully completed",
    time: "2 days ago",
    type: "info",
    read: true
  }
];

// Mock user data
const mockUser = {
  name: "John Smith",
  email: "john.smith@admybrand.com",
  role: "Marketing Manager",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  lastLogin: "2 hours ago",
  department: "Digital Marketing"
};

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
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log("Logging out...");
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    // In a real app, this would navigate to profile page
    console.log("Navigating to profile...");
    setShowProfile(false);
  };

  const handleSettingsClick = () => {
    // In a real app, this would navigate to settings
    console.log("Navigating to settings...");
    setShowProfile(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />;
    }
  };

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

          {/* Functional Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-muted">
                <Bell className="h-5 w-5 text-accent" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-sm font-bold shadow-lg ring-2 ring-white dark:ring-gray-900 border-2 border-white dark:border-gray-900">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-semibold text-accent">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-accent hover:bg-accent/10"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-accent/5' : ''
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-accent' : 'text-foreground'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 text-accent hover:bg-accent/10"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 text-muted-foreground hover:text-red-500"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground mt-2 block">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-accent hover:bg-accent/10"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all notifications
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Functional Profile */}
          <DropdownMenu open={showProfile} onOpenChange={setShowProfile}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative hover:bg-muted p-0 h-auto">
                <Avatar className="w-8 h-8 border-2 border-accent shadow cursor-pointer transition-transform hover:scale-105">
                  <img src={mockUser.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] md:w-72 max-w-[90vw]">
              {/* User Info Header */}
              <div className="p-3 md:p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-accent flex-shrink-0">
                    <img src={mockUser.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate text-sm md:text-base">{mockUser.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{mockUser.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-0 px-2 py-0.5">
                        {mockUser.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        {mockUser.department}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t">
                  <p className="text-xs text-muted-foreground">
                    Last login: {mockUser.lastLogin}
                  </p>
                </div>
              </div>

              {/* Profile Actions */}
              <div className="p-1 md:p-2">
                <DropdownMenuItem
                  className="flex items-center gap-3 p-2 md:p-3 cursor-pointer hover:bg-muted/50 rounded-md min-h-[44px] md:min-h-[48px]"
                  onClick={handleProfileClick}
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">View Profile</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">Manage your account</p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-3 p-2 md:p-3 cursor-pointer hover:bg-muted/50 rounded-md min-h-[44px] md:min-h-[48px]"
                  onClick={handleSettingsClick}
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Settings</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">Preferences & configuration</p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-3 p-2 md:p-3 cursor-pointer hover:bg-muted/50 rounded-md min-h-[44px] md:min-h-[48px]"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Notification Settings</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">Manage your alerts</p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-3 p-2 md:p-3 cursor-pointer hover:bg-muted/50 rounded-md min-h-[44px] md:min-h-[48px]"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Analytics</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">View your performance</p>
                  </div>
                </DropdownMenuItem>
              </div>

              {/* Footer Actions */}
              <div className="p-1 md:p-2 border-t">
                <DropdownMenuItem
                  className="flex items-center gap-3 p-2 md:p-3 cursor-pointer hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:text-red-400 rounded-md min-h-[44px] md:min-h-[48px]"
                  onClick={handleLogout}
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Sign Out</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">Log out of your account</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}