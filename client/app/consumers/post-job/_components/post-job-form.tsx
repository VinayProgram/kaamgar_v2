"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, MapPin, IndianRupee } from "lucide-react"
import { postJobSchema, PostJobValues } from "../schema"
import { postJob } from "../api"
import { getSkills } from "@/app/skills/api"
import { getCategories } from "@/app/categories/api"

export function PostJobForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState<{id: string, name: string}[]>([])
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])

  const form = useForm<any>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      jobRequestType: "scheduled",
      currency: "INR",
      location: {
        latitude: 18.5204,
        longitude: 73.8567,
      },
      priceType: "negotiable",
      skillIds: [],
      categoryIds: [],
      jobDescription: "",
      validOpenTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      requiredAt: "",
      budgetMin: 0,
      budgetMax: 0,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsData, categoriesData] = await Promise.all([
          getSkills().catch(() => []),
          getCategories().catch(() => []),
        ])
        setSkills(skillsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Failed to fetch skills/categories", error)
      }
    }
    fetchData()
  }, [])

  async function onSubmit(values: PostJobValues) {
    setLoading(true)
    try {
      await postJob(values)
      toast.success("Job posted successfully!")
      router.push("/consumers/my-jobs")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to post job")
    } finally {
      setLoading(false)
    }
  }

  const priceType = form.watch("priceType")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="jobRequestType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="instant">Instant</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validOpenTill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>When should this posting expire?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the job in detail (e.g., Leaking tap in kitchen, needs replacement of washer)" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card className="bg-slate-50 dark:bg-slate-900 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4 text-slate-500">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Location Details</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location.latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
           <FormField
            control={form.control}
            name="priceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pricing Model</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="negotiable">Negotiable</SelectItem>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="range">Price Range</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {(priceType === "fixed" || priceType === "range") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <FormField
                control={form.control}
                name="budgetMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{priceType === "range" ? "Min Budget" : "Budget"}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          className="pl-9" 
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {priceType === "range" && (
                <FormField
                  control={form.control}
                  name="budgetMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Budget</FormLabel>
                      <FormControl>
                        <div className="relative">
                           <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                           <Input 
                            type="number" 
                            placeholder="0.00" 
                            className="pl-9" 
                            {...field} 
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
                    {categories.length > 0 ? (
                        categories.map(cat => (
                            <label key={cat.id} className="flex items-center gap-2 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm cursor-pointer hover:bg-slate-200">
                                <input 
                                    type="checkbox" 
                                    value={cat.id}
                                    checked={field.value.includes(cat.id)}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (e.target.checked) {
                                            field.onChange([...field.value, val]);
                                        } else {
                                            field.onChange(field.value.filter((v: string) => v !== val));
                                        }
                                    }}
                                />
                                {cat.name}
                            </label>
                        ))
                    ) : (
                        <span className="text-xs text-slate-400">Loading categories...</span>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skillIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Skills</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
                    {skills.length > 0 ? (
                        skills.map(skill => (
                            <label key={skill.id} className="flex items-center gap-2 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm cursor-pointer hover:bg-slate-200">
                                <input 
                                    type="checkbox" 
                                    value={skill.id}
                                    checked={field.value.includes(skill.id)}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (e.target.checked) {
                                            field.onChange([...field.value, val]);
                                        } else {
                                            field.onChange(field.value.filter((v: string) => v !== val));
                                        }
                                    }}
                                />
                                {skill.name}
                            </label>
                        ))
                    ) : (
                        <span className="text-xs text-slate-400">Loading skills...</span>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting Job...
            </>
          ) : (
            "Post Job Request"
          )}
        </Button>
      </form>
    </Form>
  )
}
