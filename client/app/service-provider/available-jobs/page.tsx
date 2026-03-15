"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Hammer, Star, Clock, ChevronRight, Briefcase } from "lucide-react"
import { GoogleMapMock } from "@/components/service-provider/google-map-mock"



import { useAvailableJobs } from "./hooks"
import { formatDistanceToNow } from "date-fns"

export default function AvailableJobsPage() {
  const { data: jobs = [], isLoading, error } = useAvailableJobs()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
        <p className="text-red-600 font-bold">Failed to load jobs</p>
        <p className="text-sm text-red-500">{(error as any)?.message || "Service provider location not set. Please update your profile."}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
         <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">Jobs Recommended for You</h1>
            <p className="text-muted-foreground flex items-center gap-2">
               Showing {jobs.length} jobs matching your skills and location
            </p>
         </div>
         <div className="flex items-center gap-4 text-sm font-medium bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Professional Dashboard</div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1 text-green-600"><CheckCircle className="h-4 w-4" /> Available Now</div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
           <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Briefcase className="h-5 w-5 text-indigo-600" /> New Orders Nearby</h3>
           {jobs.length === 0 ? (
             <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200">
               <p className="text-muted-foreground">No jobs found nearby. Try expanding your skills!</p>
             </div>
           ) : (
             jobs.map((job) => (
               <Card key={job.id} className="group hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer dark:bg-slate-950/50">
                 <CardContent className="p-5">
                    <div className="space-y-3">
                       <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 dark:text-slate-50 group-hover:text-indigo-600 transition-colors uppercase tracking-tight line-clamp-2">
                            {job.jobDescription}
                          </h4>
                          <Badge variant="outline" className="text-[10px] font-black shrink-0">{job.jobRequestType}</Badge>
                       </div>
                       <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {(job.distance / 1000).toFixed(1)} km</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatDistanceToNow(new Date(job.createdAt))} ago</span>
                       </div>
                       <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-sm font-black text-slate-900 dark:text-slate-50">
                            {job.budgetMin ? `₹${job.budgetMin}` : ""} {job.budgetMax ? `- ₹${job.budgetMax}` : (job.budgetMin ? "" : "Price on request")}
                          </span>
                          <Button size="sm" variant="ghost" className="h-8 px-2 group-hover:translate-x-1 transition-transform">
                             <ChevronRight className="h-5 w-5 text-indigo-600" />
                          </Button>
                       </div>
                    </div>
                 </CardContent>
               </Card>
             ))
           )}
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
