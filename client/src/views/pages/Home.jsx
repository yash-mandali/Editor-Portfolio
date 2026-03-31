import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Play, Zap, Award, Users, Sparkles, Film, Clock, Star } from 'lucide-react';
import { PROFILE, WHY_CHOOSE_ME, SERVICES } from '../../models/data';
import VideoModal from '../components/VideoModal';
import { useVideoController } from '../../controllers/useVideoController';
import Videos from './Videos';
import HeroVideo from '../components/HeroVideo';

/* ─── Animated counter ─── */
const Counter = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useState(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 24);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{isInView ? target : 0}{suffix}</span>;
};

/* ─── Editing style card ─── */
const StyleCard = ({ icon: Icon, title, desc, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative p-8 bg-neutral-50 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 hover:border-amber-500/40 transition-all duration-500 overflow-hidden"
  >
    {/* gradient glow on hover */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${color} blur-2xl scale-150`} />
    <div className="relative z-10">
      <div className={`w-14 h-14 mb-6 rounded-none bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <Icon size={22} className="text-black" />
      </div>
      <h3 className="text-xl font-black text-neutral-950 dark:text-white mb-3 tracking-tight uppercase transition-colors">{title}</h3>
      <div className="w-6 h-[2px] bg-amber-500 mb-4 group-hover:w-full transition-all duration-500" />
      <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed font-light transition-colors">{desc}</p>
    </div>
  </motion.div>
);

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.18], [0, -80]);
  const springY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const editingStyles = [
    { icon: Film, title: 'Cinematic', desc: 'Slow burns, colour grades, and atmospheric tension that feel like a feature film.', color: 'from-amber-400/20 to-orange-600/10' },
    { icon: Zap, title: 'High Energy', desc: 'Fast cuts, beat-synced transitions, and kinetic motion for reels that stop the scroll.', color: 'from-blue-400/20 to-purple-600/10' },
    { icon: Star, title: 'Documentary', desc: 'Authentic storytelling with natural pacing, interviews, and immersive sound design.', color: 'from-green-400/20 to-teal-600/10' },
    { icon: Sparkles, title: 'Motion FX', desc: 'VFX overlays, text animations, and motion graphics that elevate every frame.', color: 'from-pink-400/20 to-rose-600/10' },
    { icon: Users, title: 'Brand / Ad', desc: 'Conversion-focused commercial edits built to drive clicks, views, and revenue.', color: 'from-yellow-400/20 to-amber-600/10' },
    { icon: Award, title: 'Wedding', desc: 'Timeless, emotional films that capture every detail of your most important day.', color: 'from-purple-400/20 to-indigo-600/10' },
  ];

  const stats = [
    { value: 200, suffix: '+', label: 'Projects Delivered' },
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 50, suffix: 'M+', label: 'Views Generated' },
  ];

  const marqueeItems = ['Cinematic', 'Dynamic', 'Impactful', 'Professional', 'Creative', 'Immersive', 'Storytelling', 'Premium'];

  return (
    <div ref={containerRef} className="bg-white dark:bg-neutral-950 selection:bg-amber-500/30 overflow-x-hidden transition-colors duration-500">
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} videoUrl={selectedVideo} />

      {/* ── HERO ── */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ scale: heroScale }}
      >
        <HeroVideo className="z-0" />

        <motion.div
          className="container mx-auto px-6 relative z-10 text-center"
          style={{ opacity: heroOpacity, y: heroTextY }}
        >
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md mb-8"
              whileHover={{ scale: 1.05, borderColor: 'rgba(251,191,36,0.5)' }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-neutral-600 dark:text-white/80">Premiere Video Editor</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black text-neutral-950 dark:text-white tracking-tighter leading-[0.85] mb-8 drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)] dark:drop-shadow-none">
              {['CRAFTING', 'CINEMATIC', 'STORIES'].map((word, i) => (
                <span key={word} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`inline-block ${i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-[length:200%_auto] animate-shimmer' : ''}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mb-12 text-lg font-light leading-relaxed tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] dark:drop-shadow-none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.5 }}
            >
              Turning raw footage into visual masterpieces. High-impact edits for visionary creators and global brands.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Link to="/portfolio" className="group relative px-10 py-4 bg-amber-500 text-black font-black uppercase tracking-widest overflow-hidden transition-all hover:pr-14 neon-pulse">
                <span className="relative z-10 flex items-center gap-3">
                  Explore Portfolio <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute top-0 -left-full w-full h-full bg-white/20 skew-x-12 group-hover:left-full transition-all duration-700" />
              </Link>

              <button
                onClick={() => setSelectedVideo('https://www.youtube.com/watch?v=zF9m02WllZc')}
                className="group flex items-center gap-4 text-neutral-900 dark:text-white font-bold tracking-widest uppercase text-sm hover:text-amber-500 transition-colors drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] dark:drop-shadow-none"
              >
                <div className="w-12 h-12 rounded-full border border-neutral-900/30 dark:border-white/20 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all">
                  <Play size={16} fill="currentColor" />
                </div>
                Watch Showreel
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Corner HUD accents */}
        <div className="absolute top-24 left-8 text-[9px] font-black tracking-[0.3em] text-amber-500/60 uppercase hidden lg:block">
          <div>REC ●</div>
          <div className="mt-1 text-white/30 dark:text-neutral-400/30">00:00:00:00</div>
        </div>
        <div className="absolute top-24 right-8 text-[9px] font-black tracking-[0.3em] text-amber-500/60 uppercase hidden lg:block text-right">
          <div>4K / 60FPS</div>
          <div className="mt-1 text-white/30 dark:text-neutral-400/30">TIMELINE_01</div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-amber-500/50">Scroll</span>
        </motion.div>
      </motion.section>

      {/* ── MARQUEE TICKER ── */}
      <div className="relative py-6 bg-neutral-950 dark:bg-neutral-950 border-y border-amber-500/20 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-content animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-8 text-[11px] font-black tracking-[0.4em] uppercase text-white/50">
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-black/5 dark:border-white/5">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 text-center border-r border-b border-black/5 dark:border-white/5 last:border-r-0 group hover:bg-amber-500/5 transition-colors"
              >
                <div className="text-5xl md:text-6xl font-black text-neutral-950 dark:text-white mb-2 tracking-tighter group-hover:text-amber-500 transition-colors">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ME ── */}
      <section className="py-32 relative bg-white dark:bg-neutral-950 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-amber-500 font-black tracking-[0.4em] uppercase text-xs mb-4">
                Expertise
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-neutral-950 dark:text-white leading-none tracking-tighter transition-colors">
                THE ART OF <br /><span className="text-neutral-400 dark:text-white/40 transition-colors">VISUAL STORYTELLING</span>
              </motion.h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {WHY_CHOOSE_ME.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                className="group relative"
              >
                <div className="absolute -inset-4 bg-amber-500/0 group-hover:bg-amber-500/5 rounded-3xl transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-8 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500/10 transition-all">
                    <item.icon size={24} className="text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-4 tracking-tight transition-colors">{item.title}</h3>
                  <div className="w-8 h-[2px] bg-amber-500 mb-6 group-hover:w-full transition-all duration-500" />
                  <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-light transition-colors">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITING STYLES ── */}
      <section className="py-32 bg-neutral-50 dark:bg-neutral-900/30 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-amber-500 font-black tracking-[0.4em] uppercase text-xs mb-4">
              Specialisations
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-neutral-950 dark:text-white tracking-tighter transition-colors">
              EDITING <span className="text-neutral-400 dark:text-white/30">STYLES</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {editingStyles.map((s, i) => <StyleCard key={i} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-32 bg-white dark:bg-neutral-950 relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-24">
            <div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-amber-500 font-black tracking-[0.4em] uppercase text-xs mb-4">
                Portfolio
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-neutral-950 dark:text-white tracking-tighter transition-colors">
                FEATURED <br /><span className="text-amber-500">PROJECTS</span>
              </motion.h2>
            </div>
            <Link to="/portfolio" className="group flex items-center gap-3 text-neutral-400 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white transition-colors uppercase tracking-[0.3em] text-xs font-bold">
              View All <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <Videos />
        </div>
      </section>

      {/* ── SERVICES STRIP ── */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-white tracking-tighter">
              WHAT I <span className="text-amber-500">DELIVER</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ backgroundColor: 'rgba(245,158,11,0.05)' }}
                className="p-10 bg-neutral-950 group transition-colors"
              >
                <div className="w-12 h-12 mb-6 border border-white/10 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500/10 transition-all">
                  <svc.icon size={20} className="text-white/50 group-hover:text-amber-500 transition-colors" />
                </div>
                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight group-hover:text-amber-500 transition-colors">{svc.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">{svc.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CINEMATIC CTA ── */}
      <section className="relative py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-950/85 z-10" />
          <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop" alt="VFX" className="w-full h-full object-cover" />
        </div>

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 w-full h-[1px] bg-amber-500/30 z-20 pointer-events-none"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <div className="text-[10px] font-black tracking-[0.5em] uppercase text-amber-500/60 mb-6">Ready to collaborate?</div>
            <h2
              className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-12 leading-none glitch-text"
              data-text="READY TO GO VIRAL?"
            >
              READY TO <br /><span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>GO VIRAL?</span>
            </h2>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link to="/contact" className="relative px-16 py-6 bg-white text-neutral-950 font-black uppercase tracking-[0.4em] text-sm hover:bg-amber-500 transition-all shadow-2xl">
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
