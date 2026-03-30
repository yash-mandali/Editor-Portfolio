import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Gift, Coffee } from 'lucide-react';
import { PROFILE, WHY_CHOOSE_ME } from '../../models/data';
import VideoModal from '../components/VideoModal';
import { usePortfolioController } from '../../controllers/usePortfolioController';
import { useVideoController } from '../../controllers/useVideoController';
import Videos from './Videos';

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { filteredItems } = useVideoController()

  return (
    <div className="overflow-hidden bg-neutral-950 text-white">
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
      />

      {/* Hero - Simple & Clean */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-neutral-900 to-neutral-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Subtle background glow */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          animate={{ opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-600/20 to-transparent rounded-full blur-3xl" />
        </motion.div>

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
              Professional Video Editing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
          >
            Your Videos Deserve <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
              animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Professional Polish
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Expert video editing that transforms raw footage into captivating content that engages your audience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-lg font-bold transition-all shadow-lg">
                Get Started
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/portfolio" className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg font-bold transition-all">
                <Play size={18} className="fill-current" />
                View Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Simple Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10"
          >
            {[
              { number: "5+", text: "Years" },
              { number: "100+", text: "Projects" },
              { number: "80+", text: "Clients" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-amber-400 mb-1">{item.number}</div>
                <div className="text-sm text-neutral-400">{item.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-center">
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Scroll down</div>
            <div className="w-6 h-10 border border-neutral-500 rounded-full flex items-start justify-center p-2">
              <motion.div className="w-1 h-2 bg-amber-400 rounded-full" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Why Choose Section - Simple Cards */}
      <motion.section
        className="py-20 bg-neutral-950 border-y border-white/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-3">Why Work With Me</h2>
            <p className="text-neutral-400">Professional quality that sets your content apart</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-3 gap-6"
          >
            {WHY_CHOOSE_ME.map((item, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 hover:border-amber-500/30 transition-all group"
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring" }}
                >
                  <item.icon size={24} />
                </motion.div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <motion.section
        className="py-20 bg-gradient-to-b from-neutral-950 to-neutral-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 flex justify-between items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">Recent Work</h2>
              <p className="text-neutral-400">Projects that showcase quality</p>
            </div>
            <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold transition-colors group">
              View All
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <Videos />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 md:hidden"
          >
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold">
              View All Portfolio
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section - Clean */}
      <motion.section
        className="py-20 bg-neutral-900 border-t border-white/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-4"
          >
            Ready to Transform Your Videos?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-300 mb-8 leading-relaxed"
          >
            Let's collaborate to create content that engages, converts, and leaves a lasting impression on your audience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-lg font-bold text-lg shadow-lg transition-all group">
              Let's Get Started
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
