'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Landmark, FileText, ShieldCheck, ArrowRightLeft, CreditCard, Plus, History, Loader2, RefreshCw } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { Saving, Loan, Transaction } from '@/types';
import { DepositModal } from './DepositModal';
import { LoanApplicationModal } from './LoanApplicationModal';

interface ChartDataPoint {
  name: string;
  value: number;
}

export function MemberDashboardContent({ userId, userEmail }: { userId: string, userEmail: string }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savings, setSavings] = useState<Saving[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [now] = useState(new Date()); // Fixed date for render cycle
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const [savingsRes, loansRes, transactionsRes] = await Promise.all([
          supabase.from('savings').select('*').eq('member_id', userId).order('created_at', { ascending: true }),
          supabase.from('loans').select('*').eq('member_id', userId).order('created_at', { ascending: false }),
          supabase.from('transactions').select('*').eq('member_id', userId).order('created_at', { ascending: false }).limit(5)
        ]);

        if (savingsRes.data) setSavings(savingsRes.data);
        if (loansRes.data) setLoans(loansRes.data);
        if (transactionsRes.data) setTransactions(transactionsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [userId, supabase]);

  const totalSavings = savings.reduce((acc, curr) => {
    return curr.transaction_type === 'DEPOSIT' ? acc + Number(curr.amount) : acc - Number(curr.amount);
  }, 0);

  const activeLoan = loans.find(l => l.status === 'APPROVED' || l.status === 'DISBURSED' || l.status === 'PENDING');

  const chartData = savings.reduce((acc: ChartDataPoint[], curr) => {
    const month = new Date(curr.created_at).toLocaleString('default', { month: 'short' });
    const amount = Number(curr.amount);
    const existing = acc.find(a => a.name === month);
    
    if (existing) {
      existing.value += (curr.transaction_type === 'DEPOSIT' ? amount : -amount);
    } else {
      const prevValue = acc.length > 0 ? acc[acc.length - 1].value : 0;
      acc.push({ name: month, value: prevValue + (curr.transaction_type === 'DEPOSIT' ? amount : -amount) });
    }
    return acc;
  }, []);

  const refreshData = () => {
    const getData = async () => {
      setRefreshing(true);
      try {
        const [savingsRes, loansRes, transactionsRes] = await Promise.all([
          supabase.from('savings').select('*').eq('member_id', userId).order('created_at', { ascending: true }),
          supabase.from('loans').select('*').eq('member_id', userId).order('created_at', { ascending: false }),
          supabase.from('transactions').select('*').eq('member_id', userId).order('created_at', { ascending: false }).limit(5)
        ]);

        if (savingsRes.data) setSavings(savingsRes.data);
        if (loansRes.data) setLoans(loansRes.data);
        if (transactionsRes.data) setTransactions(transactionsRes.data);
      } catch (error) {
        console.error('Error refreshing dashboard data:', error);
      } finally {
        setRefreshing(false);
      }
    };
    getData();
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
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Member Portal</h1>
            <button 
              onClick={refreshData} 
              className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all ${refreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <p className="text-slate-400 mt-1">Welcome back, <span className="text-omix-accent font-medium">{userEmail}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDepositModalOpen(true)}
            className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/10 transition-all flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" /> Deposit Funds
          </button>
          <button 
            onClick={() => setIsLoanModalOpen(true)}
            className="bg-omix-accent hover:bg-omix-accent-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-omix-accent/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Apply for Loan
          </button>
        </div>
      </div>


      {/* Member Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Savings', value: `KES ${totalSavings.toLocaleString()}`, icon: Landmark, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Active Loan', value: activeLoan ? `KES ${Number(activeLoan.amount).toLocaleString()}` : 'None', icon: FileText, color: 'text-omix-accent', bg: 'bg-omix-accent/10' },
          { label: 'Loan Status', value: activeLoan ? activeLoan.status : 'N/A', icon: ShieldCheck, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Member Since', value: new Date(savings[0]?.created_at || now).toLocaleDateString(), icon: ArrowRightLeft, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
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
              <p className="text-slate-400 text-sm">Your contribution trend</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.length > 0 ? chartData : [{name: 'None', value: 0}]}>
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
            {transactions.length > 0 ? transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-omix-accent transition-colors">{tx.type.replace('_', ' ')}</p>
                  <p className="text-xs text-slate-500">{new Date(tx.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.type === 'SAVINGS' ? 'text-emerald-400' : 'text-omix-accent'}`}>
                    KES {Number(tx.amount).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{tx.status}</p>
                </div>
              </div>
            )) : (
              <p className="text-slate-500 text-sm text-center py-8">No recent activity</p>
            )}
          </div>
          <button className="mt-8 w-full py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            View All Transactions
          </button>
        </div>
      </div>

      {/* Loan Progress Card */}
      {activeLoan && (
        <div className="glass-card p-8 rounded-3xl border border-white/5 bg-gradient-to-r from-omix-accent/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-omix-accent/10 blur-[100px] -z-10" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md w-full">
              <h3 className="text-2xl font-bold text-white mb-2">Current Loan Progress</h3>
              <p className="text-slate-400 text-sm mb-6">Development Loan in {activeLoan.status} state.</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Repayment Progress</span>
                  <span className="text-omix-accent font-bold">0%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-omix-accent" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
               <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Interest Rate</p>
                  <p className="text-xl font-display font-bold text-white">{activeLoan.interest_rate}% p.a</p>
               </div>
               <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Duration</p>
                  <p className="text-xl font-display font-bold text-white">{activeLoan.duration_months} Months</p>
               </div>
            </div>
          </div>
        </div>
      )}

      <DepositModal 
        isOpen={isDepositModalOpen} 
        onClose={() => setIsDepositModalOpen(false)} 
        userId={userId} 
        onSuccess={refreshData} 
      />

      <LoanApplicationModal 
        isOpen={isLoanModalOpen} 
        onClose={() => setIsLoanModalOpen(false)} 
        userId={userId} 
        onSuccess={refreshData} 
      />
    </div>
  )
}

