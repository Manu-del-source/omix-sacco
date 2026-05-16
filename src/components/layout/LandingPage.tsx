'use client'

import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Users, CheckCircle2, ShieldCheck, Landmark, Phone } from 'lucide-react';
import Link from 'next/link';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 dashboard-pattern opacity-10" />
        {/* Glow Effects */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-omix-accent/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit mb-8"
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Premium Fintech Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6"
            >
              Modern SACCO Management <br className="hidden md:block"/>Built for <span className="text-gradient-accent">Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
            >
              Manage members, savings, loans, and Mpesa payments from one intelligent digital platform built for modern SACCOs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-omix-accent hover:bg-omix-accent-dark text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-medium transition-all">
                <Play className="w-5 h-5" /> Live Dashboard
              </Link>
            </motion.div>
          </div>

          {/* Abstract Dashboard Graphic */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-omix-accent to-emerald-500 rounded-3xl blur opacity-20" />
            <div className="relative rounded-2xl glass-card overflow-hidden shadow-2xl shadow-emerald-900/10 border border-white/10">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-black/40">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto bg-black/40 rounded-md px-6 py-1.5 text-xs text-slate-400 font-mono flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-emerald-400"/> secure.omixsacco.com
                </div>
              </div>
              <div className="p-0 bg-[#05070A] h-[500px] overflow-hidden relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                 <div className="flex h-full">
                    {/* Sidebar */}
                    <div className="w-56 bg-black/40 border-r border-white/5 p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-3 px-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-omix-accent to-amber-500 flex items-center justify-center">
                          <Landmark className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display font-bold text-white tracking-tight">Omix</span>
                      </div>
                      {['Dashboard', 'Members', 'Savings', 'Loans', 'Guarantors', 'Mpesa', 'Reports'].map((item, i) => (
                        <div key={item} className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 ${i===0 ? 'bg-omix-accent/10 text-omix-accent' : 'text-slate-400'}`}>
                          <div className={`w-4 h-4 rounded shadow-sm ${i===0 ? 'bg-omix-accent/20' : 'bg-white/5'}`}></div>
                          {item}
                        </div>
                      ))}
                    </div>
                    {/* Main */}
                    <div className="flex-1 p-8 space-y-6 bg-gradient-to-br from-transparent to-emerald-900/5 relative pointer-events-none">
                       <div className="flex justify-between items-center mb-4">
                         <h2 className="text-xl font-bold text-white">SACCO Overview</h2>
                         <div className="h-8 w-24 bg-white/5 rounded-lg border border-white/5"></div>
                       </div>
                       <div className="grid grid-cols-3 gap-4">
                         <div className="h-28 glass-card rounded-xl border border-emerald-500/10 p-4">
                           <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Total Savings</p>
                           <p className="text-2xl font-display font-bold text-white">KES 24.7M</p>
                           <div className="mt-3 flex items-center gap-1 text-emerald-400 text-xs font-medium">
                             <TrendingUp className="w-3 h-3"/> +12.4% this month
                           </div>
                         </div>
                         <div className="h-28 glass-card rounded-xl p-4 border border-white/5">
                           <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Active Loans</p>
                           <p className="text-2xl font-display font-bold text-white">KES 8.4M</p>
                           <div className="mt-3 flex items-center gap-1 text-omix-accent text-xs font-medium">
                             <TrendingUp className="w-3 h-3"/> 342 active borrowers
                           </div>
                         </div>
                         <div className="h-28 glass-card rounded-xl p-4 border border-white/5">
                           <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Active Members</p>
                           <p className="text-2xl font-display font-bold text-white">1,247</p>
                           <div className="mt-3 flex items-center gap-1 text-cyan-400 text-xs font-medium">
                             <Users className="w-3 h-3"/> +45 joined
                           </div>
                         </div>
                       </div>
                       <div className="h-56 glass-card rounded-xl overflow-hidden relative border border-white/5 p-4">
                         <div className="flex justify-between items-center mb-4">
                           <p className="text-sm font-medium text-slate-300">Savings vs Loans</p>
                         </div>
                         <div className="flex items-end gap-2 h-32 opacity-80 pt-4">
                           {[40,65,45,80,55,90,70,100].map((h, i) => (
                             <div key={i} className="w-full flex flex-col justify-end gap-1 group">
                               <div className="w-full bg-emerald-500/40 border border-emerald-500/50 rounded-t-sm" style={{height: `${h}%`}}></div>
                               <div className="w-full bg-omix-accent/40 border border-omix-accent/50 rounded-t-sm" style={{height: `${h*0.4}%`}}></div>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 md:-right-8 lg:-right-12 top-16 glass-card px-5 py-4 rounded-xl flex items-center gap-4 border border-white/10 shadow-xl backdrop-blur-xl z-20 before:absolute before:inset-0 before:rounded-xl before:border before:border-emerald-500/20 before:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="text-emerald-400 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Repayment Rate</p>
                <p className="font-display font-bold text-white text-xl leading-none">98.2%</p>
              </div>
            </motion.div>

             <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-4 md:-left-8 lg:-left-12 bottom-24 glass-card px-5 py-4 rounded-xl flex items-center gap-4 border border-white/10 shadow-xl backdrop-blur-xl z-20 before:absolute before:inset-0 before:rounded-xl before:border before:border-omix-accent/20 before:shadow-[0_0_20px_rgba(249,115,22,0.15)]"
            >
              <div className="w-10 h-10 bg-omix-accent/20 rounded-lg flex items-center justify-center">
                <Users className="text-omix-accent w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Active Members</p>
                <p className="font-display font-bold text-white text-xl leading-none">1,247</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-widest">Trusted by leading progressive SACCOs in Kenya</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {['Stima SACCO', 'Mwalimu National', 'Harambee SACCO', 'Waumini', 'Hazina'].map((logo, i) => (
              <span key={i} className="font-display font-bold text-2xl text-slate-400 tracking-tighter">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Summary */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Everything you need to scale</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Omix provides an all-in-one suite to manage relationships, streamline operations, and drive SACCO revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-10 rounded-3xl border border-omix-accent/20 relative overflow-hidden group">
               <div className="absolute right-0 bottom-0 w-64 h-64 bg-omix-accent/10 blur-[80px]" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                   <Phone className="text-omix-accent" /> Member Portal
                 </h3>
                 <p className="text-slate-400 mb-8 max-w-sm">Empower your members with a self-service app to monitor their finances.</p>
                 <ul className="space-y-4">
                   {['View savings balance', 'Apply for loans', 'Download statements', 'View repayments', 'Track dividends', 'Update profiles'].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-slate-300">
                       <CheckCircle2 className="w-5 h-5 text-omix-accent shrink-0" />
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
            
            <div className="glass-card p-10 rounded-3xl border border-cyan-500/20 relative overflow-hidden group">
               <div className="absolute left-0 bottom-0 w-64 h-64 bg-cyan-500/10 blur-[80px]" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                   <ShieldCheck className="text-cyan-400" /> Guarantor System
                 </h3>
                 <p className="text-slate-400 mb-8 max-w-sm">A robust, secure, and fully digital workflow for loan guarantors.</p>
                 <ul className="space-y-4">
                   {['Guarantor requests via app', 'Approval/rejection workflows', 'Real-time loan exposure tracking', 'Linked guarantor records'].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-slate-300">
                       <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-black/40 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-omix-accent/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">How Omix SACCO Works</h2>
             <p className="text-slate-400 text-lg">A simple, streamlined process to digitize your operations.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
             {[
               {step: '1', title: 'Register Members', desc: 'Onboard members digitally with automated KYC.'},
               {step: '2', title: 'Track Savings', desc: 'Log monthly contributions accurately.'},
               {step: '3', title: 'Process Loans', desc: 'Approve loans and coordinate guarantors.'},
               {step: '4', title: 'Receive Mpesa', desc: 'Reconcile STK push payments automatically.'},
               {step: '5', title: 'Generate Reports', desc: 'Export CBK compliant financial statements.'}
             ].map((item, idx) => (
               <div key={idx} className="relative flex flex-col items-center text-center group">
                 {idx !== 4 && <div className="hidden md:block absolute top-8 left-[60%] w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent" />}
                 <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-display font-bold text-2xl text-slate-300 mb-6 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all shadow-lg relative z-10">
                   {item.step}
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                 <p className="text-sm text-slate-400 leading-relaxed px-2">{item.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative bg-black/20 border-y border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-omix-accent/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 text-lg">Choose the right plan for your SACCO&apos;s size and needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Omix Premium',
                price: 'KES 5,000',
                period: '/month',
                desc: 'Perfect for new and growing cooperatives.',
                features: ['Up to 500 Members', 'Basic Savings & Loans', 'Standard Reporting', 'kiptooe142@gemail.com', '07026090372'],
                button: 'Start Free Trial',
                highlight: false
              },              {
                name: 'Growth SACCO',
                price: 'KES 15,000',
                period: '/month',
                desc: 'For established SACCOs scaling operations.',
                features: ['Up to 5,000 Members', 'Mpesa Paybill Integration', 'Guarantor Workflows', 'Advanced Analytics', 'Priority SMS & Email Support'],
                button: 'Get Started',
                highlight: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                desc: 'Tailored for large, multi-branch institutions.',
                features: ['Unlimited Members', 'Custom ERP Integrations', 'Dedicated Account Manager', 'On-premise Deployment Options', '24/7 Phone Support'],
                button: 'Contact Sales',
                highlight: false
              }
            ].map((plan, idx) => (
              <div key={idx} className={`glass-card p-8 rounded-2xl border ${plan.highlight ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative scale-105 z-10' : 'border-white/5'}`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-display font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-6 h-10">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <Link 
                  href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                  className={`w-full py-3 rounded-xl font-medium transition-colors mb-8 flex items-center justify-center ${
                    plan.highlight ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {plan.button}
                </Link>
                <div className="space-y-4">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Trusted by Leading SACCOs</h2>
            <p className="text-slate-400 text-lg">See how Omix is transforming financial cooperatives.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "Switching to Omix SACCO was the best decision we made. Our loan processing time dropped from 3 weeks to 48 hours, and Mpesa reconciliation is finally automated.",
                author: "Sarah Wanjiku",
                role: "CEO, Stima Professionals SACCO",
                img: "https://i.pravatar.cc/150?u=a042581f4e29026704a"
              },
              {
                quote: "The guarantor approval workflow is a game-changer. Members can now request and approve guarantorship on their mobile phones securely without paperwork.",
                author: "David Kiprono",
                role: "Operations Manager, Rift Valley Tech SACCO",
                img: "https://i.pravatar.cc/150?u=a042581f4e29026704b"
              },
              {
                quote: "Their financial analytics dashboard gives our board real-time visibility into liquidity and loan default risks. It feels like we are running a modern bank.",
                author: "James Ochieng",
                role: "Chairman, Pamoja Traders SACCO",
                img: "https://i.pravatar.cc/150?u=a042581f4e29026704c"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                 <div className="text-omix-accent text-4xl font-display leading-none absolute top-6 right-8 opacity-20">&quot;</div>
                 <p className="text-slate-300 leading-relaxed mb-8 relative z-10">{testimonial.quote}</p>
                 <div className="flex items-center gap-4 relative z-10">
                   <img src={testimonial.img} alt={testimonial.author} className="w-12 h-12 rounded-full border border-white/10" />
                   <div>
                     <p className="text-white font-bold">{testimonial.author}</p>
                     <p className="text-xs text-slate-400">{testimonial.role}</p>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-omix-accent/10 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to transform your SACCO operations?</h2>
          <p className="text-xl text-slate-400 mb-10">Join progressive SACCOs accelerating their growth with Omix.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="bg-omix-accent hover:bg-omix-accent-dark text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] px-8 py-4 rounded-xl font-medium transition-all">
              Start Free Trial
            </Link>
            <Link href="/login" className="bg-white/10 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
               View Live Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 group mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-omix-accent to-amber-500 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold text-white tracking-tight">Omix <span className="text-omix-accent">SACCO</span></span>
              </Link>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed mb-6">
                The intelligent digital backbone for modern financial cooperatives. Empowering members and scaling operations globally.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <Users className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><Link href="/features" className="text-slate-400 hover:text-omix-accent transition-colors text-sm">Features</Link></li>
                <li><Link href="/pricing" className="text-slate-400 hover:text-omix-accent transition-colors text-sm">Pricing</Link></li>
                <li><Link href="/login" className="text-slate-400 hover:text-omix-accent transition-colors text-sm">Live Demo</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-slate-400 hover:text-omix-accent transition-colors text-sm">About Us</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-omix-accent transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-slate-400 hover:text-omix-accent transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-omix-accent transition-colors text-sm">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">© 2026 Omix SACCO Solutions. All rights reserved.</p>
            <p className="text-slate-500 text-xs flex items-center gap-2">Built with <span className="text-red-500">❤️</span> for Cooperatives</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
