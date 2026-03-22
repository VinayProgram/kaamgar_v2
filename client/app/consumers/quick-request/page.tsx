"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Droplets,
  PartyPopper,
  Zap,
  Hammer,
  Paintbrush,
  AirVent,
  Sparkles,
  ArrowRight,
  Truck,
  Wrench,
  CalendarHeart
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useConsumerStore } from "../store/consumer-store"

const quickRequestTypes = [
  { id: "plumber", name: "Plumbing Request", icon: Droplets, color: "bg-blue-100 text-blue-600", desc: "Fix leaks, pipe installations, and repairs" },
  { id: "event", name: "Event Management", icon: PartyPopper, color: "bg-purple-100 text-purple-600", desc: "Party planning, catering, and decorations" },
  { id: "electrician", name: "Electrician", icon: Zap, color: "bg-amber-100 text-amber-600", desc: "Wiring, fixtures, and electrical repairs" },
  { id: "carpenter", name: "Carpenter", icon: Hammer, color: "bg-orange-100 text-orange-600", desc: "Furniture repair, assembly, and woodwork" },
  { id: "painter", name: "Painter", icon: Paintbrush, color: "bg-indigo-100 text-indigo-600", desc: "Wall painting, polishing, and touch-ups" },
  { id: "ac-repair", name: "AC Repair", icon: AirVent, color: "bg-sky-100 text-sky-600", desc: "AC servicing, installation, and gas refilling" },
  { id: "cleaning", name: "Deep Cleaning", icon: Sparkles, color: "bg-green-100 text-green-600", desc: "Full home or bathroom deep cleaning" },
  { id: "movers", name: "Packers & Movers", icon: Truck, color: "bg-rose-100 text-rose-600", desc: "Relocation and shifting services" },
  { id: "mechanic", name: "Mechanic", icon: Wrench, color: "bg-slate-100 text-slate-600", desc: "Car and bike repairs, servicing" },
]

export default function QuickRequestPage() {
  const router = useRouter()
  const setQuickRequest = useConsumerStore((state) => state.setQuickRequest)
  const handleQuickRequest = (id: string) => {
    setQuickRequest({
      category: [],
      description: quickRequestTypes.find((type) => type.id === id)?.desc || "",
      requestType: "instant",
      skills: []
    })
    router.push(`/consumers/post-job?category=${id}`)
  }
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-3">
          Quick Request
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Select a service category below to instantly post a job request to active local professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {quickRequestTypes.map((type) => (
          <div 
            onClick={() => handleQuickRequest(type.id)} 
            key={type.id} 
            className="block group cursor-pointer"
          >
            <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 bg-white dark:bg-slate-950/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm ${type.color}`}>
                  <type.icon className="h-8 w-8 stroke-[2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {type.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">
                  {type.desc}
                </p>
                <div className="w-full mt-auto flex items-center justify-center gap-2 text-sm font-semibold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Request Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">Can't find your specific need?</h2>
        <p className="text-blue-700 dark:text-blue-300 mb-6 font-medium">
          Create a custom job post describing exactly what you need, and we'll match you with the right professionals.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 shadow-md">
          <Link href="/consumers/post-job">
            Create Custom Request
          </Link>
        </Button>
      </div>
    </div>
  )
}
