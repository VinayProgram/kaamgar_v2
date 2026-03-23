"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { PlusCircle, ListTodo, User, Settings, Zap, Search } from "lucide-react"

export function ConsumerNavbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "My Jobs Posted",
      href: "/consumers/my-jobs",
      icon: ListTodo,
    },
    {
      name: "Find Services",
      href: "/consumers/find-service-providers",
      icon: Search,
    },
    {
      name: "Post a New Job",
      href: "/consumers/post-job",
      icon: PlusCircle,
    },
    {
      name: "Quick Request",
      href: "/consumers/quick-request",
      icon: Zap,
    },
  ]

  return (
    <nav className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg",
                    isActive 
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900/50"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-blue-600" : "")} />
                  {item.name}
                </Link>
              )
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-slate-300 dark:border-slate-700">
               <User className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
