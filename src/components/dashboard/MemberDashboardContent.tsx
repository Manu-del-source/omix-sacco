'use client'

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Landmark, FileText, ShieldCheck, ArrowRightLeft, CreditCard, Plus, History } from 'lucide-react';

const mySavingsData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 58000 },
  { name: 'Apr', value: 65000 },
  { name: 'May', value: 72000 },
  { name: 'Jun', value: 80000 },
];

const transactions = [
  { id: 1, type: 'Deposit', amount: 'KES 8,000', date: 'Jun 12, 2026', status: 'Completed', color: 'text-emerald-400' },
  { id: 2, type: 'Loan Repayment', amount: 'KES 12,500', date: 'Jun 05, 2026', status: 'Completed', color: 'text-omix-accent' },
  { id: 3, type: 'Deposit', amount: 'KES 7,000', date: 'May 12, 2026', status: 'Completed', color: 'text-emerald-400' },
  { id: 4, type: 'Withdrawal', amount: 'KES 2,000', date: 'May 02, 2026', status: 'Completed', color: 'text-red-400' },
];

export function MemberDashboardContent({ userEmail }: { userEmail: string }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Member Portal</h1>
          <p className="text-slate-400 mt-1">Welcome back, <span className="text-omix-accent font-medium">{userEmail}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/10 transition-all flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Deposit Funds
          </button>
          <button className="bg-omix-accent hover:bg-omix-accent-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-omix-accent/20 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Apply for Loan
          </button>
        </div>
      </div>

      {/* Member Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Savings', value: 'KES 80,000', icon: Landmark, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Active Loan', value: 'KES 142,000', icon: FileText, color: 'text-omix-accent', bg: 'bg-omix-accent/10' },
          { label: 'Repayment Status', value: '98% Score', icon: ShieldCheck, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Next Payment', value: 'July 5th', icon: ArrowRightLeft, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl border border-white/5 bg-black/40">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Savings History</h3>
              <p className="text-slate-400 text-sm">Your contribution trend over the last 6 months</p>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 text-xs font-bold uppercase tracking-wider">
              +11% this month
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mySavingsData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D1B2A', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-8 rounded-3xl border border-white/5 bg-black/40 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-omix-accent" /> Recent Activity
            </h3>
          </div>
          <div className="space-y-6 flex-1">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-omix-accent transition-colors">{tx.type}</p>
                  <p className="text-xs text-slate-500">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.color}`}>{tx.amount}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            View All Transactions
          </button>
        </div>
      </div>

      {/* Loan Progress Card */}
      <div className="glass-card p-8 rounded-3xl border border-white/5 bg-gradient-to-r from-omix-accent/5 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-omix-accent/10 blur-[100px] -z-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold text-white mb-2">Current Loan Progress</h3>
            <p className="text-slate-400 text-sm mb-6">You have repaid KES 42,000 out of KES 142,000 for your Development Loan.</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Repayment Progress</span>
                <span className="text-omix-accent font-bold">29.5%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-omix-accent" style={{ width: '29.5%' }} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Interest Rate</p>
                <p className="text-xl font-display font-bold text-white">12.5% p.a</p>
             </div>
             <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Due Date</p>
                <p className="text-xl font-display font-bold text-white">July 5, 2026</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
