import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePortfolioController } from '../../controllers/usePortfolioController';
import VideoModal from '../components/VideoModal';

const Portfolio = () => {
  const { activeCategory, setActiveCategory, categories, filteredItems, loading } = usePortfolioController();
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen py-20 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-600 dark:text-neutral-400">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 relative">
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo}
      />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Selected Works</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
            A curated collection of my best edits across various niches.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 border ${activeCategory === category
                ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-white/5 text-neutral-400 border-white/10 hover:border-amber-500/50 hover:text-amber-500 hover:bg-amber-500/5'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={item._id || item.id}
                onClick={() => setSelectedVideo(item)}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 aspect-video cursor-pointer shadow-2xl border border-white/5 hover:border-amber-500/30 transition-all duration-500 video-hover"
              >
                <img
                  loading="lazy" decoding="async"
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100 group-hover:rotate-1"
                />

                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                  <motion.span
                    className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 w-fit backdrop-blur-md"
                  >
                    {item.category}
                  </motion.span>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tighter leading-none group-hover:text-amber-400 transition-colors">{item.title}</h3>
                  <p className="text-neutral-400 text-sm line-clamp-2 mb-6 font-medium tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 text-white font-bold text-xs uppercase tracking-widest">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                    >
                      <Play size={18} className="fill-current ml-1" />
                    </motion.div>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">View Masterpiece</span>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-amber-500/0 group-hover:border-amber-500/50 transition-all duration-700" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/50 transition-all duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-neutral-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
