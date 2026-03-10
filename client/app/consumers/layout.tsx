import { Navbar } from "@/components/Navbar"
import { ConsumerNavbar } from "@/components/consumers/consumer-navbar"
import { Footer } from "@/components/Footer"

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 overflow-x-hidden">
      <Navbar />
      <ConsumerNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
           {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
