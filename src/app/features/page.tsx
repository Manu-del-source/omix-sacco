'use client'

import { motion } from 'framer-motion';
import { Zap, PieChart, Users, MessageSquare, CreditCard, Filter, ShieldCheck, ArrowRight, Landmark } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Users,
    title: 'Member Management',
    description: 'Digital member registration, KYC verification, and comprehensive member profiles with full transaction history.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10'
  },
  {
    icon: Landmark,
    title: 'Savings Tracking',
    description: 'Track monthly contributions, deposits, withdrawals, and generate detailed statements instantly.',
    color: 'text-omix-accent',
    bg: 'bg-omix-accent/10'
  },
  {
    icon: PieChart,
    title: 'AI Analytics',
    description: 'Predictive forecasting and deep insights into SACCO liquidity, loan default risks, and growth trends.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    icon: ShieldCheck,
    title: 'Guarantor System',
    description: 'Shared approval workflows, real-time loan exposure tracking, and automated guarantor records.',
    color: 'text-green-400',
    bg: 'bg-green-400/10'
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Integration',
    description: 'Automated alerts and member support via WhatsApp Business API. Keep your members informed 24/7.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10'
  },
  {
    icon: CreditCard,
    title: 'Mpesa Tracking',
    description: 'Native Mpesa integration links Paybill transactions directly to member profiles, automating reconciliation.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    icon: Filter,
    title: 'Loan Workflows',
    description: 'Customizable multi-stage loan application and approval pipelines tailored to your SACCO bylaws.',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10'
  },
  {
    icon: Zap,
    title: 'Enterprise Security',
    description: 'Role-based access control, secure authentication, and end-to-end encryption for all financial data.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10'
  }
];

export default function FeaturesPage() {
  return (
    <div className="flex-1 bg-transparent pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-white"
          >
            Powerful Features for <br className="hidden md:block"/> Progressive SACCOs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
             Everything you need to manage members, streamline operations, and drive cooperative growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl group hover:border-white/10 transition-all cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${feature.bg}`}>
                 <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 glass-card p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-omix-cyan/30 glow-cyan relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-omix-cyan/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Want to see it in action?</h2>
            <p className="text-slate-400">Explore our interactive staging environment and see how Omix transforms your SACCO.</p>
          </div>
          <div className="relative z-10 shrink-0">
             <Link href="/login" className="bg-omix-cyan hover:bg-omix-cyan/80 text-slate-900 px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(0,188,212,0.3)] flex items-center gap-2">
                Launch Live Preview <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
