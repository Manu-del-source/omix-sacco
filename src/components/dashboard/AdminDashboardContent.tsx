'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Activity, TrendingUp, Landmark, ListTodo, Zap, Loader2, Check, X, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loan, Profile } from '@/types';

type LoanWithMember = Loan & { profiles: Profile };

interface ChartDataPoint {
  name: string;
  value: number;
}

interface ActivityUpdate {
  id: number;
  type: 'loan' | 'payment';
  msg: string;
  time: string;
}

export function AdminDashboardContent({ userEmail }: { userEmail: string }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalSavings: 0,
    activeLoans: 0,
    totalMembers: 0,
    pendingApprovals: 0
  });
  const [loans, setLoans] = useState<LoanWithMember[]>([]);
  const [updates, setUpdates] = useState<ActivityUpdate[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const supabase = createClient();

  const fetchData = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      // 1. Fetch Stats
      const [savingsRes, membersRes, pendingRes, activeLoansRes] = await Promise.all([
        supabase.from('savings').select('amount, transaction_type, created_at'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'member'),
        supabase.from('loans').select('id', { count: 'exact', head: true }).eq('status', 'PENDING'),
        supabase.from('loans').select('amount').eq('status', 'DISBURSED')
      ]);

      const totalSavings = (savingsRes.data || []).reduce((acc, curr) => {
        return curr.transaction_type === 'DEPOSIT' ? acc + Number(curr.amount) : acc - Number(curr.amount);
      }, 0);

      const activeLoansSum = (activeLoansRes.data || []).reduce((acc, curr) => acc + Number(curr.amount), 0);

      setStats({
        totalSavings,
        activeLoans: activeLoansSum,
        totalMembers: membersRes.count || 0,
        pendingApprovals: pendingRes.count || 0
      });

      // 2. Fetch Recent Loans
      const { data: recentLoans } = await supabase
        .from('loans')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (recentLoans) setLoans(recentLoans as unknown as LoanWithMember[]);

      // 3. Prepare Chart Data
      const preparedChartData = (savingsRes.data || []).reduce((acc: ChartDataPoint[], curr) => {
        const month = new Date(curr.created_at).toLocaleString('default', { month: 'short' });
        const amount = Number(curr.amount);
        const existing = acc.find(a => a.name === month);
        
        if (existing) {
          existing.value += (curr.transaction_type === 'DEPOSIT' ? amount : -amount);
        } else {
          const prevValue = acc.length > 0 ? acc[acc.length - 1].value : 0;
          acc.push({ name: month, value: (prevValue + (curr.transaction_type === 'DEPOSIT' ? amount : -amount)) / 1000 }); // Value in K
        }
        return acc;
      }, []);
      setChartData(preparedChartData);

    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await fetchData();
    };
    getData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('admin-dashboard')
      .on('postgres_changes' as any, { event: '*', table: 'loans' }, (payload: any) => {
        fetchData(true);
        const newLoan = payload.new as Loan;
        const msg = payload.eventType === 'INSERT' 
          ? 'New Loan Application' 
          : `Loan Status Updated to ${newLoan.status}`;
        setUpdates(prev => [{ id: Date.now(), type: 'loan', msg, time: 'Just now' }, ...prev].slice(0, 5));
      })
      .on('postgres_changes' as any, { event: 'INSERT', table: 'transactions' }, (payload: any) => {
        fetchData(true);
        const newTx = payload.new as { amount: number };
        setUpdates(prev => [{ 
          id: Date.now(), 
          type: 'payment', 
          msg: `New Transaction: KES ${Number(newTx.amount).toLocaleString()}`, 
          time: 'Just now' 
        }, ...prev].slice(0, 5));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const handleLoanAction = async (loanId: string, action: 'APPROVED' | 'REJECTED') => {
    try {
      const { error } = await supabase
        .from('loans')
        .update({ status: action })
        .eq('id', loanId);
      
      if (error) throw error;
      fetchData(true);
    } catch (error) {
      console.error('Error updating loan status:', error);
      alert('Failed to update loan status');
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 text-omix-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Omix Admin Central</h1>
            <button 
              onClick={() => fetchData(true)} 
              className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all ${refreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <p className="text-slate-400 mt-1">Logged in as <span className="text-omix-accent font-medium">{userEmail}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> System Online
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Savings', value: `KES ${(stats.totalSavings / 1000).toFixed(1)}K`, icon: Landmark, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Active Loans', value: `KES ${(stats.activeLoans / 1000).toFixed(1)}K`, icon: DollarSign, color: 'text-omix-accent', bg: 'bg-omix-accent/10' },
          { label: 'Total Members', value: stats.totalMembers.toString(), icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Pending Approvals', value: stats.pendingApprovals.toString(), icon: ListTodo, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl border border-white/5 bg-black/40">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Savings Growth</h3>
              <p className="text-slate-400 text-sm">Real-time contribution trends across all members</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.length > 0 ? chartData : [{name: 'None', value: 0}]}>
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
                  formatter={(value: number) => [`KES ${value}K`, 'Total Savings']}
                />
                <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col justify-between bg-black/40">
           <div>
              <h3 className="text-xl font-bold text-white mb-2">System Health</h3>
              <p className="text-slate-400 text-sm mb-8">Repayment health vs disbursement goals</p>
              
              <div className="space-y-6">
                 {[
                   { label: 'Loan Repayment Rate', value: 92, color: 'bg-emerald-500' },
                   { label: 'Member Retention', value: 98, color: 'bg-omix-accent' },
                   { label: 'Data Integrity', value: 100, color: 'bg-cyan-500' },
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
               <p className="text-xs text-omix-accent font-bold uppercase tracking-wider">Growth Trend</p>
               <p className="text-white font-bold">+12.5% This Month</p>
             </div>
           </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/5 bg-black/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Loan Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-500 text-sm border-b border-white/5">
                  <th className="pb-4 font-medium px-2">Member</th>
                  <th className="pb-4 font-medium px-2">Amount</th>
                  <th className="pb-4 font-medium px-2">Status</th>
                  <th className="pb-4 font-medium px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loans.length > 0 ? loans.map((loan) => (
                  <tr key={loan.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-2">
                      <div className="text-white font-medium">{loan.profiles.full_name}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest">{new Date(loan.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-2 text-white font-mono">KES {Number(loan.amount).toLocaleString()}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase ${
                        loan.status === 'APPROVED' || loan.status === 'DISBURSED' ? 'bg-emerald-500/20 text-emerald-400' :
                        loan.status === 'PENDING' ? 'bg-omix-accent/20 text-omix-accent' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      {loan.status === 'PENDING' && (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleLoanAction(loan.id, 'APPROVED')}
                            className="p-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleLoanAction(loan.id, 'REJECTED')}
                            className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500">No recent applications</td>
                  </tr>
                )}
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
            <AnimatePresence mode="popLayout">
              {updates.length > 0 ? updates.map((update) => (
                <motion.div 
                  layout
                  key={update.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-4 relative"
                >
                  <div className={`w-[23px] h-[23px] rounded-full border-2 border-[#05070A] shrink-0 z-10 flex items-center justify-center ${
                    update.type === 'payment' ? 'bg-emerald-500' : 'bg-omix-accent'
                  }`}>
                    {update.type === 'payment' ? <Zap className="w-3 h-3 text-white" /> : <Activity className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <p className="text-sm text-slate-200 leading-relaxed">{update.msg}</p>
                    <p className="text-xs text-slate-500 mt-1">{update.time}</p>
                  </div>
                </motion.div>
              )) : (
                <p className="text-slate-500 text-sm pl-10 py-4">Waiting for activity...</p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

