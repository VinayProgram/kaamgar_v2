"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hammer, Menu, User, Briefcase } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy p-1.5 shadow-lg">
              <Hammer className="text-brand-amber h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-navy">
              Kaamgar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="#how-it-works" className="text-muted-foreground hover:text-brand-navy transition-colors">
              How it Works
            </Link>
            <Link href="#categories" className="text-muted-foreground hover:text-brand-navy transition-colors">
              Categories
            </Link>
            <Link href="#why-choose-us" className="text-muted-foreground hover:text-brand-navy transition-colors">
              Why Us
            </Link>
            <Link href="/consumers" className="text-muted-foreground hover:text-brand-navy transition-colors font-bold text-blue-600">
              Customer Portal
            </Link>
            <Link href="/service-provider" className="text-muted-foreground hover:text-brand-navy transition-colors font-bold text-indigo-600">
              Provider Portal
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-brand-navy text-brand-navy hover:bg-brand-navy/5">
                   <User className="h-4 w-4" />
                   Login
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/auth/consumer/signin" className="w-full">Sign In as Customer</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/auth/kaamgar/signin" className="w-full">Sign In as Professional</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer border-t mt-1 pt-1">
                  <Link href="/auth/consumer/signup" className="w-full text-blue-600 font-semibold">Join as Customer</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/auth/kaamgar/signup" className="w-full text-blue-600 font-semibold">Join as Professional</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button size="sm" className="bg-brand-navy hover:bg-brand-navy-light text-white shadow-md">
              Post a Job
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
             <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                <Menu className="h-6 w-6" />
             </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
