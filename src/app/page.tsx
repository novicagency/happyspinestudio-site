"use client";

import { useState, useEffect, useRef } from "react";

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* Menu */}
      <div className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <button onClick={onClose} className="text-[#2c5887] mb-6 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="space-y-4">
            <a href="#" onClick={onClose} className="block text-base font-medium text-[#1a3351] hover:text-[#2c5887] transition">Home</a>
            <a href="/about" onClick={onClose} className="block text-base font-medium text-[#1a3351] hover:text-[#2c5887] transition">About</a>
            <a href="#pricing" onClick={onClose} className="block text-base font-medium text-[#1a3351] hover:text-[#2c5887] transition">Pricing</a>
            <a href="#testimonials" onClick={onClose} className="block text-base font-medium text-[#1a3351] hover:text-[#2c5887] transition">Reviews</a>
            <a href="#hours" onClick={onClose} className="block text-base font-medium text-[#1a3351] hover:text-[#2c5887] transition">Hours</a>
            <a href="#contact" onClick={onClose} className="block text-base font-medium text-[#1a3351] hover:text-[#2c5887] transition">Contact</a>
          </nav>
          <div className="mt-6 -mx-6 -mb-6 p-5 bg-[#2c5887]">
            <div className="space-y-3">
              <a href="tel:843-831-0033" className="flex items-center gap-3 text-white hover:text-blue-100 transition">
                <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold">(843) 831-0033 <span className="font-normal text-blue-200 text-sm">Office</span></span>
              </a>
              <a href="mailto:contact@happyspine.com" className="flex items-center gap-3 text-white hover:text-blue-100 transition">
                <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">contact@happyspine.com</span>
              </a>
              <a href="https://maps.google.com/?q=207+Chartwell+Ct+Myrtle+Beach+SC+29588" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white hover:text-blue-100 transition">
                <svg className="w-5 h-5 text-blue-200 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">207 Chartwell Ct.<br />Myrtle Beach, SC 29588</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: "Sarah M.",
    text: "Dr. Bell is amazing! I've been coming here for months and my back pain is completely gone. The walk-in hours are so convenient for my busy schedule.",
    rating: 5,
  },
  {
    name: "Mike T.",
    text: "Best chiropractor in Myrtle Beach. No insurance hassle, fair prices, and Dr. Bell really takes the time to understand what's going on.",
    rating: 5,
  },
  {
    name: "Jennifer R.",
    text: "The mobile chiropractic service is a game-changer! Dr. Bell comes to my house on Thursdays and it's so much easier than trying to get to an office.",
    rating: 5,
  },
  {
    name: "David K.",
    text: "Finally found a chiropractor who doesn't try to lock you into long contracts. Month-to-month wellness plan is exactly what I needed.",
    rating: 5,
  },
];

// Helper function to get store open/closed status
function getStoreStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour + minute / 60;

  // Store hours:
  // Mon: 10am-7pm, Tue: Mobile (closed), Wed: 10am-7pm, Thu: Mobile (closed)
  // Fri: 10am-7pm, Sat: 10am-2pm, Sun: Closed
  const schedule: { [key: number]: { open: number; close: number; mobile?: boolean } | null } = {
    0: null, // Sunday - Closed
    1: { open: 10, close: 19 }, // Monday 10am-7pm
    2: { open: 10, close: 19, mobile: true }, // Tuesday - Mobile
    3: { open: 10, close: 19 }, // Wednesday 10am-7pm
    4: { open: 10, close: 19, mobile: true }, // Thursday - Mobile
    5: { open: 10, close: 19 }, // Friday 10am-7pm
    6: { open: 10, close: 14 }, // Saturday 10am-2pm
  };

  const todaySchedule = schedule[day];
  
  // Find next open day/time
  const getNextOpen = () => {
    let checkDay = day;
    for (let i = 0; i < 7; i++) {
      checkDay = (day + i) % 7;
      const daySchedule = schedule[checkDay];
      if (daySchedule && !daySchedule.mobile) {
        if (i === 0 && currentTime < daySchedule.open) {
          return { day: checkDay, time: daySchedule.open };
        } else if (i > 0) {
          return { day: checkDay, time: daySchedule.open };
        }
      }
    }
    return { day: 1, time: 10 }; // Default to Monday 10am
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const formatTime = (time: number) => {
    const h = Math.floor(time);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour12}:00 ${ampm}`;
  };

  if (!todaySchedule) {
    // Closed today (Sunday)
    const next = getNextOpen();
    return { isOpen: false, message: `Opens ${formatTime(next.time)} ${dayNames[next.day]}` };
  }

  if (todaySchedule.mobile) {
    // Mobile day - studio closed
    const next = getNextOpen();
    return { isOpen: false, isMobile: true, message: `Mobile Day`, studioOpens: `Studio opens ${formatTime(next.time)} ${dayNames[next.day]}` };
  }

  if (currentTime < todaySchedule.open) {
    // Before opening
    return { isOpen: false, message: `Opens ${formatTime(todaySchedule.open)}` };
  }

  if (currentTime >= todaySchedule.close) {
    // After closing
    const next = getNextOpen();
    const nextDayName = next.day === (day + 1) % 7 ? '' : ` ${dayNames[next.day]}`;
    return { isOpen: false, message: `Opens ${formatTime(next.time)}${nextDayName}` };
  }

  // Currently open
  return { isOpen: true, message: `Closes ${formatTime(todaySchedule.close)}` };
}

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoursOpen, setHoursOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [currentActionImage, setCurrentActionImage] = useState(0);
  const [waveVisible, setWaveVisible] = useState(false);
  const waveRef = useRef<HTMLDivElement>(null);
  const [storeStatus, setStoreStatus] = useState(getStoreStatus());

  // Update store status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setStoreStatus(getStoreStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top on page load/refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const actionImages = [
    { src: "/images/action_1.webp", alt: "Dr. Bell adjusting a patient" },
    { src: "/images/action_2.webp", alt: "Chiropractic consultation" },
    { src: "/images/action_3.webp", alt: "Spinal adjustment technique" },
  ];

  const videos = [
    { title: "What to Expect on Your First Visit", duration: "2:30" },
    { title: "Understanding Back Pain", duration: "3:45" },
    { title: "Mobile Chiropractic: How It Works", duration: "4:15" },
    { title: "Patient Success Stories", duration: "5:00" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentActionImage((prev) => (prev + 1) % actionImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [actionImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWaveVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (waveRef.current) {
      observer.observe(waveRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Mobile: Hamburger + Logo | Desktop: Logo + Title */}
          <div className="flex items-center gap-3">
            {/* Hamburger - Mobile Only */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Logo - Mobile/Tablet */}
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/images/logo-full.png" alt="The Happy Spine Studio" className="lg:hidden h-16 min-[360px]:h-24 md:h-32 w-auto -my-3 min-[360px]:-my-5 md:-my-8" />
            </a>
            {/* Logo - Desktop */}
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/images/logo-full.png" alt="The Happy Spine Studio" className="hidden lg:block h-40 w-auto -my-8" />
            </a>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-8 text-gray-600 font-medium text-lg">
            <a href="/about" className="hover:text-[#2c5887] transition">About</a>
            <a href="#pricing" className="hover:text-[#2c5887] transition">Pricing</a>
            <a href="#testimonials" className="hover:text-[#2c5887] transition">Reviews</a>
            <a href="#hours" className="hover:text-[#2c5887] transition">Hours</a>
            <a href="#contact" className="hover:text-[#2c5887] transition">Contact</a>
          </div>
          
          {/* CTA Button - Mobile/Tablet/Desktop */}
          <a
            href="#pricing"
            className="bg-[#2c5887] text-white px-2 py-1.5 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded font-semibold hover:bg-[#1e3a5f] transition text-xs md:text-sm lg:text-base shadow-sm"
          >
            View Plans
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-40 pb-12 md:pb-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="md:grid md:grid-cols-2 md:gap-12 md:items-start">
            {/* Left Column */}
            <div>
            <h1 className="text-[#1e3a5f] text-4xl md:text-6xl font-bold mb-2 md:mb-4 tracking-tight" style={{ fontFamily: 'var(--font-poppins)' }}>Myrtle Beach</h1>
            <p className="text-[#2c5887]/70 text-base md:text-2xl mb-3 md:mb-6 italic tracking-wide">"Make Your Spine Happy."</p>
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl px-4 md:px-6 py-2 md:py-4">
              <p className="text-[#1e3a5f] font-semibold text-sm md:text-lg">Walk-In <span className="font-normal text-[#2c5887]">• No appointments necessary</span></p>
            </div>
            <div className="my-6 md:my-10 h-1 md:h-1.5 w-32 md:w-48 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent rounded-full"></div>
            {/* Address */}
            <a 
              href="https://maps.google.com/?q=207+Chartwell+Ct+Myrtle+Beach+SC+29588" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6 hover:opacity-80 transition cursor-pointer"
            >
              <svg className="w-5 h-5 md:w-7 md:h-7 text-[#2c5887] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-[#1e3a5f] text-base md:text-xl font-medium">207 Chartwell Ct.</p>
                <p className="text-[#2c5887] text-base md:text-xl">Myrtle Beach, SC 29588</p>
              </div>
            </a>

            {/* Hours */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-center gap-3 md:gap-4">
                <svg className="w-5 h-5 md:w-7 md:h-7 text-[#2c5887] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-[#1e3a5f] text-base md:text-xl">
                    {storeStatus.isOpen ? (
                      <><span className="text-emerald-500 font-semibold">Open</span> · {storeStatus.message}</>
                    ) : storeStatus.isMobile ? (
                      <><span className="text-red-500 font-semibold">Closed</span> · {storeStatus.message}<br className="md:hidden" /><span className="hidden md:inline"> · </span>{storeStatus.studioOpens}</>
                    ) : (
                      <><span className="text-red-500 font-semibold">Closed</span> · {storeStatus.message}</>
                    )}
                  </p>
                  <button 
                    onClick={() => setHoursOpen(!hoursOpen)}
                    className="text-blue-500 text-sm md:text-base hover:text-[#1e3a5f] transition flex items-center gap-1 cursor-pointer"
                  >
                    {hoursOpen ? "− Hide" : "+ View All Hours"}
                  </button>
                </div>
              </div>
              {/* Hours Dropdown */}
              {hoursOpen && (
                <div className="mt-2 ml-8 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs w-48">
                  <p className="text-[#1a3351] font-semibold mb-1">Studio Hours</p>
                  <div className="space-y-1 text-[#2c5887]">
                    <div className="flex justify-between"><span>Mon</span><span className="text-[#1a3351]">10am–7pm</span></div>
                    <div className="flex justify-between"><span>Tue</span><span className="text-blue-500">Mobile</span></div>
                    <div className="flex justify-between"><span>Wed</span><span className="text-[#1a3351]">10am–7pm</span></div>
                    <div className="flex justify-between"><span>Thu</span><span className="text-blue-500">Mobile</span></div>
                    <div className="flex justify-between"><span>Fri</span><span className="text-[#1a3351]">10am–7pm</span></div>
                    <div className="flex justify-between"><span>Sat</span><span className="text-[#1a3351]">10am–2pm</span></div>
                    <div className="flex justify-between"><span>Sun</span><span className="text-red-500">Closed</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2 mb-6 md:mb-8">
              <div className="flex items-center gap-3 md:gap-4">
                <svg className="w-5 h-5 md:w-7 md:h-7 text-[#2c5887] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:843-831-0033" className="text-[#1e3a5f] text-base md:text-xl font-semibold hover:text-blue-500 transition">
                  (843) 831-0033 <span className="font-normal text-[#2c5887] text-sm">Office</span>
                </a>
              </div>
              <div className="flex items-center gap-3 md:gap-4 ml-8 md:ml-11">
                <a href="tel:843-855-1300" className="text-[#1e3a5f] text-base md:text-xl font-semibold hover:text-blue-500 transition">
                  (843) 855-1300 <span className="font-normal text-[#2c5887] text-sm">Mobile</span>
                </a>
              </div>
            </div>

            {/* Doctor Info Card - Mobile */}
            <div className="md:hidden bg-blue-50 rounded-xl px-4 py-3 shadow-lg border-2 border-blue-400">
              <div className="flex items-center gap-3">
                {/* Headshot */}
                <img src="/images/headshot.png" alt="Dr. Jason Bell" className="w-14 h-14 object-cover rounded-full flex-shrink-0 shadow-md ring-2 ring-white" style={{ objectPosition: 'center 80%' }} />
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[#1a3351] font-bold text-sm">Jason Bell, DC</p>
                  <p className="text-[#2c5887] text-xs leading-snug mt-0.5">Personalized chiropractic care with a focus on helping Myrtle Beach feel their best.</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-amber-400 text-xs">★★★★★</span>
                    <span className="text-[#1a3351] text-xs font-semibold">4.8</span>
                    <span className="text-blue-500 text-xs">(50+ reviews)</span>
                  </div>
                  <a href="/about" className="text-[#2c5887] text-xs font-semibold hover:text-[#1a3351] transition flex items-center gap-1 mt-1.5">
                    About Jason <span className="text-sm">→</span>
                  </a>
                </div>
              </div>
            </div>
            </div>

            {/* Right Column - Desktop Only */}
            <div className="hidden md:block">
              {/* Doctor Info Card - Desktop */}
              <div className="bg-blue-50 rounded-2xl p-6 shadow-xl border-2 border-blue-400">
                <div className="flex items-center gap-4 mb-4">
                  <img src="/images/headshot.png" alt="Dr. Jason Bell" className="w-16 h-16 object-cover rounded-full flex-shrink-0 shadow-lg ring-4 ring-white" style={{ width: '76px', height: '76px', objectPosition: 'center 80%' }} />
                  <div>
                    <p className="text-[#1a3351] font-bold text-xl">Jason Bell, DC</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-amber-400 text-base">★★★★★</span>
                      <span className="text-[#1a3351] text-sm font-semibold">4.8</span>
                      <span className="text-blue-500 text-sm">(50+ reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#1e3a5f] text-base leading-relaxed mb-4">Personalized chiropractic care with a focus on helping Myrtle Beach feel their best.</p>
                <a href="/about" className="inline-flex items-center gap-2 text-[#2c5887] font-semibold hover:text-[#1a3351] transition cursor-pointer">
                  About Jason <span className="text-lg">→</span>
                </a>
              </div>

              {/* Action Image Slideshow - Desktop */}
              <div className="mt-8 mb-6 relative">
                {/* Outer frame */}
                <div className="bg-gradient-to-br from-[#1e3a5f] via-[#1a3351] to-[#152a42] p-2 rounded-lg">
                  {/* Inner matte */}
                  <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 p-3 rounded-md">
                    {/* Image container */}
                    <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
                      {actionImages.map((image, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-700 ${
                            index === currentActionImage ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {/* Dots indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {actionImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentActionImage(index)}
                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                              index === currentActionImage ? "bg-white w-4" : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Patient Special Banner - Ticker */}
      <section className="bg-[#db813c] overflow-hidden">
        <div className="py-2 flex">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 pr-16">
            <span className="flex items-center gap-3 text-white">
              <span className="font-bold">$29 New Patient Special</span>
              <span className="text-[#f5d4bc]">•</span>
              <span>Includes consult, exam & adjustment</span>
            </span>
            <span className="flex items-center gap-3 text-white">
              <span className="font-bold">$29 New Patient Special</span>
              <span className="text-[#f5d4bc]">•</span>
              <span>Includes consult, exam & adjustment</span>
            </span>
            <span className="flex items-center gap-3 text-white">
              <span className="font-bold">$29 New Patient Special</span>
              <span className="text-[#f5d4bc]">•</span>
              <span>Includes consult, exam & adjustment</span>
            </span>
            <span className="flex items-center gap-3 text-white">
              <span className="font-bold">$29 New Patient Special</span>
              <span className="text-[#f5d4bc]">•</span>
              <span>Includes consult, exam & adjustment</span>
            </span>
          </div>
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 pr-16">
            <span className="flex items-center gap-3 text-white">
              <span className="font-bold">$29 New Patient Special</span>
              <span className="text-[#f5d4bc]">•</span>
              <span>Includes consult, exam & adjustment</span>
            </span>
            <span className="flex items-center gap-3 text-white">
              <span className="font-bold">$29 New Patient Special</span>
              <span className="text-[#f5d4bc]">•</span>
              <span>Includes consult, exam & adjustment</span>
            </span>
            <span className="flex items-center gap-3 text-white">
              <span className="font-bold">$29 New Patient Special</span>
              <span className="text-[#f5d4bc]">•</span>
              <span>Includes consult, exam & adjustment</span>
            </span>
            <span className="flex items-center gap-3 text-white">
              <span className="font-bold">$29 New Patient Special</span>
              <span className="text-[#f5d4bc]">•</span>
              <span>Includes consult, exam & adjustment</span>
            </span>
          </div>
        </div>
        <div className="bg-[#c46d2a] py-3 text-center">
          <span className="text-white font-semibold text-sm">
            ✓ Walk-ins Welcome — No Appointment Needed
          </span>
        </div>
      </section>

      {/* Video Carousel */}
      <section className="bg-gray-50 py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#2c5887] text-2xl md:text-3xl font-semibold tracking-[0.2em] uppercase mb-6 text-center">Showcase</p>
          {/* Video Container */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="aspect-video bg-[#152a42] flex items-center justify-center relative">
              <div className="text-center text-white">
                <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 hover:bg-white/30 transition cursor-pointer">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">Video Coming Soon</p>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-[#1a3351]">{videos[currentVideo].title}</h4>
              <p className="text-[#2c5887] text-sm">{videos[currentVideo].duration}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1))}
              className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-50 transition border-2 border-blue-300 cursor-pointer"
            >
              <svg className="w-5 h-5 md:w-7 md:h-7 text-[#2c5887]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-[#2c5887] font-bold text-base md:text-xl min-w-[60px] text-center">
              {currentVideo + 1} / {videos.length}
            </span>
            <button
              onClick={() => setCurrentVideo((prev) => (prev === videos.length - 1 ? 0 : prev + 1))}
              className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-50 transition border-2 border-blue-300 cursor-pointer"
            >
              <svg className="w-5 h-5 md:w-7 md:h-7 text-[#2c5887]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Description */}
            <div>
              <p className="text-[#2c5887] text-base md:text-2xl font-semibold tracking-[0.2em] uppercase mb-2">About The Clinic</p>
              <h2 className="text-[#1a3351] text-2xl min-[320px]:text-[1.2rem] min-[321px]:text-2xl min-[344px]:text-[1.4rem] min-[345px]:text-2xl min-[360px]:text-xl min-[361px]:text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>Your Neighborhood Chiropractor in Myrtle Beach</h2>
              <div className="space-y-4 text-[#1e3a5f] leading-relaxed">
                <p>
                  At The Happy Spine Studio, we offer personalized chiropractic care that supports your lifestyle and health goals. Whether you're managing chronic pain, recovering from an injury, or looking to improve your overall wellness, Dr. Jason Bell provides treatment plans tailored to your needs.
                </p>
                <p>
                  You'll find us at 207 Chartwell Ct., Myrtle Beach, SC 29588. We proudly serve patients throughout the Myrtle Beach community and surrounding areas.
                </p>
                <p>
                  We make it easy to access high-quality chiropractic care that is affordable, effective, and personalized. Whether you're managing pain, addressing stiffness, or staying proactive about your health, we provide care that helps you feel and move better.
                </p>
              </div>
            </div>
            {/* Image */}
            <div className="relative">
              <div className="bg-blue-100 rounded-2xl aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-blue-500">
                  <div className="w-24 h-24 mx-auto bg-blue-200 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Dr. Bell in Action</p>
                  <p className="text-xs text-blue-400">Photo Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="testimonials" className="py-12 md:py-16 px-4 bg-blue-50 scroll-mt-20">
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          <p className="text-[#2c5887] text-xl md:text-3xl font-semibold tracking-[0.2em] uppercase mb-2 text-center">Testimonials</p>
          <h2 className="text-[#1a3351] text-2xl min-[344px]:text-lg min-[345px]:text-2xl min-[353px]:text-lg min-[354px]:text-2xl min-[360px]:text-lg min-[361px]:text-2xl md:text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>See What People Say About Us</h2>
          
          {/* Mobile: Fanned Cards */}
          <div className="md:hidden relative flex justify-center items-start h-[320px] mb-4 mt-8">
            {/* Fanned Review Cards */}
            <div className="relative flex justify-center" style={{ perspective: '1000px' }}>
              {/* Card 1 - Left */}
              <div className="absolute bg-white rounded-xl shadow-lg p-4 w-44 h-60 border-2 border-blue-200 top-0" style={{ transform: 'rotate(-15deg) translateX(-75px)', transformOrigin: 'top center' }}>
                <div className="text-amber-400 text-sm mb-2">★★★★★</div>
                <p className="text-[#1e3a5f] text-xs leading-snug italic line-clamp-5">"{testimonials[2].text}"</p>
                <p className="text-[#1a3351] font-semibold text-xs mt-2">{testimonials[2].name}</p>
              </div>
              
              {/* Card 2 - Center Left */}
              <div className="absolute bg-white rounded-xl shadow-lg p-4 w-44 h-60 border-2 border-blue-200 top-0" style={{ transform: 'rotate(-5deg) translateX(-25px)', transformOrigin: 'top center', zIndex: 1 }}>
                <div className="text-amber-400 text-sm mb-2">★★★★★</div>
                <p className="text-[#1e3a5f] text-xs leading-snug italic line-clamp-5">"{testimonials[3].text}"</p>
                <p className="text-[#1a3351] font-semibold text-xs mt-2">{testimonials[3].name}</p>
              </div>
              
              {/* Card 3 - Center (Featured) */}
              <div className="absolute bg-white rounded-xl shadow-xl p-4 w-48 h-64 border-2 border-blue-400 top-0" style={{ transform: 'rotate(0deg)', transformOrigin: 'top center', zIndex: 2 }}>
                <div className="text-amber-400 text-sm mb-2">★★★★★</div>
                <p className="text-[#1e3a5f] text-xs leading-snug italic line-clamp-6">"{testimonials[1].text}"</p>
                <p className="text-[#1a3351] font-semibold text-xs mt-2">{testimonials[1].name}</p>
              </div>
              
              {/* Card 4 - Right */}
              <div className="absolute bg-white rounded-xl shadow-lg p-4 w-44 h-60 border-2 border-blue-200 top-0" style={{ transform: 'rotate(5deg) translateX(25px)', transformOrigin: 'top center', zIndex: 1 }}>
                <div className="text-amber-400 text-sm mb-2">★★★★★</div>
                <p className="text-[#1e3a5f] text-xs leading-snug italic line-clamp-5">"{testimonials[0].text}"</p>
                <p className="text-[#1a3351] font-semibold text-xs mt-2">{testimonials[0].name}</p>
              </div>
            </div>
          </div>

          {/* Desktop: Horizontal Carousel */}
          <div className="hidden md:block mt-8 mb-4">
            <div className="flex items-center justify-center gap-6">
              {/* Left Arrow */}
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-50 transition border-2 border-blue-300 cursor-pointer flex-shrink-0"
              >
                <svg className="w-6 h-6 text-[#2c5887]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-400 max-w-2xl w-full h-52 flex items-center">
                <div className="flex items-start gap-6">
                  <div className="text-amber-400 text-2xl flex-shrink-0">★★★★★</div>
                  <div>
                    <p className="text-[#1e3a5f] text-lg leading-relaxed italic mb-4">"{testimonials[currentTestimonial].text}"</p>
                    <p className="text-[#1a3351] font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                  </div>
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-50 transition border-2 border-blue-300 cursor-pointer flex-shrink-0"
              >
                <svg className="w-6 h-6 text-[#2c5887]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    index === currentTestimonial ? "bg-[#2c5887] w-6" : "bg-blue-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <a href="/reviews" className="inline-flex items-center gap-2 md:gap-3 text-[#2c5887] font-semibold hover:text-[#1e3a5f] transition text-lg md:text-xl tracking-[0.1em] uppercase cursor-pointer">
              View All Reviews
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-16 px-4 bg-white scroll-mt-20 md:scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#2c5887] text-xl md:text-3xl font-semibold tracking-[0.2em] uppercase mb-4 text-center">Pricing & Plans</p>
          <h2 className="text-[#1a3351] text-[1.05rem] min-[320px]:text-[1.15rem] min-[321px]:text-[1.05rem] min-[344px]:text-[1.15rem] min-[345px]:text-[1.05rem] min-[353px]:text-[1.15rem] min-[354px]:text-[1.05rem] min-[360px]:text-[1.20rem] min-[361px]:text-[1.05rem] min-[375px]:text-[1.3rem] min-[390px]:text-[1.42rem] md:text-3xl font-bold mb-2 md:mb-8 text-center whitespace-nowrap" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
Happy Pricing That Fits Your Budget
          </h2>
          {/* Wellness Plans */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6 mt-6 md:mt-0">
            <div className="bg-[#1e3a5f] px-5 py-4">
              <h3 className="text-white font-bold text-xl md:text-2xl">Wellness Plans</h3>
            </div>
            <div className="p-5 md:p-4">
              <div className="grid md:grid-cols-2 gap-6 md:gap-4">
                {/* Left - Bullet Points */}
                {/* Mobile */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <div className="text-gray-700">
                      <span>Wellness Plans offer up to</span><br />
                      <span className="font-semibold">4 visits per month</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">Extra visits <span className="font-semibold">$10 each</span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">Month-to-month flexibility</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">No long-term contracts</span>
                  </div>
                </div>
                {/* Desktop */}
                <div className="hidden md:flex flex-col">
                  {/* Bullet 1: 4 visits per month */}
                  <div className="flex items-start gap-3 mt-1">
                    <span className="text-blue-500 text-4xl leading-none">•</span>
                    <div>
                      <p className="text-gray-700 text-xl">Wellness Plans offer up to</p>
                      <p className="text-gray-700 text-xl font-semibold">4 visits per month</p>
                    </div>
                  </div>
                  {/* Bullet 2: $10 each */}
                  <div className="flex items-center gap-3 mt-6">
                    <span className="text-blue-500 text-4xl leading-none">•</span>
                    <p className="text-gray-700 text-xl">Extra visits <span className="font-semibold">$10 each</span></p>
                  </div>
                  {/* Bullet 3: Month-to-month */}
                  <div className="flex items-center gap-3 mt-8">
                    <span className="text-blue-500 text-4xl leading-none">•</span>
                    <p className="text-gray-700 text-xl">Month-to-month flexibility</p>
                  </div>
                  {/* Bullet 4: No contracts */}
                  <div className="flex items-center gap-3 mt-8">
                    <span className="text-blue-500 text-4xl leading-none">•</span>
                    <p className="text-gray-700 text-xl">No long-term contracts</p>
                  </div>
                </div>
                {/* Right - Stacked Boxes */}
                <div className="space-y-4 md:space-y-3">
                  {/* Adult */}
                  <div className="bg-white rounded-xl p-5 md:p-4 flex items-center justify-between border-2 border-blue-400 shadow-sm">
                    <div>
                      <p className="text-[#1a3351] font-bold text-base md:text-base mb-1">Adult Wellness</p>
                      <ul className="list-disc list-outside marker:text-blue-500 space-y-0.5 ml-4">
                        <li className="text-[#2c5887] text-xs md:text-sm font-medium">Health insurance<br className="md:hidden" /> not accepted</li>
                        <li className="text-[#2c5887] text-xs md:text-sm font-medium">HSA & FSA approved</li>
                      </ul>
                    </div>
                    <p className="text-[#1e3a5f] text-3xl md:text-2xl font-bold">$70<span className="text-lg md:text-base font-semibold text-gray-500">/mo</span></p>
                  </div>
                  {/* Public Service */}
                  <div className="bg-white rounded-xl p-5 md:p-4 flex items-center justify-between border-2 border-blue-400 shadow-sm">
                    <div>
                      <p className="text-[#1a3351] font-bold text-base md:text-base mb-1">Public Service Wellness</p>
                      <ul className="list-disc list-outside marker:text-blue-500 space-y-0.5 ml-4">
                        <li className="text-[#2c5887] text-xs md:text-sm font-medium">Military</li>
                        <li className="text-[#2c5887] text-xs md:text-sm font-medium whitespace-nowrap">First Responders</li>
                        <li className="text-[#2c5887] text-xs md:text-sm font-medium">Educators</li>
                      </ul>
                    </div>
                    <p className="text-[#1e3a5f] text-3xl md:text-2xl font-bold">$60<span className="text-lg md:text-base font-semibold text-gray-500">/mo</span></p>
                  </div>
                  {/* Youth */}
                  <div className="bg-white rounded-xl p-5 md:p-4 flex items-center justify-between border-2 border-blue-400 shadow-sm">
                    <div>
                      <p className="text-[#1a3351] font-bold text-base md:text-base mb-1">Youth Wellness</p>
                      <ul className="list-disc list-outside marker:text-blue-500 ml-4">
                        <li className="text-[#2c5887] text-xs md:text-sm font-medium whitespace-nowrap">Ages 17 & under</li>
                      </ul>
                    </div>
                    <p className="text-[#1e3a5f] text-3xl md:text-2xl font-bold">$45<span className="text-lg md:text-base font-semibold text-gray-500">/mo</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Studio Visits */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-[#1e3a5f] px-5 py-4">
                <h3 className="text-white font-bold text-xl md:text-2xl">Studio Visits</h3>
              </div>
              <div className="p-5 md:p-4 space-y-4 md:space-y-3">
                <div className="flex items-center justify-between bg-gradient-to-r from-[#e0935a] via-[#e5a578] to-[#e0935a] text-white rounded-xl p-4 md:p-3 shadow-lg">
                  <div>
                    <p className="font-bold text-lg">New Patient Special</p>
                    <p className="text-[#fae9dc] text-sm">Consult, exam & adjustment</p>
                  </div>
                  <div className="text-3xl md:text-2xl font-bold bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]">$29</div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 md:p-3 border border-gray-200">
                  <div>
                    <p className="text-gray-800 font-semibold">Single Visit</p>
                    <p className="text-gray-500 text-sm">Pay as you go</p>
                  </div>
                  <div className="text-gray-800 text-3xl md:text-2xl font-bold">$40</div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 md:p-3 border border-gray-200">
                  <div>
                    <p className="text-gray-800 font-semibold">Pack of 10</p>
                    <p className="text-gray-500 text-sm">No expiration</p>
                  </div>
                  <div className="text-gray-800 text-3xl md:text-2xl font-bold">$300</div>
                </div>
              </div>
            </div>

            {/* Mobile Chiropractic */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-[#1e3a5f] px-5 py-4">
                <h3 className="text-white font-bold text-xl [@media(max-width:320px)]:text-base md:text-2xl leading-tight">
                  Concierge Mobile<br />
                  <span className="text-white">Chiropractic</span>
                </h3>
              </div>
              <div className="p-5 md:p-4">
                {/* Mobile: stacked text + mascot */}
                <p className="lg:hidden text-gray-700 mb-4">Can't make it to the studio?<br /><span className="font-semibold text-[#1e3a5f] whitespace-nowrap">Dr. Bell comes directly to your home.</span></p>
                <div className="lg:hidden flex justify-center mb-4">
                  <img src="/images/mascot-driving-v2.png" alt="Dr. Bell driving to you" className="w-48 h-auto" />
                </div>
                
                {/* Desktop: text left, mascot right */}
                <div className="hidden lg:flex items-center gap-6 mb-4">
                  <div className="flex-1">
                    <p className="text-gray-700 text-xl mb-1">Can't make it to the studio?</p>
                    <p className="font-bold text-[#1e3a5f] text-xl">Dr. Bell comes directly to your home.</p>
                  </div>
                  <img src="/images/mascot-driving-v2.png" alt="Dr. Bell driving to you" className="w-44 h-auto flex-shrink-0" />
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-3 text-center border border-blue-200 mb-4 md:mb-3">
                  <div className="text-[#1a3351] text-4xl md:text-3xl font-bold">$40 <span className="text-2xl md:text-xl font-normal md:font-semibold text-[#2c5887]">+ travel fee</span></div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 md:p-3 border border-gray-200 mb-4 md:mb-3">
                  <div className="flex items-center gap-2 mb-3 md:mb-2">
                    <span className="text-xl">📅</span>
                    <p className="text-gray-800 font-semibold">Available</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <div className="bg-white px-5 md:px-6 py-3 md:py-2 rounded-xl font-bold text-sm shadow-md border-2 border-blue-400">
                      <p className="text-blue-400 text-sm uppercase tracking-wider mb-0.5">Every</p>
                      <p className="text-[#2c5887]">Tuesday</p>
                    </div>
                    <div className="bg-white px-5 md:px-6 py-3 md:py-2 rounded-xl font-bold text-sm shadow-md border-2 border-blue-400">
                      <p className="text-blue-400 text-sm uppercase tracking-wider mb-0.5">Every</p>
                      <p className="text-[#2c5887]">Thursday</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm text-center">Ideal for seniors, busy professionals, or anyone who prefers care at home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200 mx-4"></div>

      {/* Hours & Location Section */}
      <section id="hours" className="py-12 md:py-16 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Studio Hours */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-8 shadow-sm">
              <h3 className="text-[#1e3a5f] font-bold text-lg md:text-2xl mb-4 md:mb-6">Studio Hours</h3>
              <div className="space-y-2 md:space-y-3 text-sm md:text-lg">
                <div className="flex justify-between"><span className="text-gray-600">Monday</span><span className="text-[#2c5887] font-medium">10am – 7pm</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Tuesday</span><span className="text-[#2c5887] font-medium">Mobile</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Wednesday</span><span className="text-[#2c5887] font-medium">10am – 7pm</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Thursday</span><span className="text-[#2c5887] font-medium">Mobile</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Friday</span><span className="text-[#2c5887] font-medium">10am – 7pm</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Saturday</span><span className="text-[#2c5887] font-medium">10am – 2pm</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Sunday</span><span className="text-red-500 font-medium">Closed</span></div>
              </div>
            </div>
            {/* Location */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-8 shadow-sm">
              <h3 className="text-[#1e3a5f] font-bold text-lg md:text-2xl mb-4 md:mb-6">Find Us</h3>
              <a href="https://maps.google.com/?q=207+Chartwell+Ct+Myrtle+Beach+SC+29588" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6 hover:opacity-80 transition">
                <span className="text-2xl md:text-4xl">📍</span>
                <div>
                  <p className="text-gray-800 font-medium md:text-xl">The Happy Spine Studio</p>
                  <p className="text-gray-600 text-sm md:text-lg">207 Chartwell Ct.<br />Myrtle Beach, SC 29588</p>
                </div>
              </a>
              <a
                href="https://maps.google.com/?q=207+Chartwell+Ct+Myrtle+Beach+SC+29588"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2c5887] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base hover:bg-[#1e3a5f] transition cursor-pointer"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-16 px-4 bg-gradient-to-br from-cyan-500 to-[#2c5887] scroll-mt-20">
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
                  <svg className="w-5 h-5 text-[#2c5887] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
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
              © 2026 The Happy Spine Studio.<br className="min-[375px]:hidden" /> All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6 text-gray-500">
              <span className="text-sm font-medium">Powered by</span>
              <img src="/images/novic-logo.png" alt="Novic" className="h-12 w-auto opacity-70" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
