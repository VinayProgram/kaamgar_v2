"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { MapPin, Info } from "lucide-react"

export function GoogleMapMock() {
  return (
    <Card className="w-full h-[400px] overflow-hidden relative border-slate-200 dark:border-slate-800 shadow-xl">
       <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center p-8">
             <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                <MapPin className="h-8 w-8 text-blue-600" />
             </div>
             <div className="space-y-1">
                <h3 className="text-xl font-bold">Interactive Jobs Map</h3>
                <p className="text-sm text-slate-500 max-w-sm">Showing 8 active jobs within a 5km radius of your current location (Pune).</p>
             </div>
          </div>
       </div>
       
       {/* Mock Map UI Elements */}
       <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg p-2 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col gap-1">
             <div className="h-2 w-12 bg-slate-300 dark:bg-slate-700 rounded" />
             <div className="h-2 w-8 bg-slate-300 dark:bg-slate-700 rounded" />
          </div>
       </div>

       {/* Floating Markers */}
       {[
          { top: '25%', left: '30%' },
          { top: '45%', left: '60%' },
          { top: '70%', left: '40%' },
          { top: '15%', left: '80%' }
       ].map((pos, i) => (
          <div key={i} className="absolute h-6 w-6 pointer-events-none" style={{ top: pos.top, left: pos.left }}>
             <div className="relative group">
                <div className="h-6 w-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: `${i * 200}ms` }} />
                <div className="h-2 w-2 bg-red-500/30 rounded-full absolute -bottom-1 left-2 blur-xs" />
             </div>
          </div>
       ))}
       
       <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg p-3 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
             <Info className="h-5 w-5" />
          </div>
          <div>
             <p className="text-sm font-bold">New job nearby!</p>
             <p className="text-xs text-slate-500 italic">2 mins ago in Aundh</p>
          </div>
       </div>
    </Card>
  )
}
