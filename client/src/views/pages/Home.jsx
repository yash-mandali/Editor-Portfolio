import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Play, Zap, Award, Users, Sparkles, Film, Star, ChevronRight } from 'lucide-react';
import { WHY_CHOOSE_ME, SERVICES } from '../../models/data';
import VideoModal from '../components/VideoModal';
import Videos from './Videos';
import HeroVideo from '../components/HeroVideo';

/* ─── Magnetic button ─── */
const MagneticBtn = ({ children, className, style, onClick, to }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const handleMove = e => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };
  const Tag = to ? motion(Link) : motion.button;
  return (
    <Tag ref={ref} to={to} onClick={onClick} onMouseMove={handleMove} onMouseLeave={reset}
      style={{ ...style, x: sx, y: sy }} className={className}>
      {children}
    </Tag>
  );
};

/* ─── Animated counter ─── */
const Counter = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return <span ref={ref}>{isInView ? target : 0}{suffix}</span>;
};

/* ─── Style card ─── */
const ACCENTS = ['#00d4ff', '#a78bfa', '#34d399', '#f472b6', '#fbbf24', '#60a5fa'];
const StyleCard = ({ icon: Icon, title, desc, accentColor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    whileHover={{ y: -8, transition: { duration: 0.22 } }}
    className="group relative p-7 bg-[#111118] border border-white/[0.05] overflow-hidden neon-border-cyan"
  >
    <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500" style={{ background: accentColor }} />
    <div className="absolute bottom-0 right-0 w-0 h-[2px] group-hover:w-full transition-all duration-500 delay-100" style={{ background: accentColor }} />
    <div className="relative z-10">
      <div className="w-12 h-12 mb-5 flex items-center justify-center" style={{ background: accentColor + '15', border: `1px solid ${accentColor}28` }}>
        <Icon size={20} style={{ color: accentColor }} />
      </div>
      <h3 className="text-sm font-black text-white mb-2 tracking-widest uppercase">{title}</h3>
      <div className="w-5 h-[1.5px] mb-3 group-hover:w-full transition-all duration-500" style={{ background: accentColor }} />
      <p className="text-[#6b6b80] text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const containerRef = useRef(null);
  const showreelRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.07]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.16], [0, -80]);

  /* Parallax layers */
  const { scrollYProgress: showreelScroll } = useScroll({ target: showreelRef, offset: ['start end', 'end start'] });
  const showreelY = useTransform(showreelScroll, [0, 1], [60, -60]);

  const editingStyles = [
    { icon: Film, title: 'Cinematic', desc: 'Slow burns, colour grades, and atmospheric tension that feel like a feature film.', accentColor: ACCENTS[0] },
    { icon: Zap, title: 'High Energy', desc: 'Fast cuts, beat-synced transitions, and kinetic motion for reels that stop the scroll.', accentColor: ACCENTS[1] },
    { icon: Star, title: 'Documentary', desc: 'Authentic storytelling with natural pacing, interviews, and immersive sound design.', accentColor: ACCENTS[2] },
    { icon: Sparkles, title: 'Motion FX', desc: 'VFX overlays, text animations, and motion graphics that elevate every frame.', accentColor: ACCENTS[3] },
    { icon: Users, title: 'Brand / Ad', desc: 'Conversion-focused commercial edits built to drive clicks, views, and revenue.', accentColor: ACCENTS[4] },
    { icon: Award, title: 'Wedding', desc: 'Timeless, emotional films that capture every detail of your most important day.', accentColor: ACCENTS[5] },
  ];

  const stats = [
    { value: 200, suffix: '+', label: 'Projects Delivered' },
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 50, suffix: 'M+', label: 'Views Generated' },
  ];

  const marqueeItems = ['Cinematic', 'Dynamic', 'Impactful', 'Professional', 'Creative', 'Immersive', 'Storytelling', 'Premium'];

  return (
    <div ref={containerRef} className="bg-[#0a0a0f] overflow-x-hidden transition-colors duration-500">
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} videoUrl={selectedVideo} />

      {/* ══════════════════════════════════════════
          HERO — full-screen cinematic opener
      ══════════════════════════════════════════ */}
      <motion.section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ scale: heroScale }}>
        <HeroVideo className="z-0" />

        <motion.div className="container mx-auto px-6 relative z-10 text-center" style={{ opacity: heroOpacity, y: heroTextY }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}>

            {/* Live badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4ff]/25 backdrop-blur-md mb-10"
              style={{ background: 'rgba(0,212,255,0.07)' }}
              whileHover={{ scale: 1.06, borderColor: 'rgba(0,212,255,0.6)' }}
              animate={{ boxShadow: ['0 0 0px rgba(0,212,255,0)', '0 0 20px rgba(0,212,255,0.25)', '0 0 0px rgba(0,212,255,0)'] }}
              transition={{ boxShadow: { duration: 2.5, repeat: Infinity } }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,212,255,0.9)' }} />
              <span className="text-[10px] font-black tracking-[0.35em] uppercase text-white/80">Premiere Video Editor</span>
            </motion.div>

            {/* Staggered headline */}
            <h1 className="text-5xl md:text-[7.5rem] font-black text-white tracking-tighter leading-[0.82] mb-8">
              {['CRAFTING', 'CINEMATIC', 'STORIES'].map((word, i) => (
                <span key={word} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '110%', skewY: 4 }}
                    animate={{ y: 0, skewY: 0 }}
                    transition={{ duration: 1.1, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className={`inline-block ${i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#a78bfa] to-[#00d4ff] bg-[length:200%_auto] animate-shimmer' : ''}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="text-white/55 max-w-lg mx-auto mb-12 text-lg font-light leading-relaxed tracking-wide"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1.4 }}
            >
              Turning raw footage into visual masterpieces. High-impact edits for visionary creators and global brands.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }}
            >
              <MagneticBtn
                to="/portfolio"
                className="group relative px-10 py-4 font-black uppercase tracking-widest overflow-hidden text-black text-sm"
                style={{ background: '#00d4ff', boxShadow: '0 0 35px rgba(0,212,255,0.45)' }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Portfolio <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute top-0 -left-full w-full h-full bg-white/25 skew-x-12 group-hover:left-full transition-all duration-600" />
              </MagneticBtn>

              <MagneticBtn
                onClick={() => setSelectedVideo('https://www.youtube.com/watch?v=zF9m02WllZc')}
                className="group flex items-center gap-4 text-white font-bold tracking-widest uppercase text-sm hover:text-[#00d4ff] transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00d4ff]/60 group-hover:bg-[#00d4ff]/10 transition-all"
                  style={{ boxShadow: '0 0 0 0 rgba(0,212,255,0)' }}>
                  <Play size={15} fill="currentColor" />
                </div>
                Watch Showreel
              </MagneticBtn>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* HUD corners */}
        <div className="absolute top-24 left-8 text-[9px] font-black tracking-[0.3em] text-[#00d4ff]/50 uppercase hidden lg:block animate-flicker">
          <div>REC ●</div>
          <div className="mt-1 text-white/18">00:00:00:00</div>
        </div>
        <div className="absolute top-24 right-8 text-[9px] font-black tracking-[0.3em] text-[#00d4ff]/50 uppercase hidden lg:block text-right">
          <div>4K / 60FPS</div>
          <div className="mt-1 text-white/18">TIMELINE_01</div>
        </div>
        <div className="absolute bottom-8 right-8 text-[8px] font-black tracking-[0.25em] text-white/15 uppercase hidden lg:block">
          <div>FRAME 001 / 999</div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 9, 0] }} transition={{ duration: 2.2, repeat: Infinity }}
        >
          <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent" />
          <span className="text-[9px] font-black tracking-[0.5em] uppercase text-[#00d4ff]/45">Scroll</span>
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════ */}
      <div className="relative py-4 bg-[#0d0d14] border-y border-[#00d4ff]/18 overflow-hidden group/marquee">
        <div className="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-[#0d0d14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-[#0d0d14] to-transparent z-10 pointer-events-none" />
        <div className="ticker-wrap">
          <div className="ticker-content animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.14, color: '#00d4ff' }}
                className="inline-flex items-center gap-4 px-6 text-[11px] font-black tracking-[0.4em] uppercase text-white/55 cursor-default transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-[#00d4ff]/50 flex-shrink-0" />
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STATS — animated counters
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-[#0a0a0f] transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-white/[0.05] border border-white/[0.05]">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ backgroundColor: 'rgba(0,212,255,0.04)' }}
                className="p-10 text-center group cursor-default transition-colors relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00d4ff] group-hover:w-full transition-all duration-500" />
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-[#00d4ff] transition-colors duration-300">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6b6b80]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE ME — parallax cards
      ══════════════════════════════════════════ */}
      <section className="py-32 relative bg-[#0a0a0f] transition-colors duration-500 overflow-hidden">
        {/* Ghost watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-[16vw] font-black text-white/[0.022] uppercase tracking-tighter whitespace-nowrap"
          >
            EXPERTISE
          </motion.span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-20">
            <motion.p initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="text-[#00d4ff] font-black tracking-[0.4em] uppercase text-xs mb-4">
              Why Choose Me
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter">
              THE ART OF <br />
              <span className="text-[#2e2e42]">VISUAL STORYTELLING</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {WHY_CHOOSE_ME.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.14, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.22 } }}
                className="group relative p-8 bg-[#111118] border border-white/[0.05] overflow-hidden neon-border-cyan"
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#00d4ff] group-hover:w-full transition-all duration-500" />
                <motion.div
                  whileHover={{ rotate: 7, scale: 1.12 }}
                  transition={{ duration: 0.22 }}
                  className="w-14 h-14 mb-7 border border-white/[0.07] flex items-center justify-center group-hover:border-[#00d4ff]/50 group-hover:bg-[#00d4ff]/8 transition-all"
                >
                  <item.icon size={22} className="text-white/55 group-hover:text-[#00d4ff] transition-colors" />
                </motion.div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                <div className="w-7 h-[2px] bg-[#00d4ff] mb-5 group-hover:w-full transition-all duration-500" />
                <p className="text-neutral-500 dark:text-[#6b6b80] leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EDITING STYLES — staggered grid
      ══════════════════════════════════════════ */}
      <section ref={showreelRef} className="py-32 bg-[#0d0d14] relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00d4ff]/4 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a78bfa]/4 rounded-full blur-[130px] pointer-events-none" />

        <motion.div style={{ y: showreelY }} className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[#00d4ff] font-black tracking-[0.4em] uppercase text-xs mb-4">
              Specialisations
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              EDITING <span className="text-[#2e2e42]">STYLES</span>
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {editingStyles.map((s, i) => <StyleCard key={i} {...s} index={i} />)}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════════════════ */}
      <section className="py-32 bg-[#0a0a0f] relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#00d4ff]/3 rounded-full blur-[130px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-20">
            <div>
              <motion.p initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="text-[#00d4ff] font-black tracking-[0.4em] uppercase text-xs mb-4">
                Portfolio
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }}
                className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                FEATURED <br /><span className="text-[#00d4ff]">PROJECTS</span>
              </motion.h2>
            </div>
            <motion.div initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Link to="/portfolio" className="group flex items-center gap-2 text-[#6b6b80] hover:text-[#00d4ff] transition-colors uppercase tracking-[0.3em] text-xs font-black">
                View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          <Videos />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES — dark strip
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0d0d14] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/22 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/22 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-white tracking-tighter">
              WHAT I <span className="text-[#00d4ff]">DELIVER</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.035]">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ backgroundColor: 'rgba(0,212,255,0.055)', y: -3 }}
                className="p-9 bg-[#0d0d14] group transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#00d4ff] group-hover:w-full transition-all duration-500" />
                <motion.div
                  whileHover={{ rotate: 9, scale: 1.14 }}
                  transition={{ duration: 0.22 }}
                  className="w-11 h-11 mb-6 border border-white/[0.07] flex items-center justify-center group-hover:border-[#00d4ff]/40 group-hover:bg-[#00d4ff]/8 transition-all"
                >
                  <svc.icon size={18} className="text-white/38 group-hover:text-[#00d4ff] transition-colors" />
                </motion.div>
                <h3 className="text-sm font-black text-white mb-3 uppercase tracking-widest group-hover:text-[#00d4ff] transition-colors">{svc.title}</h3>
                <p className="text-[#6b6b80] text-sm leading-relaxed">{svc.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — cinematic finale
      ══════════════════════════════════════════ */}
      <section className="relative py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0a0f]/88 z-10" />
          <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop" alt="VFX" className="w-full h-full object-cover" />
        </div>

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 w-full h-[1px] z-20 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* Ambient glow */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="text-[10px] font-black tracking-[0.55em] uppercase text-[#00d4ff]/55 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to collaborate?
            </motion.p>

            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-14 leading-none">
              READY TO <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,212,255,0.45)' }}>GO VIRAL?</span>
            </h2>

            <MagneticBtn
              to="/contact"
              className="relative inline-block px-16 py-5 font-black uppercase tracking-[0.4em] text-sm text-black transition-all"
              style={{ background: '#00d4ff', boxShadow: '0 0 50px rgba(0,212,255,0.4)' }}
            >
              Start Your Project
            </MagneticBtn>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
