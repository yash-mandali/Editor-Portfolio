import { useRef } from 'react';
import { Mail, MessageCircle, MapPin, Send, Loader2, CheckCircle, Instagram, Youtube, Linkedin, ArrowUpRight } from 'lucide-react';
import { useContactController } from '../../controllers/useContactController';
import { PROFILE } from '../../models/data';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ── Floating dot ── */
const Dot = ({ style }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-[#00d4ff]/30"
    style={style}
    animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
    transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
  />
);

/* ── Animated input field ── */
const Field = ({ label, children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-2"
    >
      <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">{label}</label>
      {children}
    </motion.div>
  );
};

const inputCls = "w-full bg-[#0d0d14] border border-white/[0.07] px-5 py-4 text-white text-sm font-light focus:outline-none focus:border-[#00d4ff]/60 focus:bg-[#00d4ff]/[0.03] transition-all duration-300 placeholder:text-neutral-600 rounded-sm";
const selectCls = `${inputCls} appearance-none cursor-pointer`;

const Contact = () => {
  const { formData, handleChange, handleSubmit, isSubmitting, submitted, error } = useContactController();

  const dots = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 17 + 5) % 95}%`,
    top: `${(i * 23 + 10) % 90}%`,
  }));

  const socials = [
    { icon: Instagram, label: 'Instagram', url: PROFILE.socials.instagram },
    { icon: Youtube, label: 'YouTube', url: PROFILE.socials.youtube },
    { icon: Linkedin, label: 'LinkedIn', url: PROFILE.socials.linkedin },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex flex-col justify-center py-32 md:py-40">

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[45%] h-[45%] bg-[#00d4ff]/4 blur-[140px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[40%] h-[40%] bg-[#a78bfa]/4 blur-[120px] rounded-full" />
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {dots.map((d, i) => <Dot key={i} style={{ left: d.left, top: d.top }} />)}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        {[20, 40, 60, 80].map(p => (
          <div key={p} className="absolute top-0 h-full w-[1px] bg-[#00d4ff]" style={{ left: `${p}%` }} />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00d4ff]/8 border border-[#00d4ff]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00d4ff]">Open for Projects</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">
            LET'S CREATE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#a78bfa] to-[#00d4ff] bg-[length:200%_auto] animate-shimmer">
              SOMETHING GREAT
            </span>
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Every masterpiece starts with a conversation. Tell me about your vision and let's build it together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 xl:gap-20 items-start max-w-6xl mx-auto">

          {/* ── LEFT: Info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact items */}
            {[
              { icon: Mail, label: 'Email', value: PROFILE.email, link: `mailto:${PROFILE.email}` },
              { icon: MessageCircle, label: 'WhatsApp', value: PROFILE.whatsapp, link: `https://wa.me/${PROFILE.whatsapp.replace(/\s/g, '')}` },
              { icon: MapPin, label: 'Location', value: 'Remote · India', link: null },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }}
                className="group flex items-center gap-5 p-5 bg-[#111118] border border-white/[0.05] hover:border-[#00d4ff]/30 transition-all duration-400 rounded-sm"
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#00d4ff]/8 border border-[#00d4ff]/20 text-[#00d4ff] group-hover:bg-[#00d4ff] group-hover:text-black transition-all duration-400 rounded-sm">
                  <item.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.35em] text-neutral-600 mb-1">{item.label}</p>
                  {item.link ? (
                    <a href={item.link} className="text-sm font-semibold text-white hover:text-[#00d4ff] transition-colors truncate block">{item.value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-white truncate">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="pt-4"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600 mb-4">Follow My Work</p>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 px-4 py-3 bg-[#111118] border border-white/[0.05] hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 transition-all duration-300 rounded-sm"
                  >
                    <s.icon size={15} className="text-neutral-500 group-hover:text-[#00d4ff] transition-colors" />
                    <ArrowUpRight size={11} className="text-neutral-700 group-hover:text-[#00d4ff] transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="p-5 bg-[#00d4ff]/5 border border-[#00d4ff]/15 rounded-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">Available Now</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">Currently accepting new projects. Typical response within 24 hours.</p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="relative bg-[#111118] border border-white/[0.06] rounded-sm overflow-hidden">
              {/* Top accent line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-[#00d4ff] via-[#a78bfa] to-transparent" />

              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mb-8"
                        style={{ boxShadow: '0 0 40px rgba(0,212,255,0.2)' }}
                      >
                        <CheckCircle size={36} className="text-[#00d4ff]" />
                      </motion.div>
                      <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Message Sent!</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-xs">
                        Thanks for reaching out. I'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" key="form">
                      <div className="mb-8">
                        <h2 className="text-xl font-black text-white tracking-tight mb-1">Start a Project</h2>
                        <p className="text-xs text-neutral-600">Fill in the details below and I'll be in touch.</p>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest text-center rounded-sm"
                        >
                          {error}
                        </motion.div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Your Name">
                          <input type="text" name="name" required value={formData.name} onChange={handleChange}
                            className={inputCls} placeholder="John Doe" />
                        </Field>
                        <Field label="Email Address">
                          <input type="email" name="email" required value={formData.email} onChange={handleChange}
                            className={inputCls} placeholder="john@example.com" />
                        </Field>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Project Type">
                          <select name="projectType" value={formData.projectType} onChange={handleChange} className={selectCls}>
                            <option value="" style={{ background: '#0d0d14', color: '#fff' }}>Select type</option>
                            <option value="reels" style={{ background: '#0d0d14', color: '#fff' }}>Reels / Shorts</option>
                            <option value="youtube" style={{ background: '#0d0d14', color: '#fff' }}>YouTube Video</option>
                            <option value="wedding" style={{ background: '#0d0d14', color: '#fff' }}>Wedding Film</option>
                            <option value="commercial" style={{ background: '#0d0d14', color: '#fff' }}>Commercial / Brand</option>
                            <option value="other" style={{ background: '#0d0d14', color: '#fff' }}>Other</option>
                          </select>
                        </Field>
                        <Field label="Budget Range">
                          <select name="budget" value={formData.budget} onChange={handleChange} className={selectCls}>
                            <option value="" style={{ background: '#0d0d14', color: '#fff' }}>Select budget</option>
                            <option value="$0-$10" style={{ background: '#0d0d14', color: '#fff' }}>$0 – $10</option>
                            <option value="$10-$30" style={{ background: '#0d0d14', color: '#fff' }}>$10 – $30</option>
                            <option value="$30-$50" style={{ background: '#0d0d14', color: '#fff' }}>$30 – $50</option>
                            <option value="$50+" style={{ background: '#0d0d14', color: '#fff' }}>$50+</option>
                          </select>
                        </Field>
                      </div>

                      <Field label="Project Brief">
                        <textarea name="message" required value={formData.message} onChange={handleChange}
                          rows={5} className={`${inputCls} resize-none`}
                          placeholder="Describe your project, goals, deadline, and any references..." />
                      </Field>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full flex items-center justify-center gap-3 py-5 font-black uppercase tracking-[0.35em] text-xs text-black transition-all disabled:opacity-50 rounded-sm"
                        style={{ background: '#00d4ff', boxShadow: '0 0 30px rgba(0,212,255,0.25)' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#a78bfa'}
                        onMouseLeave={e => e.currentTarget.style.background = '#00d4ff'}
                      >
                        {isSubmitting ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          <><span>Send Message</span><Send size={14} /></>
                        )}
                      </motion.button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
