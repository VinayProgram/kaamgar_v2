"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  Droplets,
  Hammer,
  Paintbrush,
  Sparkles,
  AirVent,
  Briefcase,
  Search,
  Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Electrician", icon: Zap, color: "bg-amber-100 text-amber-600" },
  { name: "Plumber", icon: Droplets, color: "bg-blue-100 text-blue-600" },
  { name: "Carpenter", icon: Hammer, color: "bg-orange-100 text-orange-600" },
  { name: "Painter", icon: Paintbrush, color: "bg-indigo-100 text-indigo-600" },
  { name: "Cleaning", icon: Sparkles, color: "bg-green-100 text-green-600" },
  { name: "AC Repair", icon: AirVent, color: "bg-sky-100 text-sky-600" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col selection:bg-brand-amber selection:text-brand-navy">
      <Navbar />

      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pt-28 md:pb-36">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div className="max-w-xl animate-in fade-in slide-in-from-left-5 duration-1000 ease-out">
                <Badge variant="outline" className="mb-6 border-brand-amber text-brand-amber bg-brand-amber/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest ring-1 ring-brand-amber/20">
                  Reliable Local Professionals
                </Badge>
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-brand-navy md:text-6xl lg:text-7xl leading-[1.1]">
                  Find Trusted <span className="text-brand-gradient">Kaamgars</span> in Minutes
                </h1>
                <p className="mb-10 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg font-medium">
                  Experience seamless home services with India's most reliable platform for verified electricians, plumbers, and more. Your job, handled locally and expertly.
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <Button asChild size="lg" className="h-14 px-10 bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-lg shadow-xl shadow-brand-navy/20 hover-scale">
                    <Link href="/auth/consumer/signup">Post a Job Request</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-10 border-2 border-brand-navy text-brand-navy hover:bg-brand-navy/5 font-bold text-lg hover-scale">
                    <Link href="/auth/kaamgar/signup">Become a Kaamgar</Link>
                  </Button>
                </div>
                <div className="mt-12 flex items-center space-x-6 text-sm font-semibold text-brand-navy/60">
                   <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-brand-amber h-5 w-5" />
                      <span>Verified Pros</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-brand-amber h-5 w-5" />
                      <span>Secure Payments</span>
                   </div>
                </div>
              </div>
              <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200 ease-out">
                <div className="relative h-[480px] w-full rounded-3xl bg-brand-navy-light/10 overflow-hidden shadow-2xl border-4 border-white ring-1 ring-brand-navy/5">
                   <Image 
                      src="/kaamgar_hero_illustration_1772294512100.png" 
                      alt="Kaamgar Service Illustration" 
                      fill
                      className="object-cover"
                   />
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-brand-navy/5 animate-bounce-slow max-w-[220px]">
                   <div className="flex items-center gap-4 mb-3">
                      <div className="bg-brand-amber/20 p-2 rounded-full ring-1 ring-brand-amber/40">
                         <Star className="text-brand-amber fill-brand-amber h-6 w-6" />
                      </div>
                      <div className="font-extrabold text-brand-navy text-xl leading-none">4.9/5</div>
                   </div>
                   <p className="text-sm font-bold text-muted-foreground leading-tight tracking-tight uppercase">Average Rating from <span className="text-brand-navy">10k+</span> Satisfied Users</p>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -z-10 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-amber/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 -z-10 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-navy/5 blur-[120px]" />
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-24 bg-brand-navy/[0.02] border-y border-brand-navy/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-extrabold text-brand-navy md:text-5xl leading-tight tracking-tight">Expert Services at Your <span className="text-brand-amber">Doorstep</span></h2>
              <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">Choose from our wide range of professional services tailored to meet your daily home maintenance needs.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-8">
              {categories.map((cat, idx) => (
                <Card key={idx} className="group cursor-pointer border-brand-navy/5 hover:border-brand-amber/30 hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden bg-white hover-scale">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className={`${cat.color} h-20 w-20 flex items-center justify-center rounded-2xl mb-8 group-hover:rotate-12 transition-transform duration-500 shadow-md ring-4 ring-white`}>
                      <cat.icon className="h-10 w-10 stroke-[2.5]" />
                    </div>
                    <h3 className="font-extrabold text-brand-navy text-xl leading-tight">{cat.name}</h3>
                    <p className="mt-4 text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:text-brand-amber transition-colors">Find Expert <ArrowRight className="inline h-3 w-3 ml-1" /></p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 md:py-32 overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
               <div className="max-w-xl space-y-6">
                  <h2 className="text-4xl font-extrabold text-brand-navy md:text-5xl leading-tight tracking-tight">How Kaamgar <span className="text-brand-amber italic underline underline-offset-8 decoration-4">Works</span></h2>
                  <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">Bringing ease and speed to your home maintenance in four simple steps.</p>
               </div>
               <Button asChild className="bg-brand-navy text-white hover:bg-brand-navy-light shadow-lg px-8 py-6 h-auto font-bold rounded-2xl">
                 <Link href="/auth/consumer/signup">Get Started Now</Link>
               </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connector line for desktop */}
              <div className="hidden lg:block absolute top-[100px] left-[15%] right-[15%] h-1 bg-gradient-to-r from-brand-navy/10 via-brand-amber/30 to-brand-navy/10 rounded-full" />
              
              {[
                { title: "Post Your Job", desc: "Describe what you need help with and set your budget.", icon: Search },
                { title: "Get Applications", desc: "Interested local experts will apply with their best quotes.", icon: Users },
                { title: "Compare & Hire", desc: "Check ratings, experience, and hire the right pro.", icon: ShieldCheck },
                { title: "Work Done", desc: "Sit back while your expert solves the problem.", icon: Zap },
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  <div className="h-20 w-20 rounded-3xl bg-white shadow-xl shadow-brand-navy/5 border-2 border-brand-navy/10 flex items-center justify-center mb-8 z-10 group-hover:border-brand-amber group-hover:bg-brand-navy group-hover:text-white transition-all duration-500">
                    <step.icon className="h-9 w-9" />
                  </div>
                  <div className="absolute -top-4 -right-2 text-6xl font-black text-brand-navy/5 italic select-none">0{idx + 1}</div>
                  <h3 className="text-2xl font-extrabold text-brand-navy mb-4 leading-tight">{step.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed max-w-[220px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="py-24 md:py-32 bg-brand-navy text-white rounded-[4rem] mx-4 md:mx-8 shadow-2xl overflow-hidden relative group">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,191,0,0.1),transparent)]" />
           <div className="container mx-auto px-4 md:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-12">
                    <div className="space-y-6">
                       <Badge className="bg-brand-amber text-brand-navy font-black tracking-widest text-[10px] uppercase border-none px-4 py-1.5 shadow-lg">Trust & Security</Badge>
                       <h2 className="text-4xl font-extrabold md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">Why Millions Trust <span className="text-brand-amber underline decoration-brand-amber/30 underline-offset-8">Kaamgar</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                       {[
                         { title: "Verified Pros", icon: ShieldCheck, desc: "Background check for every provider." },
                         { title: "Real Ratings", icon: Star, desc: "Reviews from actual service users." },
                         { title: "Geo-Matching", icon: MapPin, desc: "Hire people within your 5km radius." },
                         { title: "Secure Pay", icon: CheckCircle2, desc: "Payment released after work completion." },
                       ].map((item, idx) => (
                         <div key={idx} className="space-y-4 group/item cursor-default">
                            <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center ring-1 ring-white/20 group-hover/item:bg-brand-amber group-hover/item:text-brand-navy transition-all duration-500">
                               <item.icon className="h-7 w-7" />
                            </div>
                            <h4 className="text-xl font-extrabold leading-none">{item.title}</h4>
                            <p className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="relative rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl p-4 bg-white/5 backdrop-blur-sm self-center lg:translate-x-10">
                    <div className="aspect-[4/3] bg-brand-navy-light/20 relative rounded-[2rem] overflow-hidden flex items-center justify-center group/img">
                        <Users className="h-32 w-32 text-brand-amber/20 group-hover/img:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent flex flex-col justify-end p-10 space-y-4 text-center">
                           <div className="text-5xl font-black text-brand-amber">1.2M+</div>
                           <p className="text-lg font-bold tracking-tight text-white/90 uppercase">Happy Customers Reaching out Every Day</p>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* For Providers Section */}
        <section className="py-24 md:py-40">
           <div className="container mx-auto px-4 md:px-8">
              <div className="bg-brand-amber/5 border-2 border-brand-amber/20 rounded-[4rem] overflow-hidden p-10 md:p-24 shadow-2xl relative flex flex-col lg:flex-row items-center gap-16 group/box">
                 <div className="flex-1 space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <h2 className="text-4xl font-extrabold text-brand-navy md:text-6xl leading-[1.1] tracking-tighter">Are You a <span className="text-brand-amber italic underline underline-offset-8">Skilled</span> Expert?</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed font-bold">
                       Turn your local skills into a thriving business. Join Kaamgar and reach thousands of customers looking for someone just like you.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       <div className="flex items-center gap-4 group/li">
                          <div className="h-12 w-12 rounded-xl bg-brand-navy flex items-center justify-center text-white shadow-lg group-hover/li:rotate-12 transition-transform">
                             <Briefcase className="h-6 w-6" />
                          </div>
                          <span className="font-bold text-brand-navy text-lg leading-none">Find Local Jobs</span>
                       </div>
                       <div className="flex items-center gap-4 group/li">
                          <div className="h-12 w-12 rounded-xl bg-brand-navy flex items-center justify-center text-white shadow-lg group-hover/li:rotate-12 transition-transform">
                             <Clock className="h-6 w-6" />
                          </div>
                          <span className="font-bold text-brand-navy text-lg leading-none">Flexible Hours</span>
                       </div>
                    </div>
                    <Button asChild size="lg" className="h-16 px-12 bg-black hover:bg-zinc-800 text-white font-black text-xl rounded-2xl shadow-2xl hover-scale group/btn">
                       <Link href="/auth/kaamgar/signup" className="flex items-center">
                          Become a Kaamgar <ArrowRight className="ml-3 h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />
                       </Link>
                    </Button>
                 </div>
                 <div className="flex-1 w-full lg:w-auto relative group/img">
                    <div className="aspect-square max-w-[500px] mx-auto bg-gradient-to-br from-brand-navy/10 to-brand-amber/20 rounded-[3rem] ring-8 ring-white shadow-inner flex items-center justify-center border-4 border-brand-navy/5 overflow-hidden">
                       <Users className="h-48 w-48 text-brand-navy/20 group-hover/img:scale-105 transition-transform duration-1000" />
                       <div className="absolute inset-x-8 bottom-8 bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-2xl">
                          <div className="flex items-center gap-4 mb-3">
                             <div className="h-12 w-12 rounded-full bg-brand-navy p-0.5"><div className="h-full w-full rounded-full bg-brand-navy-light/20 shadow-inner" /></div>
                             <div className="flex flex-col">
                                <span className="font-extrabold text-brand-navy leading-none">Rakesh Kumar</span>
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1.5 italic">Expert Plumber</span>
                             </div>
                          </div>
                          <p className="text-sm font-bold text-brand-navy/70 leading-relaxed italic">"Kaamgar helped me get 5x more work in my local area than ever before. Now I choose my own orders!"</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
