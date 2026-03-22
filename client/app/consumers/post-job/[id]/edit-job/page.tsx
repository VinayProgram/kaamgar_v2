"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { PostJobForm } from "../../_components/post-job-form"
import { useGetJobById, useUpdateJob } from "../../hooks"
import { useConsumerStore } from "@/app/consumers/store/consumer-store"
import { Suspense, useEffect } from "react"
import { CreateJobDto } from "../../dto"
import { PostJobValues } from "../../schema"
// Assuming we'll have a hook to fetch a single job by ID
// import { useJobDetails } from "../../my-jobs/hooks" 

export default function EditJobPage() {
  const params = useParams()
  const id = params.id as string
  const { data: job, isLoading } = useGetJobById(id)
  const consumerStore = useConsumerStore()
  const updateJobMutation = useUpdateJob()
  useEffect(() => {
    if (job && job.length > 0) {
      const firstJob = job[0].job_requests
      const jobData: CreateJobDto = {
        jobRequestType: firstJob.jobRequestType as any,
        validOpenTill: firstJob.validOpenTill,
        location: {
          latitude: firstJob.location.y,
          longitude: firstJob.location.x,
          address: "" // Add address if needed
        },
        jobDescription: firstJob.jobDescription,
        priceType: firstJob.priceType as any,
        budgetMin: parseFloat(firstJob.budgetMin) || 0,
        budgetMax: parseFloat(firstJob.budgetMax) || 0,
        currency: firstJob.currency,
        skillIds: job.map((item) => item.job_request_skills.skillId).filter(Boolean),
        categoryIds: job.map((item) => item.job_request_categories.categoryId).filter(Boolean),
        requiredAt: firstJob.requiredAt || "",
      }

      consumerStore.setQuickRequest(jobData)
    }
  }, [job])

  const cb = (values: PostJobValues) => {
    updateJobMutation.mutate({ data: values, id })
  }
  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/consumers/my-jobs" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to My Jobs
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Edit Job Request</h1>
          <p className="text-slate-500 dark:text-slate-400">Update your job details to attract the best professionals.</p>
        </div>
      </div>

      <Card className="dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
          <CardTitle className="text-lg font-semibold">Update Details (ID: {id})</CardTitle>
          <CardDescription>
            You can modify the description, budget, and other requirements.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* 
            Pass the initialData prop to PostJobForm when we implement the fetch hook 
            <PostJobForm initialData={job} isEditing={true} jobId={id} /> 
          */}

          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> :
            <Suspense fallback={<div>Loading...</div>} >
              <PostJobForm cb={cb} isEdit={true} />
            </Suspense>}
        </CardContent>
      </Card>
    </div>
  )
}
