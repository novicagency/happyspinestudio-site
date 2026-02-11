"use client";

import { useState, useEffect } from "react";

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <button onClick={onClose} className="text-[#2c5887] mb-6 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="space-y-4">
            <a href="/" onClick={onClose} className="block text-base font-medium text-[#2c5887] hover:text-[#2c5887] transition">Home</a>
            <a href="/about" onClick={onClose} className="block text-base font-medium text-[#2c5887] hover:text-[#2c5887] transition">About</a>
            <a href="/#pricing" onClick={onClose} className="block text-base font-medium text-[#2c5887] hover:text-[#2c5887] transition">Pricing</a>
            <a href="/#testimonials" onClick={onClose} className="block text-base font-medium text-[#2c5887] hover:text-[#2c5887] transition">Reviews</a>
            <a href="/#hours" onClick={onClose} className="block text-base font-medium text-[#2c5887] hover:text-[#2c5887] transition">Hours</a>
            <a href="/#contact" onClick={onClose} className="block text-base font-medium text-[#2c5887] hover:text-[#2c5887] transition">Contact</a>
          </nav>
          <div className="mt-6 -mx-6 -mb-6 p-5 bg-[#2c5887]">
            <div className="space-y-3">
              <a href="tel:843-831-0033" className="flex items-center gap-3 text-white hover:text-[#2c5887] transition">
                <svg className="w-5 h-5 text-[#6b8db5]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold">(843) 831-0033 <span className="font-normal text-[#6b8db5] text-sm">Office</span></span>
              </a>
              <a href="mailto:contact@happyspine.com" className="flex items-center gap-3 text-white hover:text-[#2c5887] transition">
                <svg className="w-5 h-5 text-[#6b8db5]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">contact@happyspine.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-800 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <a href="/" className="lg:hidden">
              <img src="/images/logo-full.png" alt="The Happy Spine Studio" className="h-14 min-[360px]:h-20 md:h-28 w-auto -my-2 min-[360px]:-my-4 md:-my-6" />
            </a>
            <a href="/" className="hidden lg:block">
              <img src="/images/logo-full.png" alt="The Happy Spine Studio" className="h-32 w-auto -my-6" />
            </a>
          </div>
          
          <div className="hidden lg:flex gap-8 text-gray-600 font-medium text-lg">
            <a href="/about" className="hover:text-[#2c5887] transition text-[#2c5887]">About</a>
            <a href="/#pricing" className="hover:text-[#2c5887] transition">Pricing</a>
            <a href="/#testimonials" className="hover:text-[#2c5887] transition">Reviews</a>
            <a href="/#hours" className="hover:text-[#2c5887] transition">Hours</a>
            <a href="/#contact" className="hover:text-[#2c5887] transition">Contact</a>
          </div>
          
          <a
            href="/#pricing"
            className="bg-[#2c5887] text-white px-2 py-1.5 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded font-semibold hover:bg-[#1e3a5f] transition text-xs md:text-sm lg:text-base shadow-sm cursor-pointer"
          >
            View Plans
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-8 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <a href="/" className="inline-flex items-center gap-2 text-[#2c5887] font-medium mb-6 hover:text-[#1e4163] transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
          
          {/* Photo + Name */}
          <div className="text-center mb-8">
            <img 
              src="/images/headshot.png" 
              alt="Dr. Jason Bell" 
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-lg ring-4 ring-white"
            />
            <h1 className="text-3xl font-bold text-[#2c5887] mb-2">Dr. Jason Bell, DC</h1>
            <p className="text-[#2c5887] italic">"Make Your Spine Happy."</p>
          </div>
          
          {/* Quick Info */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-white rounded-xl px-4 py-3 shadow-md border border-[#2c5887] text-center">
              <p className="text-2xl font-bold text-[#1e4163]">26+</p>
              <p className="text-sm text-gray-600">Years Experience</p>
            </div>
            <div className="bg-white rounded-xl px-4 py-3 shadow-md border border-[#2c5887] text-center">
              <p className="text-2xl font-bold text-[#1e4163]">4.8</p>
              <p className="text-sm text-gray-600">★ Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="pt-2 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#2c5887] mb-4">About Dr. Bell</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Dr. Jason Bell is a dedicated chiropractor serving the Myrtle Beach community. With a passion for helping people live pain-free lives, he founded The Happy Spine Studio to provide personalized, affordable chiropractic care.
            </p>
            <p>
              After earning his Doctor of Chiropractic degree, Dr. Bell has spent years refining his techniques and building genuine relationships with his patients. He believes that everyone deserves access to quality chiropractic care without the hassle of insurance complications or long-term contracts.
            </p>
            <p>
              When he's not adjusting spines, Dr. Bell enjoys spending time outdoors, staying active, and being part of the Myrtle Beach community he loves to serve.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 md:py-16 px-4 bg-gradient-to-br from-cyan-500 to-[#2c5887]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Make Your Spine Happy?
          </h2>
          <p className="text-cyan-100 md:text-xl mb-6 md:mb-8">
            Walk-ins welcome, or call ahead to let us know you're coming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:843-831-0033"
              className="bg-white/20 text-white border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-3 md:text-lg cursor-pointer"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(843) 831-0033</span>
            </a>
            <a
              href="mailto:contact@happyspine.com"
              className="bg-white/20 text-white border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-3 md:text-lg cursor-pointer"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@happyspine.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 mb-8 items-start">
            <div className="lg:col-span-2 lg:-mt-8">
              <div className="mb-4">
                <img src="/images/logo-full.png" alt="The Happy Spine Studio" className="h-24 md:h-32 w-auto" />
              </div>
              <p className="text-[#2c5887] mb-4 italic">
                "Make Your Spine Happy."
              </p>
              <p className="text-gray-600 text-sm">
                Personalized chiropractic care in Myrtle Beach, SC.<br />
                Walk-ins welcome. No appointments necessary.
              </p>
            </div>
            <div className="min-w-0">
              <h4 className="text-[#2c5887] font-semibold mb-4">Contact</h4>
              <p className="text-gray-700">
                <span className="text-gray-500 text-sm">Office:</span> (843) 831-0033
              </p>
              <p className="text-gray-700">
                <span className="text-gray-500 text-sm">Mobile:</span> (843) 855-1300
              </p>
              <p className="text-gray-700 break-all">
                contact@happyspine.com
              </p>
            </div>
            <div>
              <h4 className="text-[#2c5887] font-semibold mb-4">Address</h4>
              <a href="https://maps.google.com/?q=207+Chartwell+Ct+Myrtle+Beach+SC+29588" target="_blank" rel="noopener noreferrer" className="text-gray-700 mb-4 block hover:text-[#2c5887] transition">
                207 Chartwell Ct.<br />
                Myrtle Beach, SC 29588
              </a>
              <h4 className="text-[#2c5887] font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-white border border-gray-300 hover:bg-[#2c5887] hover:border-[#2c5887] rounded-lg flex items-center justify-center transition group">
                  <svg className="w-5 h-5 text-[#2c5887] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 bg-white border border-gray-300 hover:bg-[#2c5887] hover:border-[#2c5887] rounded-lg flex items-center justify-center transition group">
                  <svg className="w-5 h-5 text-[#2c5887] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 5.924c-.806.358-1.67.6-2.577.708a4.515 4.515 0 001.98-2.49 9.02 9.02 0 01-2.86 1.093 4.507 4.507 0 00-7.677 4.108 12.787 12.787 0 01-9.29-4.71 4.507 4.507 0 001.394 6.014 4.48 4.48 0 01-2.04-.563v.057a4.507 4.507 0 003.616 4.415 4.52 4.52 0 01-2.034.077 4.51 4.51 0 004.208 3.128 9.038 9.038 0 01-5.6 1.93c-.364 0-.723-.021-1.077-.063a12.746 12.746 0 006.92 2.027c8.3 0 12.84-6.876 12.84-12.84 0-.195-.005-.39-.014-.583a9.172 9.172 0 002.252-2.336z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 bg-white border border-gray-300 hover:bg-[#2c5887] hover:border-[#2c5887] rounded-lg flex items-center justify-center transition group">
                  <svg className="w-5 h-5 text-[#2c5887] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 bg-white border border-gray-300 hover:bg-[#2c5887] hover:border-[#2c5887] rounded-lg flex items-center justify-center transition group">
                  <svg className="w-5 h-5 text-[#2c5887] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 bg-white border border-gray-300 hover:bg-[#2c5887] hover:border-[#2c5887] rounded-lg flex items-center justify-center transition group">
                  <svg className="w-5 h-5 text-[#2c5887] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8">
            <p className="text-gray-500 text-sm text-center">
              © 2026 The Happy Spine Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
