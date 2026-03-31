import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, Zap, Award, Users, Sparkles, ChevronDown } from 'lucide-react';
import { PROFILE, WHY_CHOOSE_ME } from '../../models/data';
import VideoModal from '../components/VideoModal';
import { useVideoController } from '../../controllers/useVideoController';
import Videos from './Videos';
import HeroVideo from '../components/HeroVideo';

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { filteredItems } = useVideoController();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  const springScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="bg-white dark:bg-neutral-950 selection:bg-amber-500/30 overflow-x-hidden transition-colors duration-500">
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
      />

      {/* Cinematic Hero Section - Remains Dark for Impact */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-950"
        style={{ scale: heroScale }}
      >
        <HeroVideo className="z-0" />
        
        {/* Animated Text Layer */}
        <motion.div 
          className="container mx-auto px-6 relative z-10 text-center"
          style={{ opacity: heroOpacity, y: heroTextY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
               whileHover={{ scale: 1.05, borderColor: "rgba(251, 191, 36, 0.5)" }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/70">Premiere Video Editor</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8">
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  CRAFTING
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-[length:200%_auto] animate-shimmer"
                >
                  CINEMATIC
                </motion.span>
              </span>
              <span className="block overflow-hidden pt-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  STORIES
                </motion.span>
              </span>
            </h1>

            <motion.p 
              className="text-neutral-400 max-w-xl mx-auto mb-12 text-lg font-light leading-relaxed tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
            >
              Turning raw footage into visual masterpieces. High-impact edits for visionary creators and global brands.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Link to="/portfolio" className="group relative px-10 py-4 bg-amber-500 text-black font-black uppercase tracking-widest rounded-none overflow-hidden transition-all hover:pr-14">
                <span className="relative z-10 flex items-center gap-3">
                  Explorer Portfolio <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute top-0 -left-full w-full h-full bg-white/20 skew-x-12 group-hover:left-full transition-all duration-700" />
              </Link>
              
              <button 
                onClick={() => setSelectedVideo("https://www.youtube.com/watch?v=zF9m02WllZc")}
                className="group flex items-center gap-4 text-white font-bold tracking-widest uppercase text-sm hover:text-amber-500 transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all">
                  <Play size={16} fill="currentColor" />
                </div>
                Watch Showreel
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Cinematic Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-amber-500/50">Scroll</span>
        </motion.div>
      </motion.section>

      {/* Showreel Transition Section */}
      <section className="relative py-24 bg-white dark:bg-neutral-950 border-y border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="container mx-auto px-6 overflow-hidden">
          <motion.div 
            className="flex gap-12 whitespace-nowrap"
            style={{ x: useTransform(springScrollY, [0, 1], [0, -1000]) }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-7xl md:text-9xl font-black text-neutral-100 dark:text-white/5 tracking-tighter uppercase transition-colors">
                Cinematic • Dynamic • Impactful • Professional • Creative •
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Me - Refined Cinematic Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-amber-500 font-black tracking-[0.4em] uppercase text-xs mb-4"
              >
                Expertise
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-neutral-950 dark:text-white leading-none tracking-tighter transition-colors"
              >
                THE ART OF <br /> <span className="text-neutral-300 dark:text-white/40 transition-colors">VISUAL STORYTELLING</span>
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
                  <div className="w-16 h-16 mb-8 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:border-amber-500 transition-colors">
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

      {/* Latest Projects Section */}
      <section className="py-32 bg-neutral-50 dark:bg-neutral-900/50 relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-neutral-950 dark:text-white tracking-tighter transition-colors">
              FEATURED <br /> <span className="text-amber-500">PROJECTS</span>
            </h2>
            <Link to="/portfolio" className="group flex items-center gap-3 text-neutral-400 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white transition-colors uppercase tracking-[0.3em] text-xs font-bold">
              View All <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <Videos />
        </div>
      </section>

      {/* Cinematic CTA */}
      <section className="relative py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-950/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop" 
            alt="VFX"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-12 leading-none">
              READY TO <br /> <span className="text-transparent bg-clip-text bg-neutral-950" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>GO VIRAL?</span>
            </h2>
            
            <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="inline-block"
            >
              <Link to="/contact" className="relative px-16 py-6 bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white font-black uppercase tracking-[0.4em] text-sm hover:bg-amber-500 dark:hover:bg-amber-500 transition-all shadow-2xl">
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
