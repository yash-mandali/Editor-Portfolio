import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { useVideoController } from '../../controllers/useVideoController';
import VideoModal from '../components/VideoModal';

const Videos = () => {
    const { filteredItems, loading } = useVideoController();
    const [selectedVideo, setSelectedVideo] = useState(null);

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center py-20">
                <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                video={selectedVideo}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item._id || item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group flex flex-col"
                        >
                            <div
                                onClick={() => setSelectedVideo(item)}
                                className="relative aspect-video cursor-pointer overflow-hidden bg-neutral-900 border border-white/5 hover:border-cyan-400/40 transition-all duration-700 shadow-2xl mb-6"
                            >
                                <img
                                    loading="lazy"
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-90 transition-opacity"
                                />

                                {/* Cinematic Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />

                                {/* Play Icon Center */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                                    <div className="w-14 h-14 rounded-full border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center text-cyan-400 backdrop-blur-sm">
                                        <Play size={20} fill="currentColor" />
                                    </div>
                                </div>

                                {/* Stylistic Viewfinder Lines */}
                                <div className="absolute inset-4 border border-white/5 group-hover:border-cyan-400/20 transition-colors pointer-events-none" />
                            </div>

                            {/* Content Below */}
                            <div className="px-2">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-cyan-400 text-[8px] font-black uppercase tracking-[0.4em]">
                                        {item.category}
                                    </span>
                                    <span className="text-[8px] font-black tracking-[0.2em] text-white/20 uppercase">
                                        REF-{(index + 1).toString().padStart(3, '0')}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-white mb-4 tracking-tighter leading-none group-hover:text-cyan-400 transition-all duration-500 uppercase">
                                    {item.title}
                                </h3>

                                <div className="flex items-center gap-4 text-white/50 text-[8px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-all duration-500">
                                    <Play size={10} fill="currentColor" />
                                    <span>Initiate Playback</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-20 text-neutral-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                    No Content Found
                </div>
            )}
        </div>
    );
};

export default Videos;
