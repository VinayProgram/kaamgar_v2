"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, MapPin, Hammer, CheckCircle2, AlertCircle } from "lucide-react"

export default function PostNewJobPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Post New Job</h1>
      </div>

       <Card className="dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
           <PlusCircle className="h-12 w-12 text-white/50 animate-pulse" />
        </div>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold">What service do you need?</CardTitle>
          <CardDescription>
            Provide details about the job and we'll connect you with local experts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group">
             <div className="flex flex-col items-center gap-2">
                <PlusCircle className="h-8 w-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Click to start posting</span>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
             {['Plumbing', 'Electrical', 'Cleaning', 'Carpentry'].map(cat => (
                <div key={cat} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-3 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 cursor-pointer transition-all">
                   <Hammer className="h-5 w-5 text-blue-600" />
                   <span className="text-sm font-medium">{cat}</span>
                </div>
             ))}
          </div>
        </CardContent>
        <CardFooter>
           <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Job Posting</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
