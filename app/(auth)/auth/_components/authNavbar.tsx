"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const AuthNavbar = () => {
  const { setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </Button>
          </Link>

          {/* Logo */}
          <div className={`flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sidebar-primary text-sidebar-primary-foreground rounded flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg font-sans">HireFlow</span>
            </div>
          </div>
        </div>

        {/* Theme Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-card border border-border"
          >
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="cursor-pointer hover:bg-muted"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="cursor-pointer hover:bg-muted"
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="cursor-pointer hover:bg-muted"
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AuthNavbar;
