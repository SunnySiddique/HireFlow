import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const HomeNavbar = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transform hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-black text-lg">
                TH
              </span>
            </div>
            <span className="text-2xl font-black text-primary hidden sm:inline">
              TalentHub
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#jobs"
              className="text-foreground text-sm font-semibold hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Browse Jobs
            </a>
            <a
              href="#companies"
              className="text-foreground text-sm font-semibold hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              For Companies
            </a>
            <a
              href="#resources"
              className="text-foreground text-sm font-semibold hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Resources
            </a>
            <a
              href="/billing"
              className="text-foreground text-sm font-semibold hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Billing
            </a>
          </div>
          <div className="flex items-center gap-3">
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

            <Link href={"/auth/signin"}>
              <Button
                variant={"outline"}
                className="text-foreground text-sm font-semibold hover:text-primary transition-colors"
              >
                Login
              </Button>
            </Link>
            <Link href={"/auth/signup"}>
              <Button className="bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HomeNavbar;
