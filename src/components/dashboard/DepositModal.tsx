'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Landmark, Loader2, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  onSuccess: () => void
}

export function DepositModal({ isOpen, onClose, userId, onSuccess }: DepositModalProps) {
  const [amount, setAmount] = useState('')
  const [mpesaReceipt, setMpesaReceipt] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const numAmount = parseFloat(amount)
      
      // 1. Create transaction record
      const { data: tx, error: txError } = await supabase
        .from('transactions')
        .insert({
          member_id: userId,
          type: 'SAVINGS',
          amount: numAmount,
          mpesa_receipt: mpesaReceipt,
          status: 'COMPLETED' // Simplified for MVP
        })
        .select()
        .single()

      if (txError) throw txError

      // 2. Create savings record
      const { error: savingsError } = await supabase
        .from('savings')
        .insert({
          member_id: userId,
          amount: numAmount,
          transaction_type: 'DEPOSIT',
          status: 'COMPLETED'
        })

      if (savingsError) throw savingsError

      setSuccess(true)
      setTimeout(() => {
        onSuccess()
        onClose()
        setSuccess(false)
        setAmount('')
        setMpesaReceipt('')
      }, 2000)
    } catch (error) {
      console.error('Error depositing funds:', error)
      alert('Failed to deposit funds. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-omix-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-omix-accent" /> Deposit Funds
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Deposit Successful!</h4>
                  <p className="text-slate-400">Your savings have been updated.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Amount (KES)</label>
                    <input
                      type="number"
                      required
                      min="100"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 5000"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-omix-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">M-Pesa Receipt Number</label>
                    <input
                      type="text"
                      required
                      value={mpesaReceipt}
                      onChange={(e) => setMpesaReceipt(e.target.value)}
                      placeholder="e.g. RFH1234567"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-omix-accent transition-all"
                    />
                    <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Enter the code from your confirmation SMS</p>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-omix-accent hover:bg-omix-accent-dark disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-omix-accent/20 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Deposit'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
