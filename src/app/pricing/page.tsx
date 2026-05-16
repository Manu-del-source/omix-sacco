'use client'

import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import Link from 'next/link';

const pricingPlans = [
  {
    name: 'Omix Premium',
    price: 'KES 5,000',
    period: 'per month',
    description: 'Perfect for new and growing cooperatives.',
    features: [
      'Up to 500 Members',
      'Basic Savings & Loans',
      'Standard Reporting',
      'kiptooe142@gemail.com',
      '07026090372',
      'Mpesa Tracking Integration'
    ],
    cta: 'Start Free Trial',
    popular: false,
    color: 'from-slate-400 to-slate-500',
    btnClass: 'bg-white/10 hover:bg-white/20 text-white'
  },
  {
    name: 'Growth SACCO',
    price: 'KES 15,000',
    period: 'per month',
    description: 'Advanced features for scaling SACCO operations.',
    features: [
      'Up to 5,000 Members',
      'Mpesa Paybill Integration',
      'Guarantor Workflows',
      'Advanced Analytics',
      'Priority SMS & Email Support',
      'Custom Pipelines'
    ],
    cta: 'Start 14-Day Trial',
    popular: true,
    color: 'from-omix-accent to-amber-500',
    btnClass: 'bg-omix-accent hover:bg-omix-accent-dark text-white shadow-lg shadow-omix-accent/20'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored pricing',
    description: 'Dedicated infrastructure for large-scale institutions.',
    features: [
      'Unlimited Members',
      'Unlimited Users',
      'Dedicated Account Manager',
      'Custom ERP Integrations',
      'SSO & Advanced Security',
      'On-premise Deployment'
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'from-omix-cyan to-blue-500',
    btnClass: 'bg-white text-omix-dark hover:bg-slate-200'
  }
];

export default function PricingPage() {
  return (
    <div className="flex-1 bg-transparent pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-white"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
             No hidden fees. No surprise charges. Choose the plan that fits your growth stage.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`relative glass-card rounded-2xl p-8 border ${plan.popular ? 'border-omix-accent/50 shadow-2xl shadow-omix-accent/10 transform md:-translate-y-4' : 'border-white/5'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-omix-accent to-amber-500 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-display font-medium text-white mb-2">{plan.name}</h3>
              <div className="flex items-end mb-4">
                <span className={`text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r ${plan.color}`}>
                  {plan.price}
                </span>
                {plan.price !== 'Custom' && <span className="text-slate-400 ml-2 mb-1">/mo</span>}
              </div>
              <p className="text-sm text-slate-400 mb-8 h-10">{plan.description}</p>
              
              <Link href={plan.name === 'Enterprise' ? '/contact' : '/signup'} className={`w-full py-3 rounded-xl font-medium mb-8 transition-all flex justify-center ${plan.btnClass}`}>
                {plan.cta}
              </Link>
              
              <div className="space-y-4">
                <p className="text-sm font-medium text-white mb-4">What&apos;s included:</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-omix-accent' : 'text-omix-cyan'}`} />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto glass-card flex items-start gap-4 p-6 rounded-xl border border-white/5">
           <Info className="w-6 h-6 text-omix-cyan shrink-0 mt-0.5" />
           <div>
             <h4 className="text-white font-medium mb-1">Looking for Non-Profit or Education discounts?</h4>
             <p className="text-sm text-slate-400">We offer special pricing for registered NGOs and educational institutions. <Link href="/contact" className="text-omix-cyan hover:text-omix-cyan-300 underline underline-offset-2">Contact our sales team</Link> to learn more.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
