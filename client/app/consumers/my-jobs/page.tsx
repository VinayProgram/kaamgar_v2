"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Plus, Loader2 } from "lucide-react"
import Link from "next/link"
import { useMyJobs } from "./hooks"
import { JobRequest } from "./schema"
import { format } from "date-fns"

export default function MyJobsPostedPage() {
  const { data: jobs = [], isLoading } = useMyJobs()

  const getStatusBadge = (status: JobRequest["status"]) => {
    switch (status) {
      case "open": return <Badge className="bg-emerald-500 hover:bg-emerald-600">Finding Providers</Badge>
      case "assigned":
      case "in_progress": return <Badge variant="outline" className="text-blue-600 border-blue-600">In Progress</Badge>
      case "completed": return <Badge variant="secondary" className="bg-slate-100 italic">Completed</Badge>
      case "expired":
      case "cancelled": return <Badge variant="destructive">Closed</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">My Job Requests</h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage your posted service requests.</p>
        </div>
        <Link href="/consumers/post-job">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 gap-2">
            <Plus className="h-4 w-4" /> Post New Job
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="animate-pulse">Loading your job requests...</p>
        </div>
      ) : jobs.length === 0 ? (
        <Card className="border-dashed border-2 bg-slate-50 dark:bg-slate-900/50">
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Plus className="h-8 w-8 text-slate-400" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">No jobs posted yet</h3>
              <p className="text-slate-500 text-sm max-w-xs">You haven&apos;t created any job requests yet. Post your first job to get started!</p>
            </div>
            <Link href="/consumers/post-job">
              <Button variant="outline">Post your first job</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 overflow-hidden group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(job.status)}
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{job.jobRequestType}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {job.jobDescription.substring(0, 60)}...
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-50 capitalize">
                          {job.priceType === 'negotiable' ? 'Negotiable' : `${job.currency} ${job.budgetMax}`}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">ESTIMATED BUDGET</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {format(new Date(job.createdAt), "do MMM yyyy")}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Location pinned</span>
                      <span className="flex items-center gap-1.5 font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded text-xs">
                        {job.totalApplicants} Applications
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 md:w-48 flex md:flex-col border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 p-4 justify-between gap-4 shrink-0">
                    <div className="flex -space-x-2 items-center">
                      {job.totalApplicants > 0 && Array.from({ length: Math.min(job.totalApplicants, 3) }).map((_, i) => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden ring-1 ring-slate-100">
                          <img src={`https://avatar.iran.liara.run/public/${i + 10}`} alt="avatar" />
                        </div>
                      ))}
                      {job.totalApplicants > 3 && (
                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold">
                          +{job.totalApplicants - 3}
                        </div>
                      )}
                    </div>
                    <Button variant="default" className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 rounded-lg h-9 text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
