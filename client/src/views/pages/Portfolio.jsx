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
    <div className="min-h-screen py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
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
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800'
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
                transition={{ duration: 0.3 }}
                key={item._id || item.id}
                onClick={() => setSelectedVideo(item)}
                className="group relative rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-900 aspect-video cursor-pointer shadow-lg"
              >
                <img
                  loading="lazy" decoding="async"
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-neutral-300 text-sm line-clamp-2 mb-4">{item.description}</p>
                  <div className="flex items-center gap-2 text-white font-medium text-sm">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black">
                      <Play size={12} className="fill-current ml-0.5" />
                    </div>
                    Watch Video
                  </div>
                </div>
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
