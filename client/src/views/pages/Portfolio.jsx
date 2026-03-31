import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Filter } from 'lucide-react';
import { usePortfolioController } from '../../controllers/usePortfolioController';
import VideoModal from '../components/VideoModal';

const Portfolio = () => {
  const { activeCategory, setActiveCategory, categories, filteredItems, loading } = usePortfolioController();
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen py-20 bg-[#0a0a0f] flex items-center justify-center transition-colors duration-500">
        <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 bg-[#0a0a0f] transition-colors duration-500 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-6 transition-colors"
          >
            Archive
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-[5.5rem] font-black mb-8 text-white tracking-tighter transition-colors"
          >
            SELECTED <span className="text-[#2e2e42]">WORKS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg font-light tracking-wide transition-colors"
          >
            A curated gallery of high-impact visual storytelling and professional post-production.
          </motion.p>
        </div>

        {/* Filter Controls - Dashboard Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-24"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border ${activeCategory === category
                ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_30px_rgba(0,212,255,0.3)]'
                : 'bg-white/5 text-neutral-400 border-white/5 hover:border-cyan-400/50 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                key={item._id || item.id}
                onClick={() => setSelectedVideo(item)}
                className="group relative aspect-video cursor-pointer overflow-hidden bg-neutral-900 border border-white/5 hover:border-cyan-400/40 transition-all duration-700"
              >
                <img
                  loading="lazy"
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90 transition-opacity"
                />

                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="overflow-hidden mb-2">
                    <motion.span
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      className="inline-block text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                      {item.category}
                    </motion.span>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6 tracking-tighter leading-none group-hover:translate-x-2 transition-all duration-500">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400 transition-all">
                      <Play size={14} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white transition-colors">Project View</span>
                  </div>
                </div>

                {/* Aesthetic Accents */}
                <div className="absolute top-6 left-6 w-8 h-[1px] bg-white/20 group-hover:bg-cyan-400/50 transition-colors" />
                <div className="absolute top-6 left-6 w-[1px] h-8 bg-white/20 group-hover:bg-cyan-400/50 transition-colors" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 border border-dashed border-white/10"
          >
            <p className="text-neutral-500 font-black uppercase tracking-[0.4em] text-xs transition-colors">
              No Entries Found
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
