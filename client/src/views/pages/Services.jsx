import React, { useState } from 'react';
import { SERVICES } from '../../models/data';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/* accent per service index */
const ACCENTS = ['#00d4ff', '#a78bfa', '#34d399', '#f472b6', '#60a5fa'];

const ServiceRow = ({ service, index, accent }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-b border-white/[0.06] last:border-b-0"
    >
      {/* Hover background fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `linear-gradient(90deg, ${accent}08 0%, transparent 60%)` }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 w-[3px] h-full"
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: accent, transformOrigin: 'top' }}
      />

      <div className="relative z-10 flex items-center gap-6 md:gap-10 px-6 md:px-10 py-8 md:py-10">

        {/* Index number */}
        <div
          className="text-5xl md:text-7xl font-black tabular-nums leading-none select-none flex-shrink-0 transition-colors duration-300 w-16 md:w-24 text-right"
          style={{ color: hovered ? accent : 'transparent', WebkitTextStroke: `1px ${hovered ? accent : 'rgba(255,255,255,0.12)'}` }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Divider line */}
        <motion.div
          className="hidden md:block h-[1px] flex-shrink-0"
          animate={{ width: hovered ? 48 : 24, opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          style={{ background: accent }}
        />

        {/* Icon */}
        <motion.div
          animate={{ rotate: hovered ? 8 : 0, scale: hovered ? 1.12 : 1 }}
          transition={{ duration: 0.25 }}
          className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center border transition-all duration-300"
          style={{
            borderColor: hovered ? accent + '60' : 'rgba(255,255,255,0.08)',
            background: hovered ? accent + '12' : 'transparent',
          }}
        >
          <service.icon
            size={22}
            style={{ color: hovered ? accent : undefined }}
            className="text-neutral-400 transition-colors duration-300"
          />
        </motion.div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl md:text-2xl font-black uppercase tracking-tight mb-1 transition-colors duration-300"
            style={{ color: hovered ? accent : undefined }}
          >
            <span className={hovered ? '' : 'text-white'}>{service.title}</span>
          </h3>
          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-[#6b6b80] leading-relaxed max-w-xl overflow-hidden"
              >
                {service.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 12 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 hidden md:block"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-black transition-all"
            style={{ background: accent }}
          >
            Book <ArrowUpRight size={12} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] transition-colors duration-500 relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[-8%] w-[40%] h-[40%] bg-[#00d4ff]/4 blur-[140px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-8%] w-[45%] h-[45%] bg-[#a78bfa]/4 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-0 md:px-6 relative z-10 pt-40 pb-32">

        {/* ── PAGE HEADER ── */}
        <div className="px-6 md:px-0 mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="text-[#00d4ff] font-black tracking-[0.45em] uppercase text-xs mb-4"
          >
            What I Do
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none"
            >
              EXPERTISE &<br />
              <span className="text-[#2e2e42]">SERVICES</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[#6b6b80] text-base font-light leading-relaxed max-w-sm"
            >
              Specialized editing services tailored to your platform, audience, and creative vision.
            </motion.p>
          </div>

          {/* Animated divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-gradient-to-r from-[#00d4ff]/50 via-[#a78bfa]/30 to-transparent mt-12"
          />
        </div>

        {/* ── SERVICE ROWS ── */}
        <div className="border-t border-white/[0.06]">
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={i}
              accent={ACCENTS[i % ACCENTS.length]}
            />
          ))}
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 mx-6 md:mx-0 relative overflow-hidden bg-[#0d0d14] border border-[#00d4ff]/15 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Scan line */}
          <motion.div
            className="absolute left-0 w-full h-[1px] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <p className="text-[10px] font-black tracking-[0.45em] uppercase text-[#00d4ff]/55 mb-3">Ready to start?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
              Let's build something<br />
              <span className="text-[#00d4ff]">extraordinary.</span>
            </h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative z-10 flex-shrink-0"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 font-black uppercase tracking-[0.35em] text-sm text-black transition-all"
              style={{ background: '#00d4ff', boxShadow: '0 0 40px rgba(0,212,255,0.3)' }}
            >
              Get In Touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Services;
