import React from 'react';
import { Mail, MessageCircle, MapPin, Send, Loader2, Sparkles, Terminal } from 'lucide-react';
import { useContactController } from '../../controllers/useContactController';
import { PROFILE } from '../../models/data';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const { formData, handleChange, handleSubmit, isSubmitting, submitted, error } = useContactController();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500 relative overflow-hidden flex flex-col justify-center py-48">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-orange-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
              <Terminal size={12} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Secure_Channel</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-10 text-neutral-950 dark:text-white tracking-tighter leading-none">
              READY TO <br /> <span className="text-neutral-400 dark:text-neutral-500">ASSEMBLE?</span>
            </h1>

            <p className="text-neutral-500 dark:text-neutral-400 text-xl font-light leading-relaxed mb-20 max-w-lg transition-colors">
              Every masterpiece begins with a conversation. Let's discuss your project's architecture and emotional rhythm.
            </p>

            <div className="space-y-12">
              {[
                { icon: Mail, label: 'Transmission', value: PROFILE.email, link: `mailto:${PROFILE.email}` },
                { icon: MessageCircle, label: 'Instant Connect', value: 'WhatsApp Direct', link: `https://wa.me/${PROFILE.whatsapp}` },
                { icon: MapPin, label: 'Current Base', value: 'Remote Worldwide / India', link: null }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 mb-2 group-hover:text-amber-500 transition-colors uppercase">{item.label}</h3>
                    {item.link ? (
                      <a href={item.link} className="text-xl font-bold text-neutral-950 dark:text-white hover:text-amber-500 transition-colors tracking-tight">{item.value}</a>
                    ) : (
                      <p className="text-xl font-bold text-neutral-950 dark:text-white tracking-tight transition-colors">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form - High End Multi-Theme Mode */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative p-1 rounded-2xl bg-gradient-to-br from-black/5 dark:from-white/10 via-transparent to-transparent"
          >
            <div className="bg-neutral-50 dark:bg-neutral-900/80 backdrop-blur-3xl p-10 md:p-16 rounded-2xl border border-black/5 dark:border-white/5 shadow-2xl transition-colors duration-500">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-24 h-24 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-10">
                      <Sparkles size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-neutral-950 dark:text-white mb-4 tracking-tighter uppercase transition-colors">Inquiry Received</h3>
                    <p className="text-neutral-500 font-light mb-12 max-w-sm mx-auto">Your signal has been captured. Our team will initiate contact within 24 standard hours.</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-10 py-4 border border-black/10 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950 dark:text-white hover:bg-neutral-950 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10" key="form">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest text-center"
                      >
                        {error}
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 block transition-colors">Identitiy</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 text-neutral-950 dark:text-white text-lg font-light focus:outline-none focus:border-amber-500 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 block transition-colors">Frequency</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 text-neutral-950 dark:text-white text-lg font-light focus:outline-none focus:border-amber-500 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 block transition-colors">Format</label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full bg-white dark:bg-neutral-900 border-b border-black/10 dark:border-white/10 py-4 text-neutral-950 dark:text-white text-lg font-light focus:outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-white dark:bg-neutral-900">Select Type</option>
                          <option value="reels" className="bg-white dark:bg-neutral-900">Premium Reels</option>
                          <option value="youtube" className="bg-white dark:bg-neutral-900">Cinematic YouTube</option>
                          <option value="wedding" className="bg-white dark:bg-neutral-900">Masterful Wedding</option>
                          <option value="commercial" className="bg-white dark:bg-neutral-900">Commercial/Brand</option>
                          <option value="other" className="bg-white dark:bg-neutral-900">Custom Sequence</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 block transition-colors">Investment Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-white dark:bg-neutral-900 border-b border-black/10 dark:border-white/10 py-4 text-neutral-950 dark:text-white text-lg font-light focus:outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-white dark:bg-neutral-900">Select Budget</option>
                          <option value="50-200" className="bg-white dark:bg-neutral-900">$50 - $200</option>
                          <option value="200-500" className="bg-white dark:bg-neutral-900">$200 - $500</option>
                          <option value="500-1000" className="bg-white dark:bg-neutral-900">$500 - $1000</option>
                          <option value="1000+" className="bg-white dark:bg-neutral-900">$1000+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 block transition-colors">Briefing</label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 text-neutral-950 dark:text-white text-lg font-light focus:outline-none focus:border-amber-500 transition-all resize-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                        placeholder="Tell me about your vision, deadline, and soul of the project..."
                      ></textarea>
                    </div>

                    <div className="pt-6">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.4em] py-6 hover:bg-amber-500 dark:hover:bg-amber-500 transition-all flex items-center justify-center gap-4 disabled:opacity-50 text-xs"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : (
                          <><span>Initiate Transmission</span> <Send size={14} /></>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
