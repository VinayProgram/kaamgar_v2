"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Briefcase,
  MapPin,
  Wrench,
  Loader2,
  Save,
  Camera,
  Lightbulb,
  Clock,
  IndianRupee,
  Locate
} from "lucide-react"
import { useSkills } from "@/app/skills/hooks"
import { useCategories } from "@/app/categories/hooks"
import { useAuthCheck } from "@/app/auth/hooks"
import { useProviderProfile, useUpdateProviderProfile } from "./hooks"
import { profileSchema, ProfileValues } from "./schema"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePage() {
  const { data: user } = useAuthCheck()
  const { data: profile, isLoading: isProfileLoading } = useProviderProfile()
  const { data: skills = [] } = useSkills()
  const { data: categories = [] } = useCategories()
  const updateProfileMutation = useUpdateProviderProfile()

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema) as any,
    defaultValues: {
      firstName: "",
      lastName: "",
      tagline: "",
      bio: "",
      yearsOfExperience: 0,
      hourlyRate: 0,
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      categoryIds: [],
      skillIds: [],
      latitude: undefined,
      longitude: undefined,
    },
  })

  // Populating form with profile and user data when loaded
  useEffect(() => {
    if (user || profile) {
      form.reset({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        tagline: profile?.tagline || "",
        bio: profile?.bio || "",
        yearsOfExperience: profile?.yearsOfExperience || 0,
        hourlyRate: profile?.hourlyRate ? Number(profile.hourlyRate) : 0,
        addressLine1: profile?.addressLine1 || "",
        addressLine2: profile?.addressLine2 || "",
        city: profile?.city || "",
        state: profile?.state || "",
        postalCode: profile?.postalCode || "",
        country: profile?.country || "India",
        categoryIds: profile?.categoryIds || [],
        skillIds: profile?.skillIds || [],
        latitude: (profile?.currentLocation?.location as any)?.y,
        longitude: (profile?.currentLocation?.location as any)?.x,
      })
    }
  }, [user, profile, form])


  const onSubmit = async (values: ProfileValues) => {
    const { firstName, lastName, ...updateData } = values;
    updateProfileMutation.mutate(updateData)
  }


  if (isProfileLoading) {
    return (
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        <Skeleton className="h-12 w-1/3" />
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-80 h-[400px]" />
          <Skeleton className="flex-1 h-[600px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side: Quick Info */}
        <Card className="w-full md:w-80 shadow-xl border-none bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-900/50 dark:to-slate-950">
          <CardHeader className="text-center">
            <div className="relative mx-auto w-32 h-32 mb-4 group">
              <Avatar className="w-full h-full border-4 border-white dark:border-slate-800 shadow-xl">
                <AvatarImage src={profile?.profilePictureUrl} />
                <AvatarFallback className="bg-indigo-600 text-white text-3xl font-bold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-slate-800 group-hover:scale-110 transition-transform">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-2xl font-black text-slate-900 dark:text-slate-50">{user?.firstName} {user?.lastName}</CardTitle>
            <CardDescription className="font-medium text-indigo-600 dark:text-indigo-400">Professional Provider</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <Clock className="h-4 w-4 text-indigo-500" />
              <span>{profile?.yearsOfExperience || 0} Years Experience</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <IndianRupee className="h-4 w-4 text-indigo-500" />
              <span>₹{profile?.hourlyRate || 0} / hour</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="h-4 w-4 text-indigo-500" />
              <span>{profile?.city || "Location not set"}, {profile?.state || ""}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-indigo-200 hover:bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:hover:bg-indigo-900/10">View Public Profile</Button>
          </CardFooter>
        </Card>

        {/* Right Side: Edit Form */}
        <div className="flex-1 w-full">
          <Form {...(form as any)}>
            <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100/50 dark:bg-slate-900/50 p-1 h-12 rounded-xl">
                  <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all flex gap-2">
                    <User className="h-4 w-4" /> General
                  </TabsTrigger>
                  <TabsTrigger value="services" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all flex gap-2">
                    <Wrench className="h-4 w-4" /> Services
                  </TabsTrigger>
                  <TabsTrigger value="location" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all flex gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  <Card className="border-none shadow-lg shadow-slate-200/50 dark:shadow-none">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" /> Basic Information
                      </CardTitle>
                      <CardDescription>How clients see you on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control as any}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} readOnly />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control as any}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} readOnly />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control as any}
                        name="tagline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Tagline</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Expert Home Renovator" {...field} />
                            </FormControl>
                            <FormDescription>A catchy line to show under your name.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control as any}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio / Introduction</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell clients about your expertise, background and why they should hire you..."
                                className="min-h-[120px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control as any}
                          name="yearsOfExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years of Experience</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                  <Input type="number" className="pl-9" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control as any}
                          name="hourlyRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expected Hourly Rate (₹)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                  <Input type="number" step="0.01" className="pl-9" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="services" className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-blue-500" /> Core Categories
                      </CardTitle>
                      <CardDescription>Select categories that define your main services.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control as any}
                        name="categoryIds"
                        render={() => (
                          <FormItem className="space-y-4">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                              {categories.map((category) => (
                                <FormField
                                  key={category.id}
                                  control={form.control as any}
                                  name="categoryIds"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={category.id}
                                        className="flex flex-row items-start space-x-3 space-y-0 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 transition-colors"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={(field.value as string[])?.includes(category.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value as string[]), category.id])
                                                : field.onChange(
                                                  field.value?.filter(
                                                    (value: string) => value !== category.id
                                                  )
                                                )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-semibold cursor-pointer w-full">
                                          {category.name}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-indigo-500" /> Specialized Skills
                      </CardTitle>
                      <CardDescription>Specific skills that help clients find you.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control as any}
                        name="skillIds"
                        render={() => (
                          <FormItem className="space-y-4">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                              {skills.map((skill) => (
                                <FormField
                                  key={skill.id}
                                  control={form.control as any}
                                  name="skillIds"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={skill.id}
                                        className="flex flex-row items-start space-x-3 space-y-0 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 transition-colors"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={(field.value as string[])?.includes(skill.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value as string[]), skill.id])
                                                : field.onChange(
                                                  field.value?.filter(
                                                    (value: string) => value !== skill.id
                                                  )
                                                )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-semibold cursor-pointer w-full">
                                          {skill.name}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location" className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-red-500" /> Professional Location
                      </CardTitle>
                      <CardDescription>Precisely set your location to receive relevant job alerts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/20 mb-6">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-50">Auto-detect Location</p>
                          <p className="text-xs text-slate-500">Get your exact GPS coordinates for better job matching.</p>
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="bg-white dark:bg-slate-900 shadow-sm"
                          onClick={() => {
                            if ("geolocation" in navigator) {
                              navigator.geolocation.getCurrentPosition((position) => {
                                form.setValue("latitude", position.coords.latitude);
                                form.setValue("longitude", position.coords.longitude);
                              });
                            }
                          }}
                        >
                          <Locate className="h-4 w-4 mr-2 text-indigo-600" /> Get GPS
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <FormField
                          control={form.control as any}
                          name="latitude"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Latitude</FormLabel>
                              <FormControl>
                                <Input type="number" step="any" placeholder="e.g. 18.5204" {...field} value={field.value || ""} onChange={e => field.onChange(parseFloat(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control as any}
                          name="longitude"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Longitude</FormLabel>
                              <FormControl>
                                <Input type="number" step="any" placeholder="e.g. 73.8567" {...field} value={field.value || ""} onChange={e => field.onChange(parseFloat(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control as any}
                        name="addressLine1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123, Street Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control as any}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control as any}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control as any}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-end gap-4 p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-lg sticky bottom-6 z-10">
                <Button type="button" variant="ghost" className="hover:bg-slate-100">Cancel</Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 min-w-[140px] h-11 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all" disabled={updateProfileMutation.isPending}>
                  {updateProfileMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
