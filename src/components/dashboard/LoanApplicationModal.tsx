'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Loader2, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

interface LoanApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  onSuccess: () => void
}

export function LoanApplicationModal({ isOpen, onClose, userId, onSuccess }: LoanApplicationModalProps) {
  const [amount, setAmount] = useState('')
  const [duration, setDuration] = useState('12')
  const [purpose, setPurpose] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('loans')
        .insert({
          member_id: userId,
          amount: parseFloat(amount),
          interest_rate: 12.5, // Standard rate for MVP
          duration_months: parseInt(duration),
          purpose: purpose,
          status: 'PENDING'
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        onSuccess()
        onClose()
        setSuccess(false)
        setAmount('')
        setPurpose('')
      }, 2000)
    } catch (error) {
      console.error('Error applying for loan:', error)
      alert('Failed to submit loan application. Please try again.')
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
                <FileText className="w-5 h-5 text-omix-accent" /> Apply for Loan
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-omix-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-omix-accent" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Application Submitted!</h4>
                  <p className="text-slate-400">Our staff will review your application soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Loan Amount (KES)</label>
                    <input
                      type="number"
                      required
                      min="1000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 50000"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-omix-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Duration (Months)</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-omix-accent transition-all"
                    >
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                      <option value="24">24 Months</option>
                      <option value="36">36 Months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Purpose of Loan</label>
                    <textarea
                      required
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="Describe how you'll use the funds"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-omix-accent transition-all h-24 resize-none"
                    />
                  </div>
                  <div className="p-4 bg-omix-accent/10 border border-omix-accent/20 rounded-xl">
                    <p className="text-xs text-slate-300">
                      Estimated Monthly Repayment: <span className="text-white font-bold font-display">KES {amount ? (parseFloat(amount) * 1.125 / parseInt(duration)).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}</span>
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-omix-accent hover:bg-omix-accent-dark disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-omix-accent/20 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Application'}
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
