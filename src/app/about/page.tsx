'use client'

import { motion } from 'framer-motion';
import { Target, Heart, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex-1 bg-transparent pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-omix-cyan/10 border border-omix-cyan/20 rounded-full w-fit mb-8"
          >
            <span className="text-[10px] uppercase tracking-widest text-omix-cyan font-bold">Our Story</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-white"
          >
            Empowering Modern SACCOs to Scale Globally
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
             Omix was founded with a single mission: to provide world-class, intelligent management tools tailored for the unique needs of progressive financial cooperatives.
          </motion.p>
        </div>

        {/* Mission & Vision grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="glass-card p-10 rounded-2xl relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-64 h-64 bg-omix-accent/10 rounded-full blur-[80px]" />
             <div className="relative z-10 text-center">
               <div className="w-16 h-16 mx-auto bg-omix-accent/20 rounded-2xl flex items-center justify-center mb-6">
                 <Target className="w-8 h-8 text-omix-accent" />
               </div>
               <h3 className="text-2xl font-display font-bold text-white mb-4">Our Mission</h3>
               <p className="text-slate-400 leading-relaxed">
                 To democratize access to enterprise-grade analytics and automation, enabling SACCOs of all sizes to build stronger member relationships and drive sustainable financial growth.
               </p>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="glass-card p-10 rounded-2xl relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-64 h-64 bg-omix-cyan/10 rounded-full blur-[80px]" />
             <div className="relative z-10 text-center">
               <div className="w-16 h-16 mx-auto bg-omix-cyan/20 rounded-2xl flex items-center justify-center mb-6">
                 <Heart className="w-8 h-8 text-omix-cyan" />
               </div>
               <h3 className="text-2xl font-display font-bold text-white mb-4">Our Vision</h3>
               <p className="text-slate-400 leading-relaxed">
                 To become the central nervous system for financial cooperatives worldwide, seamlessly connecting every member interaction, transaction, and data point.
               </p>
             </div>
           </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Member Obsession', desc: 'We build for our users first, always listening and adapting to their core needs.', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
              { title: 'Data Integrity', desc: 'Your data is sacred. We employ military-grade encryption and strict access controls.', icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-400/10' },
              { title: 'Financial Tracking', desc: 'Automatically reconcile payments natively integrated inside your management platform.', icon: Target, color: 'text-omix-accent', bg: 'bg-omix-accent/10' }
            ].map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:border-white/10 transition-colors"
               >
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${val.bg}`}>
                   <val.icon className={`w-6 h-6 ${val.color}`} />
                 </div>
                 <h4 className="text-white font-display font-bold text-xl mb-3">{val.title}</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">{val.desc}</p>
               </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-2xl text-center relative overflow-hidden border border-omix-accent/20"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-omix-accent/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Join the Omix Journey</h2>
            <p className="text-slate-400 text-lg mb-8">We are always looking for passionate individuals and forward-thinking SACCOs to collaborate with.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="bg-omix-accent hover:bg-omix-accent-dark text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                Start Free Trial
              </Link>
              <Link href="/contact" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-medium transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
