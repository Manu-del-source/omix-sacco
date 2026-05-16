'use client'

import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Send, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="flex-1 bg-transparent pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-white"
          >
            Let&apos;s Start a Conversation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
             Have questions about pricing, features, or integration? Our team is ready to help you scale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           
           {/* Form Section */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="glass-card p-8 rounded-2xl order-2 lg:order-1 relative overflow-hidden"
           >
              {formState === 'success' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-omix-card/90 backdrop-blur z-10 text-center p-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                     <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 mb-6">Our team will get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : null}

              <h2 className="text-2xl font-display font-semibold text-white mb-6">Send us a message</h2>
               <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value });
                        if (errors.firstName) setErrors({ ...errors, firstName: '' });
                      }}
                      className={`w-full bg-white/5 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-omix-accent/50 focus:ring-1 focus:ring-omix-accent/50 transition-all placeholder:text-slate-600`} 
                      placeholder="John" 
                    />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value });
                        if (errors.lastName) setErrors({ ...errors, lastName: '' });
                      }}
                      className={`w-full bg-white/5 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-omix-accent/50 focus:ring-1 focus:ring-omix-accent/50 transition-all placeholder:text-slate-600`} 
                      placeholder="Doe" 
                    />
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Work Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-omix-accent/50 focus:ring-1 focus:ring-omix-accent/50 transition-all placeholder:text-slate-600`} 
                    placeholder="john@company.com" 
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Message</label>
                  <textarea 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-omix-accent/50 focus:ring-1 focus:ring-omix-accent/50 transition-all placeholder:text-slate-600 resize-none`} 
                    placeholder="Tell us about your needs..." 
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full bg-omix-accent hover:bg-omix-accent-dark text-white py-3 rounded-lg font-medium transition-all shadow-lg shadow-omix-accent/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
           </motion.div>

           {/* Contact Info */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="order-1 lg:order-2 space-y-6"
           >
              <div>
                <h2 className="text-2xl font-display font-semibold text-white mb-6">Contact Information</h2>
                <p className="text-slate-400 mb-8">Reach out to us directly through any of these channels. We prioritize fast response times during typical business hours.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                 <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-colors w-full text-center shadow-lg shadow-emerald-500/20">
                   Book a Demo
                 </button>
                 <button className="bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors w-full flex justify-center items-center gap-2">
                   <MessageCircle className="w-5 h-5" /> Live Chat
                 </button>
              </div>

              <div className="space-y-4">
                 <a href="https://wa.me/254726090372" target="_blank" rel="noreferrer" className="glass-card p-6 rounded-xl flex items-start gap-4 hover:border-green-500/50 transition-colors group cursor-pointer">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                      <MessageCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-lg mb-1 group-hover:text-green-400 transition-colors">WhatsApp Support</h4>
                      <p className="text-slate-400 text-sm">Instant replies from our support staff.<br/>+254 726 090 372</p>
                    </div>
                 </a>
                 
                 <a href="mailto:kiptooe142@gmail.com" className="glass-card p-6 rounded-xl flex items-start gap-4 hover:border-omix-cyan/50 transition-colors group cursor-pointer">
                    <div className="w-12 h-12 bg-omix-cyan/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-omix-cyan/20 transition-colors">
                      <Mail className="w-6 h-6 text-omix-cyan" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-lg mb-1 group-hover:text-omix-cyan/40 transition-colors">Email Us</h4>
                      <p className="text-slate-400 text-sm">For partnerships and general enquiries.<br/>kiptooe142@gmail.com</p>
                    </div>
                 </a>

                 <div className="glass-card p-6 rounded-xl flex items-start gap-4">
                    <div className="w-12 h-12 bg-omix-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-omix-accent" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-lg mb-1">Nairobi HQ</h4>
                      <p className="text-slate-400 text-sm">Nairobi Garage, Piedmont Plaza,<br/>Ngong Road, Nairobi, Kenya</p>
                    </div>
                 </div>
              </div>
           </motion.div>
        
        </div>
      </div>
    </div>
  );
}
