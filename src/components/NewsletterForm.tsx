import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

export const NewsletterForm: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setFeedback('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFeedback('Demo Notice: Thank you for testing. In demo mode, no real email subscription was dispatched.');
    }, 600);
  };

  return (
    <section
      id="store-newsletter-section"
      aria-label="Newsletter Subscription"
      className="bg-[#F5F1EB] border-y border-[#E6E0D8] py-14 sm:py-20 px-6 overflow-hidden"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center space-y-4"
      >
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#6D2638] font-medium">
          Privileged Access
        </span>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#25231F] font-light tracking-tight">
          Join the Tarana Atelier Journal
        </h2>

        <p className="text-xs sm:text-sm text-[#6C665F] font-light max-w-lg mx-auto leading-relaxed">
          Be first to preview archival runway drops, bespoke trunk shows, and seasonal styling editorials directly in your inbox.
        </p>

        {status === 'success' ? (
          <div className="pt-4 p-4 bg-white border border-[#E6E0D8] rounded-[2px] inline-flex items-center gap-3 text-xs text-[#25231F]">
            <CheckCircle2 className="w-5 h-5 text-[#6D2638] shrink-0" />
            <span className="text-left font-light">{feedback}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email-input" className="sr-only">
                Email Address
              </label>
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 bg-white border border-[#E6E0D8] text-xs text-[#25231F] placeholder-[#6C665F]/70 rounded-[1px] focus:outline-none focus:border-[#25231F]"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-[#25231F] text-[#FFFEFC] hover:bg-[#6D2638] text-xs uppercase tracking-widest font-medium rounded-[1px] transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {status === 'error' && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6D2638]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            <p className="mt-2 text-[11px] text-[#6C665F]/80">
              We honor your privacy. Unsubscribe at any time with a single click.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
};
