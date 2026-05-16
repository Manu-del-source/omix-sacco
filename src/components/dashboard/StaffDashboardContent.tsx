'use client'

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Activity, ListTodo } from 'lucide-react';
import { useState } from 'react';

const savingsData = [
  { name: 'Jan', value: 18.2 },
  { name: 'Feb', value: 19.5 },
  { name: 'Mar', value: 21.0 },
  { name: 'Apr', value: 22.8 },
  { name: 'May', value: 23.4 },
  { name: 'Jun', value: 24.7 },
];

const pendingTasks = [
  { id: 1, task: 'Verify KYC for Member M-0922', priority: 'High', status: 'Pending' },
  { id: 2, task: 'Review Loan Application LN-842', priority: 'Medium', status: 'In Review' },
  { id: 3, task: 'Follow up on Defaulted Payment M-102', priority: 'High', status: 'Urgent' },
  { id: 4, task: 'Approve Withdrawal Request WR-012', priority: 'Low', status: 'Pending' },
];

export function StaffDashboardContent({ userEmail }: { userEmail: string }) {
  const [tasks] = useState(pendingTasks);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Staff Workspace</h1>
          <p className="text-slate-400 mt-1">Logged in as <span className="text-omix-accent font-medium">{userEmail}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-omix-accent hover:bg-omix-accent-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-omix-accent/20">
            Process Applications
          </button>
        </div>
      </div>

      {/* Staff KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'My Members', value: '342', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Loans Processed', value: 'KES 4.2M', icon: DollarSign, color: 'text-omix-accent', bg: 'bg-omix-accent/10' },
          { label: 'Collection Rate', value: '96.4%', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Pending Tasks', value: '8', icon: ListTodo, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
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
           <h3 className="text-xl font-bold text-white mb-6">Assigned Member Growth</h3>
           <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D1B2A', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="glass-card p-8 rounded-3xl border border-white/5 bg-black/40 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-6">Action Items</h3>
          <div className="space-y-6">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-omix-accent/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-bold text-white group-hover:text-omix-accent transition-colors">{task.task}</p>
                </div>
                <div className="flex justify-between items-center">
                   <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                     task.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                   }`}>
                     {task.priority}
                   </span>
                   <span className="text-xs text-slate-500">{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
