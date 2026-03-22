"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PostJobForm } from "./_components/post-job-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PostJobValues } from "./schema"
import { useCreateJob } from "./hooks"

export default function PostNewJobPage() {
  const postJobMutation = useCreateJob()

  const cb = (values: PostJobValues) => {
    postJobMutation.mutate(values)
  }
  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/consumers" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Post a New Job</h1>
          <p className="text-slate-500 dark:text-slate-400">Fill in the details below to find the right professional for your task.</p>
        </div>
      </div>

      <Card className="dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
          <CardTitle className="text-lg font-semibold">Job Details</CardTitle>
          <CardDescription>
            High-quality descriptions attract better professionals.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <PostJobForm cb={cb} isEdit={false} />
        </CardContent>
      </Card>
    </div>
  )
}
