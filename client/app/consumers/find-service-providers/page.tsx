"use client"

import { useState } from "react"
import { useCategories } from "@/app/categories/hooks"
import { useSkills } from "@/app/skills/hooks"
import { useSearchServiceProviders } from "./hooks"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  MapPin, 
  Star, 
  Briefcase, 
  Clock, 
  ChevronRight, 
  Filter,
  User,
  Zap
} from "lucide-react"
import Link from "next/link"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export default function FindServiceProvidersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const { data: categories = [], isLoading: isLoadingCategories } = useCategories()
  const { data: providers = [], isLoading: isLoadingProviders } = useSearchServiceProviders({
    categoryId: selectedCategory === "all" ? undefined : selectedCategory,
    query: debouncedQuery || undefined
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setDebouncedQuery(searchQuery)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      {/* Hero / Header Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-navy p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-amber/20 blur-[100px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <Badge variant="secondary" className="bg-brand-amber text-brand-navy font-bold hover:bg-brand-amber/90">
              Expert Marketplace
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Find the Perfect <span className="text-brand-amber underline decoration-brand-amber/30">Kaamgar</span>
            </h1>
            <p className="text-white/70 max-w-lg text-lg font-medium">
              Browse through top-rated local professionals in your area. Verified skills, real reviews, and instant hiring.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl max-w-sm w-full space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-amber p-2 rounded-xl text-brand-navy">
                <Zap className="h-5 w-5 fill-brand-navy" />
              </div>
              <div>
                <div className="text-sm font-bold uppercase tracking-widest text-white/60">Quick Link</div>
                <div className="font-bold">Urgent work?</div>
              </div>
            </div>
            <Button asChild className="w-full bg-brand-amber text-brand-navy hover:bg-brand-amber/90 font-black h-12 rounded-2xl shadow-lg shadow-brand-amber/20">
              <Link href="/consumers/quick-request">
                Launch Quick Request
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <Card className="border-none shadow-xl shadow-brand-navy/5 rounded-[2rem] overflow-visible sticky top-32 z-30">
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-brand-navy transition-colors" />
              <Input 
                placeholder="Search by name, skill, or service..." 
                className="pl-12 h-14 bg-slate-50 border-transparent focus:border-brand-navy/20 focus:bg-white rounded-2xl text-lg font-medium transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-14 bg-slate-50 border-transparent rounded-2xl text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-slate-500" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="h-14 px-8 bg-brand-navy hover:bg-brand-navy-light rounded-2xl font-bold text-lg shadow-lg shadow-brand-navy/20 active:scale-95 transition-transform">
              Find Experts
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingProviders ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="rounded-[2rem] overflow-hidden border-slate-100">
              <CardHeader className="space-y-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </CardContent>
            </Card>
          ))
        ) : providers.length === 0 ? (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="bg-slate-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto">
              <User className="h-12 w-12 text-slate-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">No experts found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                We couldn't find any service providers matching your current search criteria. Try broadening your filters.
              </p>
            </div>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setDebouncedQuery(""); }} className="rounded-xl border-2">
              Clear All Filters
            </Button>
          </div>
        ) : (
          providers.map((provider) => (
            <Card 
              key={provider.userId} 
              className="group rounded-[2rem] overflow-hidden border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
            >
              <CardContent className="p-0">
                <div className="relative h-24 bg-gradient-to-r from-brand-navy to-brand-navy-light group-hover:from-brand-amber group-hover:to-brand-amber/80 transition-colors duration-500">
                  <div className="absolute -bottom-10 left-6">
                    <div className="h-20 w-20 rounded-2xl border-4 border-white bg-slate-200 shadow-xl overflow-hidden">
                      {provider.profilePictureUrl ? (
                        <img src={provider.profilePictureUrl} alt={provider.fullName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-400">
                          <User className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-4 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                    {provider.city}
                  </div>
                </div>
                
                <div className="pt-14 p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-brand-navy flex items-center gap-2">
                      {provider.fullName}
                      <Badge className="bg-emerald-50 text-[10px] text-emerald-600 border-none shadow-none font-black ring-1 ring-emerald-500/20">VERIFIED</Badge>
                    </h3>
                    <p className="text-brand-amber font-bold text-sm tracking-tight line-clamp-1">{provider.tagline}</p>
                  </div>

                  <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed h-10">
                    {provider.bio || "Bringing expert skills and reliable service to your doorstep. Dedicated to quality workmanship and customer satisfaction."}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-50">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Briefcase className="h-3.5 w-3.5 text-brand-navy/60" />
                      <span>{provider.yearsOfExperience || 3}+ Years Exp</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Clock className="h-3.5 w-3.5 text-brand-navy/60" />
                      <span>{provider.hourlyRate ? `₹${provider.hourlyRate}/hr` : "Market Price"}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Top Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {provider.skills?.slice(0, 3).map((skill) => (
                        <Badge key={skill.id} variant="secondary" className="bg-slate-50 text-slate-600 hover:bg-brand-navy hover:text-white transition-colors cursor-default border-none">
                          {skill.name}
                        </Badge>
                      ))}
                      {(!provider.skills || provider.skills.length === 0) && (
                        <span className="text-xs text-slate-300 italic font-medium">No skills listed</span>
                      )}
                    </div>
                  </div>

                  <Button asChild className="w-full bg-slate-50 hover:bg-brand-navy hover:text-white text-brand-navy font-bold rounded-2xl h-11 shadow-none transition-all border-none">
                    <Link href={`/consumers/service-provider/${provider.userId}`}>
                      View Full Profile <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
