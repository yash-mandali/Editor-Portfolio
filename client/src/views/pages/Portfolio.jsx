import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePortfolioController } from '../../controllers/usePortfolioController';
import VideoModal from '../components/VideoModal';

const Portfolio = () => {
  const { activeCategory, setActiveCategory, categories, filteredItems, loading } = usePortfolioController();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAll, setShowAll] = useState(false);

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
            {filteredItems.slice(0, showAll ? filteredItems.length : 6).map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                key={item._id || item.id}
                className="group flex flex-col"
              >
                <motion.div
                  whileHover={{
                    rotateX: -10,
                    rotateY: 10,
                    z: 50,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  onClick={() => setSelectedVideo(item)}
                  className="relative aspect-video cursor-pointer overflow-hidden bg-neutral-900 border border-white/5 hover:border-cyan-400/40 transition-all duration-700 mb-6"
                >
                  <img
                    loading="lazy"
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90 transition-opacity"
                  />

                  {/* Cinematic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                  {/* Play Icon Center */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                    <div
                      style={{ transform: "translateZ(80px)" }}
                      className="w-14 h-14 rounded-full border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center text-cyan-400 backdrop-blur-sm"
                    >
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>

                  {/* Aesthetic Accents */}
                  <div className="absolute top-4 left-4 w-6 h-[1px] bg-white/20 group-hover:bg-cyan-400/50 transition-colors" />
                  <div className="absolute top-4 left-4 w-[1px] h-6 bg-white/20 group-hover:bg-cyan-400/50 transition-colors" />
                </motion.div>

                {/* Content Below */}
                <div className="px-2">
                  <div className="overflow-hidden mb-2">
                    <motion.span
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      className="inline-block text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                      {item.category}
                    </motion.span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tighter leading-none group-hover:text-cyan-400 transition-colors duration-500 uppercase">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">View Project</span>
                    <div className="w-4 h-[1px] bg-white/30 group-hover:bg-cyan-400 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {!showAll && filteredItems.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-20"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group relative px-12 py-5 bg-transparent border border-white/10 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-400/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 group-hover:text-white transition-colors">
                View All Projects
              </span>
              <div className="absolute top-0 left-0 w-2 h-[1px] bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 left-0 w-[1px] h-2 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        )}

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
