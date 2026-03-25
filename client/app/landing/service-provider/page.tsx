"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
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
  Wrench,
  Bug,
  Leaf,
  Truck,
  MonitorPlay,
  Sofa,
  ShieldAlert
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  { id: "electrician", icon: Zap, color: "bg-amber-100 text-amber-600" },
  { id: "plumber", icon: Droplets, color: "bg-blue-100 text-blue-600" },
  { id: "carpenter", icon: Hammer, color: "bg-orange-100 text-orange-600" },
  { id: "painter", icon: Paintbrush, color: "bg-indigo-100 text-indigo-600" },
  { id: "cleaning", icon: Sparkles, color: "bg-green-100 text-green-600" },
  { id: "ac-repair", icon: AirVent, color: "bg-sky-100 text-sky-600" },
  { id: "masonry", icon: Wrench, color: "bg-stone-100 text-stone-600" },
  { id: "pest-control", icon: Bug, color: "bg-red-100 text-red-600" },
  { id: "gardening", icon: Leaf, color: "bg-emerald-100 text-emerald-600" },
  { id: "movers", icon: Truck, color: "bg-purple-100 text-purple-600" },
  { id: "appliances", icon: MonitorPlay, color: "bg-teal-100 text-teal-600" },
  { id: "sofa", icon: Sofa, color: "bg-rose-100 text-rose-600" },
  { id: "disinfection", icon: ShieldAlert, color: "bg-cyan-100 text-cyan-600" }
];

const content = {
  en: {
    heroBadge: "For Service Providers",
    heroTitle: "Turn Your Skills into a Thriving",
    heroTitleHighlight: "Business",
    heroDesc: "Join Kaamgar, India's most reliable platform connecting skilled local professionals with thousands of customers. Get flexible jobs, set your own schedule, and earn more.",
    ctaPrimary: "Register Now",
    ctaSecondary: "Explore Jobs",
    aboutTitle: "About Kaamgar",
    aboutDesc: "Kaamgar is India's premier platform dedicated to empowering local service providers. We bridge the gap between skilled experts and customers in need of quick, reliable services. Whether you are an electrician, a plumber, or a cleaner, Kaamgar helps you find local jobs without the hassle of marketing yourself. Work on your own terms, manage your schedule dynamically, and guarantee secure payments through our trusted platform. Join a community of over 1.2 million happy users and thousands of successful professionals today.",
    servicesTitle: "Services We Empower",
    servicesDesc: "We support a wide array of skills. If you are an expert in any of these fields, there's a place for you here.",
    whyJoinTitle: "Why Join Kaamgar?",
    whyJoinDesc: "We provide everything you need to grow your business successfully.",
    benefits: [
      { title: "Zero Commission", desc: "Enjoy 0% platform fee on your first 10 completed jobs." },
      { title: "Direct Payments", desc: "Get paid securely and directly to your bank account." },
      { title: "Flexible Schedule", desc: "Work when you want. You are your own boss." },
      { title: "Local Jobs", desc: "Get matched with customers within your 5-10km radius." },
      { title: "Free Training", desc: "Access upskilling workshops and certifications for free." },
      { title: "24/7 Support", desc: "Our dedicated team is always here to help you." }
    ],
    serviceNames: {
      "electrician": "Electrician",
      "plumber": "Plumber",
      "carpenter": "Carpenter",
      "painter": "Painter",
      "cleaning": "Cleaning",
      "ac-repair": "AC Repair",
      "masonry": "Masonry",
      "pest-control": "Pest Control",
      "gardening": "Gardening",
      "movers": "Packers & Movers",
      "appliances": "Appliance Repair",
      "sofa": "Sofa Cleaning",
      "disinfection": "Disinfection"
    }
  },
  hi: {
    heroBadge: "सेवा प्रदाताओं के लिए",
    heroTitle: "अपने हुनर को एक सफल",
    heroTitleHighlight: "व्यवसाय में बदलें",
    heroDesc: "कामगार से जुड़ें, जो भारत का सबसे विश्वसनीय प्लेटफॉर्म है, जहाँ कुशल स्थानीय पेशेवरों को हज़ारों ग्राहकों से जोड़ा जाता है। लचीले काम पाएं, अपना समय खुद तय करें और ज़्यादा कमाएं।",
    ctaPrimary: "अभी पंजीकरण करें",
    ctaSecondary: "नौकरियां खोजें",
    aboutTitle: "कामगार के बारे में",
    aboutDesc: "कामगार भारत का प्रमुख प्लेटफॉर्म है जो स्थानीय सेवा प्रदाताओं को सशक्त बनाने के लिए समर्पित है। हम कुशल विशेषज्ञों और विश्वसनीय सेवाओं की तलाश कर रहे ग्राहकों के बीच एक मजबूत सेतु बनाते हैं। चाहे आप इलेक्ट्रीशियन हों, प्लंबर हों, या सफाई कर्मचारी, कामगार आपको बिना किसी मार्केटिंग झंझट के स्थानीय काम खोजने में मदद करता है। अपनी शर्तों पर काम करें, अपना समय खुद तय करें, और हमारे विश्वसनीय मंच के माध्यम से सुरक्षित भुगतान प्राप्त करें। आज ही 12 लाख से अधिक खुश उपयोगकर्ताओं और हजारों सफल पेशेवरों के समुदाय में शामिल हों।",
    servicesTitle: "हम किन सेवाओं का समर्थन करते हैं",
    servicesDesc: "हम कई प्रकार के कौशल का समर्थन करते हैं। यदि आप इनमें से किसी भी क्षेत्र के विशेषज्ञ हैं, तो हमारे पास आपके लिए अवसर हैं।",
    whyJoinTitle: "कामगार से क्यों जुड़ें?",
    whyJoinDesc: "हम आपके व्यवसाय को सफलतापूर्वक बढ़ाने के लिए आवश्यक सब कुछ प्रदान करते हैं।",
    benefits: [
      { title: "शून्य कमीशन", desc: "अपने पहले 10 सफल कामों पर 0% प्लेटफॉर्म शुल्क का आनंद लें।" },
      { title: "सीधा भुगतान", desc: "सुरक्षित रूप से और सीधे अपने बैंक खाते में भुगतान प्राप्त करें।" },
      { title: "लचीला समय", desc: "जब चाहें तब काम करें। आप अपने खुद के बॉस हैं।" },
      { title: "स्थानीय काम", desc: "अपने 5-10 किमी के दायरे में ग्राहकों से जुड़ें।" },
      { title: "मुफ्त प्रशिक्षण", desc: "मुफ्त में कौशल विकास कार्यशालाओं और प्रमाणपत्रों तक पहुंचें।" },
      { title: "24/7 समर्थन", desc: "हमारी समर्पित टीम आपकी मदद के लिए हमेशा मौजूद है।" }
    ],
    serviceNames: {
      "electrician": "इलेक्ट्रीशियन",
      "plumber": "प्लंबर",
      "carpenter": "बढ़ई",
      "painter": "पेंटर",
      "cleaning": "सफाई",
      "ac-repair": "एसी रिपेयर",
      "masonry": "राजमिस्त्री",
      "pest-control": "कीट नियंत्रण",
      "gardening": "बागवानी",
      "movers": "पैकर्स एंड मूवर्स",
      "appliances": "उपकरण मरम्मत",
      "sofa": "सोफा सफाई",
      "disinfection": "कीटाणुशोधन"
    }
  }
};

type Lang = "en" | "hi";

export default function ServiceProviderLanding() {
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];

  return (
    <div className="flex min-h-screen flex-col selection:bg-brand-amber selection:text-brand-navy">
      <Navbar />

      <main className="flex-1">
        {/* Language Toggle Container */}
        <div className="bg-brand-navy border-b border-brand-navy-light pt-[70px]">
          <div className="container mx-auto px-4 md:px-8 py-3 flex justify-end">
            <Tabs value={lang} onValueChange={(v) => setLang(v as Lang)} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2 bg-brand-navy-light/50 border border-white/10">
                <TabsTrigger value="en" className="data-[state=active]:bg-brand-amber data-[state=active]:text-brand-navy text-white font-bold">English</TabsTrigger>
                <TabsTrigger value="hi" className="data-[state=active]:bg-brand-amber data-[state=active]:text-brand-navy text-white font-bold">हिन्दी</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-brand-navy text-white pt-12 pb-24 md:pt-20 md:pb-32">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="bg-brand-amber/20 text-brand-amber border border-brand-amber/30 px-4 py-1.5 text-sm font-bold tracking-widest uppercase">
                  {t.heroBadge}
                </Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                  {t.heroTitle} <span className="text-brand-amber underline decoration-brand-amber/30 underline-offset-8">{t.heroTitleHighlight}</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-lg">
                  {t.heroDesc}
                </p>
                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <Button asChild size="lg" className="h-14 px-10 bg-brand-amber hover:bg-yellow-500 text-brand-navy font-black text-lg shadow-xl shadow-brand-amber/20 hover-scale">
                    <Link href="/auth/kaamgar/signup">{t.ctaPrimary}</Link>
                  </Button>
                  <Button asChild size="lg" className="h-14 px-10 border-2 border-white/20 text-white hover:bg-white/10 hover:text-white font-bold text-lg hover-scale">
                    <Link href="#about">{t.ctaSecondary}</Link>
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-md lg:max-w-full lg:h-[500px] flex justify-center items-center">
                <div className="absolute inset-0 bg-brand-amber/10 blur-[100px] rounded-full" />
                <div className="relative aspect-square w-full max-w-[450px] bg-brand-navy-light/40 rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="text-brand-amber" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-brand-navy/[0.02]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy leading-tight">
                {t.aboutTitle}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                {t.aboutDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-24 relative overflow-hidden bg-white border-y border-brand-navy/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy">{t.whyJoinTitle}</h2>
              <p className="text-lg text-muted-foreground font-medium">{t.whyJoinDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.benefits.map((benefit, idx) => (
                <Card key={idx} className="bg-brand-navy/[0.02] border border-brand-navy/5 hover:border-brand-amber/30 hover:shadow-xl transition-all duration-300 rounded-[2rem] hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-brand-navy text-brand-amber mb-6 rounded-2xl flex items-center justify-center shadow-lg">
                      <Star className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-extrabold text-brand-navy mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-brand-navy text-white rounded-[3rem] mx-4 md:mx-8 my-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-amber/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-navy-light/30 blur-[120px] rounded-full" />

          <div className="container mx-auto px-4 md:px-12 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">{t.servicesTitle}</h2>
              <p className="text-lg text-white/70 font-medium">{t.servicesDesc}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-amber/50 rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 cursor-default">
                  <div className={`${service.color} h-16 w-16 rounded-2xl flex items-center justify-center mb-4 shadow-inner ring-2 ring-white/10`}>
                    <service.icon className="h-8 w-8 stroke-[2]" />
                  </div>
                  <h4 className="font-bold text-lg whitespace-nowrap">{t.serviceNames[service.id as keyof typeof t.serviceNames]}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
