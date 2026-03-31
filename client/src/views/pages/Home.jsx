import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Award, Users, Sparkles } from 'lucide-react';
import { PROFILE, WHY_CHOOSE_ME } from '../../models/data';
import VideoModal from '../components/VideoModal';
import { usePortfolioController } from '../../controllers/usePortfolioController';
import { useVideoController } from '../../controllers/useVideoController';
import Videos from './Videos';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { filteredItems } = useVideoController()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="overflow-hidden bg-neutral-950">
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
      />

      {/* Hero Section - Ultra Premium */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Gradient background with multiple layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-amber-950/20 to-neutral-950" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(800px at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
                'radial-gradient(800px at 80% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
                'radial-gradient(800px at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        {/* Animated grid background */}
        <motion.svg
          className="absolute inset-0 w-full h-full opacity-5"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </motion.svg>

        {/* Floating animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-3xl opacity-20"
          animate={{ y: [0, 50, 0], x: [-20, 20, -20], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full blur-3xl opacity-15"
          animate={{ y: [0, -50, 0], x: [20, -20, 20], scale: [1, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        />

        <div className="container mx-auto relative z-10 text-center max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
          >
            {/* Badge with glow */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              className="flex justify-center mb-10"
            >
              <motion.div
                className="relative inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity" />
                <span className="relative inline-flex items-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 backdrop-blur-xl hover:border-amber-400 transition-all">
                  <Sparkles size={16} className="text-amber-400 animate-pulse" />
                  <span className="text-amber-400 text-xs font-bold tracking-wider">PROFESSIONAL VIDEO EDITING</span>
                </span>
              </motion.div>
            </motion.div>

            {/* Main Headline */}
            <div className="mb-8 overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]"
              >
                {/* Splitting text for character reveal */}
                <span className="block overflow-hidden">
                  {"CREATE".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { y: "100%" },
                        visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="block overflow-hidden mt-2">
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 inline-block"
                    animate={{
                      backgroundPosition: ["0% center", "100% center", "0% center"]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    {"CINEMATIC MAGIC".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        variants={{
                          hidden: { y: "100%" },
                          visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 + (i * 0.05) } }
                        }}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                </span>
              </motion.h1>
            </div>

            {/* Description with better styling */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 bg-clip-text text-transparent mb-14 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Transform raw footage into visually stunning content that captivates millions and drives engagement.
            </motion.p>

            {/* CTA Buttons - Premium Style */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <Link to="/contact" className="relative px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-black rounded-full transition-all flex items-center justify-center gap-3 shadow-2xl text-lg">
                  Start Creating
                  <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={22} />
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.08, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/portfolio" className="px-12 py-5 bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white font-bold rounded-full transition-all flex items-center justify-center gap-3 text-lg backdrop-blur-xl group">
                  <Play size={22} className="fill-current" />
                  View Portfolio
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats with glass effect */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 1 }
                }
              }}
              className="grid grid-cols-3 gap-6 pt-16 border-t border-white/5"
            >
              {[
                { value: "5+", label: "Years", icon: "🎬" },
                { value: "100+", label: "Projects", icon: "⭐" },
                { value: "80+", label: "Clients", icon: "🚀" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                  }}
                  className="group relative p-6 rounded-2xl glass-card overflow-hidden"
                  whileHover={{ y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/10 group-hover:from-amber-500/20 group-hover:to-amber-500/5 rounded-2xl transition-all duration-500" />
                  <div className="relative z-10">
                    <motion.div 
                      className="text-4xl mb-2 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <p className="text-neutral-400 font-bold tracking-widest text-[10px] uppercase">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        {/* <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-4 text-amber-400/80">
            <span className="text-xs font-bold uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </div>
        </motion.div> */}
      </motion.section>

      {/* Why Choose Me - Premium Glass Design */}
      <motion.section
        className="py-28 bg-gradient-to-b from-neutral-950 to-neutral-900 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(1200px at 0% 0%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
                'radial-gradient(1200px at 100% 100%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
                'radial-gradient(1200px at 0% 0%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.div className="inline-block mb-6">
              <span className="px-5 py-2 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
                Why Work With Me
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: 0.2 }}
            >
              Expertise That <motion.span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500" animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }} transition={{ duration: 6, repeat: Infinity }} style={{ backgroundSize: "200% 200%" }}>Transforms</motion.span>
            </motion.h2>
            <motion.p
              className="text-base text-neutral-300 max-w-2xl mx-auto"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              transition={{ delay: 0.4 }}
            >
              Professional quality, innovative effects, and creative storytelling combined.
            </motion.p>
          </motion.div>

          {/* Features Grid with glass morphism */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {WHY_CHOOSE_ME.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-amber-500/50 backdrop-blur-2xl transition-all overflow-hidden"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/20 group-hover:to-orange-500/10 rounded-2xl transition-all"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Icon with animation */}
                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 flex items-center justify-center text-amber-300 mb-6 relative z-10 border border-amber-500/50"
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <item.icon size={32} />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{item.title}</h3>
                <p className="text-neutral-300 leading-relaxed relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Work Section */}
      <motion.section
        className="py-28 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            animate={{
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(800px_at_50%_50%,rgba(251,191,36,0.1),transparent)]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-end mb-20"
          >
            <div>
              <motion.div className="inline-block mb-5">
                <span className="px-5 py-2 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
                  Featured Work
                </span>
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl font-black text-white mb-3"
              >
                Latest Projects
              </motion.h2>
              <motion.p
                className="text-neutral-400 text-sm"
              >
                Showcasing exceptional creative work
              </motion.p>
            </div>
            <Link to="/portfolio" className="hidden lg:flex items-center gap-3 text-amber-400 font-bold hover:text-amber-300 transition-colors group text-lg">
              View All
              <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={20} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Videos Grid */}
          <Videos />

          {/* Mobile CTA */}
          <motion.div
            className="mt-16 text-center lg:hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-amber-400 font-bold hover:text-amber-300 transition-colors text-lg group">
              View All Portfolio
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section - Ultra Premium */}
      <motion.section
        className="py-36 relative overflow-hidden"
      >
        {/* Animated gradient layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(1500px at 20% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)',
                'radial-gradient(1500px at 80% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
                'radial-gradient(1500px at 20% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Floating animated elements */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-amber-500/30 to-orange-500/20 rounded-full blur-3xl"
          animate={{ y: [0, 60, 0], x: [-30, 30, -30] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-600/25 to-orange-500/15 rounded-full blur-3xl"
          animate={{ y: [0, -60, 0], x: [30, -30, 30] }}
          transition={{ duration: 14, repeat: Infinity, delay: 1 }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, type: "spring" }}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight"
            >
              Ready to <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-400"
                animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Elevate Your Content?
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-sm md:text-base text-neutral-300 mb-14 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Transform your vision into reality. Let's create content that resonates, engages, and converts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-block"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <Link to="/contact" className="relative inline-flex items-center gap-4 px-12 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-black rounded-full text-lg shadow-2xl transition-all">
                Let's Get Started
                <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={24} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
