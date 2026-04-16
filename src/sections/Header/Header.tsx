import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(80); // Increased threshold to 80px to prevent jitter and accommodate layout shifts
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Courses', href: '/courses' },
    { label: 'Blogs', href: '/blog' },
    { label: 'Find Center', href: '/find-center' },
    { label: 'Contact Us', href: '/contact' },
  ];

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "py-2" : "py-4 md:py-6"
    )}>
      <div
        className={cn(
          "mx-auto transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8",
          scrolled && !open
            ? "max-w-6xl"
            : "max-w-screen-2xl"
        )}
      >
        <div className={cn(
          "flex justify-between items-center transition-all duration-300 px-4 sm:px-6 rounded-2xl border",
          scrolled && !open
            ? "bg-white/90 backdrop-blur-xl border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-16 md:h-18"
            : "bg-slate-50 border-transparent h-20 md:h-24"
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.svg"
              alt="SimpleSphere Logo"
              className={cn("transition-all duration-300 object-contain", scrolled ? "w-36 md:w-44 h-16 md:h-20" : "w-48 md:w-56 h-20 md:h-24")}
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 md:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (location.pathname === '/' && link.href === '/');
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 rounded-lg group",
                    isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                  )}
                >
                  <span className={cn(
                    "relative z-10 transition-colors duration-300",
                    isActive && "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600"
                  )}>
                    {link.label}
                  </span>

                  {/* Sliding Underline Effect */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-4"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Highlight Gradient */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Toggle - Mobile/Desktop */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0 relative z-[70]">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button asChild className="relative overflow-hidden group bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-7 h-11 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all duration-300 active:scale-95">
                <a href="https://students.simplesphere.in" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10">Portal</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-bold rounded-xl px-7 h-11 transition-all duration-300">
                <a href="https://dashboard.simplesphere.in" target="_blank" rel="noopener noreferrer">LMS</a>
              </Button>
            </div>

            {/* Hamburger Toggle */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(!open)}
              className={cn(
                "rounded-xl transition-all duration-300 lg:hidden",
                open ? "bg-slate-100 text-blue-600 shadow-sm" : "text-slate-600 hover:text-blue-600 hover:bg-white/50"
              )}
            >
              <MenuToggleIcon open={open} className="size-6" duration={300} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-2xl lg:hidden flex flex-col"
          >
            {/* Background Decorations for Mobile Menu - Dynamic effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 20, 0],
                  y: [0, -30, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-5%] left-[-5%] w-[70%] h-[40%] rounded-full bg-blue-100/40 blur-[100px]"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  x: [0, -40, 0],
                  y: [0, 20, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[5%] right-[-5%] w-[60%] h-[40%] rounded-full bg-indigo-100/40 blur-[100px]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,10,50,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="flex flex-col h-full pt-28 pb-10 px-6 relative z-10 shrink-0">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.href || (location.pathname === '/' && link.href === '/');
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.08, duration: 0.5, ease: "easeOut" }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-xl font-bold p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden",
                          isActive
                            ? "text-white"
                            : "text-slate-600 hover:text-blue-600 hover:bg-slate-50 active:scale-[0.98]"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobile-nav-active"
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 -z-10"
                          />
                        )}
                        <span className="relative z-10">{link.label}</span>
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:rotate-45"
                        )}>
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto space-y-5"
              >
                <div className="grid grid-cols-1 gap-4">
                  <Button asChild className="w-full justify-center h-16 text-lg bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold rounded-2xl shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-95">
                    <a href="https://students.simplesphere.in" target="_blank" rel="noopener noreferrer">Student Portal</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-center h-16 text-lg border-2 border-slate-200 text-slate-700 font-bold rounded-2xl bg-white/50 backdrop-blur-sm transition-all active:scale-95">
                    <a href="https://dashboard.simplesphere.in" target="_blank" rel="noopener noreferrer">LMS Dashboard</a>
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-2 pt-4">
                  <p className="text-slate-400 text-sm font-semibold tracking-wide">© 2026 SIMPLESPHERE TECHNOLOGIES</p>
                  <div className="w-12 h-1 bg-blue-100 rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
