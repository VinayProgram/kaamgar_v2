import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
          Kaamgar<span className="text-blue-600">.</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/auth/kaamgar/signin" className="text-sm font-medium hover:text-blue-600 transition-colors">
            For Professionals
          </Link>
          <Link href="/auth/consumer/signin" className="text-sm font-medium hover:text-blue-600 transition-colors">
            For Customers
          </Link>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
