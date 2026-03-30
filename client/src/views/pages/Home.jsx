import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Award, Users } from 'lucide-react';
import { PROFILE, WHY_CHOOSE_ME } from '../../models/data';
import VideoModal from '../components/VideoModal';
import { usePortfolioController } from '../../controllers/usePortfolioController';
import { useVideoController } from '../../controllers/useVideoController';
import Videos from './Videos';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { filteredItems } = useVideoController()

  // Text reveal animation
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Container for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="overflow-hidden">
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
      />

      {/* Hero Section - Ultra Animated */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-gradient-to-b from-neutral-50 via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto relative z-10 text-center max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-500/10 border border-amber-500/30 backdrop-blur-sm"
              >
                <Zap size={16} className="text-amber-600 dark:text-amber-500" />
                <span className="text-amber-700 dark:text-amber-400 text-sm font-bold tracking-wide">PREMIUM VIDEO EDITING</span>
              </motion.span>
            </motion.div>

            {/* Main Headline with char animation */}
            <div className="mb-8 overflow-hidden">
              <motion.h1
                className="text-4xl md:text-7xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                Crafting <br />
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 dark:from-amber-400 dark:via-amber-500 dark:to-amber-600"
                  animate={{
                    backgroundPosition: ["0% center", "100% center", "0% center"]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Cinematic Excellence
                </motion.span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Elevate your content with professional editing that captivates, engages, and converts viewers into loyal fans.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-full transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-500/30 group text-lg">
                  Start Your Project
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/portfolio" className="px-10 py-4 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-bold rounded-full transition-all flex items-center justify-center gap-3 text-lg group">
                  <Play size={20} className="fill-current" />
                  View Portfolio
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-3 gap-8 pt-12 border-t border-neutral-200 dark:border-neutral-800"
            >
              {[
                { value: "5+", label: "Years Experience" },
                { value: "100+", label: "Projects Delivered" },
                { value: "80+", label: "Happy Clients" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="text-center"
                >
                  <motion.div className="text-4xl md:text-5xl font-black text-amber-600 dark:text-amber-500 mb-2">
                    {stat.value}
                  </motion.div>
                  <p className="text-neutral-600 dark:text-neutral-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <span className="text-xs font-semibold uppercase">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </motion.section>

      {/* Why Choose Me - Enhanced */}
      <motion.section
        className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-300 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-widest mb-3"
            >
              Why Choose Me
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Expertise That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Delivers Results</span>
            </motion.h2>
            <motion.p
              className="text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Engagement, retention, and professional quality that makes your content stand out.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {WHY_CHOOSE_ME.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-10 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 dark:from-neutral-900/50 dark:to-neutral-900/20 border border-neutral-200/50 dark:border-neutral-800/50 hover:border-amber-500/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/5 group-hover:from-amber-500/10 group-hover:to-amber-500/5 transition-all" />

                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-6 relative z-10"
                >
                  <item.icon size={28} />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white relative z-10">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Work - Enhanced */}
      <motion.section
        className="py-32 bg-gradient-to-b from-neutral-100/50 to-neutral-50 dark:from-neutral-900/50 dark:to-neutral-950 border-y border-neutral-200 dark:border-neutral-900 transition-colors duration-300 relative overflow-hidden"
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-widest mb-3"
              >
                Featured Projects
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white mb-2"
              >
                Latest Work
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-neutral-600 dark:text-neutral-400 text-base"
              >
                Showcasing my best recent projects
              </motion.p>
            </div>
            <Link to="/portfolio" className="hidden lg:flex items-center gap-2 text-amber-600 dark:text-amber-500 font-bold hover:text-amber-700 dark:hover:text-amber-400 transition-colors group">
              View All
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
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
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-500 font-bold hover:text-amber-700 dark:hover:text-amber-400 transition-colors text-lg group">
              View All Portfolio
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section - Enhanced */}
      <motion.section
        className="py-32 relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-900 dark:to-black"
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2260%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23fbbf24%27 fill-opacity=%270.05%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ready to Create <br className="hidden md:block" />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500"
                animate={{
                  backgroundPosition: ["0% center", "100% center", "0% center"]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Something Amazing?
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join creators and brands transforming their content. Let's bring your vision to life with professional editing that drives real impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold rounded-full text-lg shadow-2xl shadow-amber-500/40 transition-all group">
                Get Started Now
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
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
