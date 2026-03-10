"use client";

import Link from "next/link";
import { Hammer, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-brand-navy border-t border-white/5 py-12 md:py-20 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
          
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 p-2 border border-white/20 backdrop-blur-sm self-center">
                <Hammer className="text-brand-amber h-7 w-7" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white leading-tight">
                Kaamgar
              </span>
            </Link>
            <p className="text-white/70 leading-relaxed mb-6 font-medium text-sm">
              Connecting thousands of households with skilled local professionals for reliable, efficient, and transparent home services across India.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-amber hover:text-brand-navy transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-amber hover:text-brand-navy transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-amber hover:text-brand-navy transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-amber hover:text-brand-navy transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-6 text-brand-amber uppercase tracking-wider text-sm">Platform</h4>
            <ul className="space-y-4 text-white/70 font-medium">
              <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Popular Services</Link></li>
              <li><Link href="/login/provider" className="hover:text-white transition-colors">Join as a Kaamgar</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Post a Service Request</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-6 text-brand-amber uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-white/70 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Press & Media</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-6 text-brand-amber uppercase tracking-wider text-sm">Contact Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-brand-amber shrink-0 mt-0.5" />
                <span className="text-white/70 tracking-tight leading-snug">Hitech City, Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-brand-amber shrink-0" />
                <span className="text-white/70">+91 91234 56789</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-brand-amber shrink-0" />
                <span className="text-white/70">care@kaamgar.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-semibold uppercase tracking-widest text-white/40">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} KAAMGAR PLATFORM PRIVATE LIMITED. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-all underline underline-offset-4 decoration-white/20">Sitemap</Link>
            <Link href="#" className="hover:text-white transition-all underline underline-offset-4 decoration-white/20">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
