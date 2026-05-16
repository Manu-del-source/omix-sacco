'use client'

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Activity, TrendingUp, Landmark, ArrowUpRight, ListTodo, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const savingsData = [
  { name: 'Jan', value: 18.2 },
  { name: 'Feb', value: 19.5 },
  { name: 'Mar', value: 21.0 },
  { name: 'Apr', value: 22.8 },
  { name: 'May', value: 23.4 },
  { name: 'Jun', value: 24.7 },
];

const initialLoans = [
  { id: 1, name: 'M-0492 • Samuel K.', status: 'Approved', p: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30', val: 'KES 150K', type: 'Emergency' },
  { id: 2, name: 'M-1024 • Faith M.', status: 'Guarantor Review', p: 'bg-omix-accent/20 text-omix-accent border border-omix-accent/30', val: 'KES 420K', type: 'Development' },
  { id: 3, name: 'M-0833 • Daniel O.', status: 'Pending KYC', p: 'bg-purple-500/20 text-purple-400 border border-purple-500/30', val: 'KES 85K', type: 'School Fees' },
  { id: 4, name: 'M-0112 • Grace W.', status: 'Disbursed', p: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30', val: 'KES 210K', type: 'Business' },
];

const initialUpdates = [
  { id: 1, type: 'payment', msg: 'Mpesa Paybill: KES 15,000 via John Doe', time: 'Just now' },
  { id: 2, type: 'loan', msg: 'Loan Approved: KES 250,000 for Sarah W.', time: '2m ago' },
  { id: 3, type: 'guarantor', msg: 'Guarantor Approved: David K. for LN-849', time: '15m ago' },
];

export function AdminDashboardContent({ userEmail }: { userEmail: string }) {
  const [loans] = useState(initialLoans);
  const [updates, setUpdates] = useState(initialUpdates);

  useEffect(() => {
    const interval = setInterval(() => {
      const updateType = ['payment', 'loan', 'guarantor'][Math.floor(Math.random() * 3)];
      const isPayment = updateType === 'payment';
      const newUpdate = {
        id: Date.now(),
        type: updateType,
        msg: isPayment 
          ? `Mpesa Paybill: KES ${Math.floor(Math.random() * 50) + 1},000 via ${['James', 'Mary', 'John', 'Peter', 'Sarah'][Math.floor(Math.random() * 5)]}`
          : `Guarantor Approved: LN-${Math.floor(Math.random() * 900) + 100}`,
        time: 'Just now',
      };
      setUpdates(prev => [newUpdate, ...prev].slice(0, 5));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Omix Admin Central</h1>
          <p className="text-slate-400 mt-1">Logged in as <span className="text-omix-accent font-medium">{userEmail}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> System Online
          </div>
          <button className="bg-omix-accent hover:bg-omix-accent-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-omix-accent/20">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Savings', value: 'KES 24.7M', icon: Landmark, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Active Loans', value: 'KES 8.4M', icon: DollarSign, color: 'text-omix-accent', bg: 'bg-omix-accent/10' },
          { label: 'Total Members', value: '1,247', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Pending Approvals', value: '14', icon: ListTodo, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
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
              <button className="text-slate-500 hover:text-white transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Savings Growth (H1 2026)</h3>
              <p className="text-slate-400 text-sm">Real-time contribution trends across all branches</p>
            </div>
            <select className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-omix-accent">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D1B2A', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#f97316' }}
                />
                <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col justify-between bg-black/40">
           <div>
              <h3 className="text-xl font-bold text-white mb-2">Branch Performance</h3>
              <p className="text-slate-400 text-sm mb-8">Repayment health vs disbursement goals</p>
              
              <div className="space-y-6">
                 {[
                   { label: 'Nairobi Central', value: 92, color: 'bg-emerald-500' },
                   { label: 'Mombasa Road', value: 45, color: 'bg-omix-accent' },
                   { label: 'Nakuru Town', value: 78, color: 'bg-cyan-500' },
                 ].map((item, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span className="text-slate-300">{item.label}</span>
                       <span className="text-white font-bold">{item.value}%</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${item.value}%` }}
                         transition={{ duration: 1, delay: 0.5 }}
                         className={`h-full ${item.color}`} 
                       />
                     </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="mt-8 p-4 bg-omix-accent/10 border border-omix-accent/20 rounded-2xl flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-omix-accent flex items-center justify-center text-white shadow-lg">
               <TrendingUp className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-omix-accent font-bold uppercase tracking-wider">Top Recruiter</p>
               <p className="text-white font-bold">James M. (32 members)</p>
             </div>
           </div>
        </div>
      </div>

      {/* Bottom Section: Table & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/5 bg-black/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Loan Applications</h3>
            <button className="text-sm text-omix-accent hover:text-omix-accent-dark transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-sm border-b border-white/5">
                  <th className="pb-4 font-medium">Member</th>
                  <th className="pb-4 font-medium">Type</th>
                  <th className="pb-4 font-medium">Amount</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loans.map((loan) => (
                  <tr key={loan.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white font-medium">{loan.name}</td>
                    <td className="py-4 text-slate-400">{loan.type}</td>
                    <td className="py-4 text-white font-mono">{loan.val}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${loan.p}`}>
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/5 bg-black/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-omix-accent/5 rounded-full blur-[40px]" />
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Live Activity Stream
          </h3>
          <div className="space-y-6 relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
            {updates.map((update) => (
              <motion.div 
                layout
                key={update.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 relative"
              >
                <div className={`w-[23px] h-[23px] rounded-full border-2 border-[#05070A] shrink-0 z-10 flex items-center justify-center ${
                  update.type === 'payment' ? 'bg-emerald-500' :
                  update.type === 'loan' ? 'bg-omix-accent' : 'bg-cyan-400'
                }`}>
                  {update.type === 'payment' ? <Zap className="w-3 h-3 text-white" /> : <Activity className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className="text-sm text-slate-200 leading-relaxed">{update.msg}</p>
                  <p className="text-xs text-slate-500 mt-1">{update.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
