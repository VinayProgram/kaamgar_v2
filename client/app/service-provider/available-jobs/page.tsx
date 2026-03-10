"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Hammer, Star, Clock, ChevronRight, Briefcase } from "lucide-react"
import { GoogleMapMock } from "@/components/service-provider/google-map-mock"

const currentProvider = {
  name: "Rakesh Kumar",
  category: "Plumbing",
  skills: ["Pipe Repair", "Faucet Install", "Leak Detection"]
}

const jobs = [
  {
    id: "j1",
    title: "Kitchen Sink Leakage",
    distance: "1.2 km",
    category: "Plumbing",
    difficulty: "Medium",
    budget: "₹500 - ₹800",
    postedAt: "10 mins ago"
  },
  {
     id: "j2",
     title: "Bathroom Tap Replacement",
     distance: "2.5 km",
     category: "Plumbing",
     difficulty: "Easy",
     budget: "₹300 - ₹450",
     postedAt: "45 mins ago"
  },
  {
     id: "j3",
     title: "Full House Pipe Inspection",
     distance: "5 km",
     category: "Plumbing",
     difficulty: "Advance",
     budget: "₹2000+",
     postedAt: "2 hours ago"
  }
]

export default function AvailableJobsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
         <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">Jobs Recommended for You</h1>
            <p className="text-muted-foreground flex items-center gap-2">
               Based on your profile: <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20">{currentProvider.category}</Badge>
            </p>
         </div>
         <div className="flex items-center gap-4 text-sm font-medium bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9 (128 reviews)</div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1 text-green-600"><CheckCircle className="h-4 w-4" /> 95% Success Rate</div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
           <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Briefcase className="h-5 w-5 text-indigo-600" /> New Orders Nearby</h3>
           {jobs.map((job) => (
             <Card key={job.id} className="group hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer dark:bg-slate-950/50">
               <CardContent className="p-5">
                  <div className="space-y-3">
                     <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900 dark:text-slate-50 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{job.title}</h4>
                        <Badge variant="outline" className="text-[10px] font-black">{job.difficulty}</Badge>
                     </div>
                     <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.distance}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.postedAt}</span>
                     </div>
                     <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-sm font-black text-slate-900 dark:text-slate-50">{job.budget}</span>
                        <Button size="sm" variant="ghost" className="h-8 px-2 group-hover:translate-x-1 transition-transform">
                           <ChevronRight className="h-5 w-5 text-indigo-600" />
                        </Button>
                     </div>
                  </div>
               </CardContent>
             </Card>
           ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
           <h3 className="text-lg font-bold flex items-center gap-2"><MapPin className="h-5 w-5 text-indigo-600" /> Professional Service Map</h3>
           <GoogleMapMock />
           <div className="flex items-center gap-6 p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/20">
              <div className="p-3 bg-white dark:bg-slate-950 rounded-xl shadow-sm">
                 <Hammer className="h-8 w-8 text-indigo-600 animate-bounce" />
              </div>
              <div>
                 <p className="text-sm font-bold text-slate-900 dark:text-slate-50">Want higher paying jobs?</p>
                 <p className="text-xs text-slate-500 italic">Try adding more skills like "Modern Kitchen Fitting" in your profile settings.</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto border-indigo-200 hover:bg-indigo-100">Add Skills</Button>
           </div>
        </div>
      </div>
    </div>
  )
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
