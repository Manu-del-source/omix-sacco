'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Landmark, Menu, X, LogIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-omix-navy/80 backdrop-blur-lg border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-omix-accent to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-omix-accent/20 transition-all">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-tight">Omix <span className="text-omix-accent">SACCO</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-4 w-[1px] bg-white/10" />
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </Link>
            <Link 
              href="/signup" 
              className="bg-omix-accent hover:bg-omix-accent-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-omix-accent/20"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-omix-navy border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="block text-lg font-medium text-slate-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <Link 
                  href="/login" 
                  className="w-full text-center py-3 rounded-xl border border-white/10 text-white font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="w-full text-center py-3 rounded-xl bg-omix-accent text-white font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
