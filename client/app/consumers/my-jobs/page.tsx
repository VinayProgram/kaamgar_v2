"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2, AlertCircle, ChevronRight, MapPin, Hammer } from "lucide-react"

const mockJobs = [
   {
      id: "j1",
      title: "Fix Kitchen Faucet Leak",
      status: "open",
      postedAt: "2 hours ago",
      location: "Bhosari, Pune",
      applicants: 3,
      category: "Plumbing"
   },
   {
      id: "j2",
      title: "Install Ceiling Fan",
      status: "in-progress",
      postedAt: "Yesterday",
      location: "Pimpri, Pune",
      provider: "Rahul Electricals",
      category: "Electrical"
   },
   {
      id: "j3",
      title: "Repair Front Door Lock",
      status: "completed",
      postedAt: "3 days ago",
      location: "Alandi, Pune",
      provider: "Mahesh Carpenters",
      category: "Carpentry"
   }
]

export default function MyJobsPostedPage() {
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">My Jobs Posted</h1>
            <Button className="bg-blue-600 hover:bg-blue-700">Post New Job</Button>
         </div>

         <div className="grid grid-cols-1 gap-4">
            {mockJobs.map((job) => (
               <Card key={job.id} className="hover:shadow-md transition-shadow dark:bg-slate-950/50 border-slate-200 dark:border-slate-800">
                  <CardContent className="p-6">
                     <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{job.title}</h3>
                              <Badge variant={job.status === 'open' ? 'default' : job.status === 'completed' ? 'secondary' : 'outline'} className="rounded-full">
                                 {job.status === 'open' ? 'Finding Providers' : job.status === 'completed' ? 'Done' : 'In Progress'}
                              </Badge>
                           </div>
                           <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1"><Hammer className="h-4 w-4" /> {job.category}</span>
                              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.postedAt}</span>
                           </div>
                        </div>

                        <div className="flex items-center gap-3">
                           {job.status === 'open' && job.applicants! > 0 && (
                              <div className="flex -space-x-2 mr-2">
                                 {[1, 2, 3].map(i => (
                                    <div key={i} className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 overflow-hidden">
                                       <img src={`https://avatar.iran.liara.run/public/${i + 20}`} alt="avatar" />
                                    </div>
                                 ))}
                                 <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 border-2 border-white dark:border-slate-900">+{job.applicants}</div>
                              </div>
                           )}
                           <Button variant="outline" size="sm" className="gap-2">
                              Details <ChevronRight className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   )
}
