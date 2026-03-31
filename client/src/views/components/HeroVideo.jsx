import { motion } from 'framer-motion';

const HeroVideo = ({ videoUrl = "https://www.pexels.com/download/video/36355454/", className = "" }) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Fallback Background / Loading State */}
      <div className="absolute inset-0 bg-white dark:bg-neutral-950 transition-colors duration-700" />

      {/* Video Element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-700"
        style={{ filter: 'brightness(var(--hero-brightness, 0.7)) saturate(0.8) contrast(1.1)' }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* CSS Variables for Hero - defined here for simplicity or could be in index.css */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --hero-brightness: 0.8; }
        .dark { --hero-brightness: 0.3; }
      `}} />

      {/* Animated Overlays */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/40 dark:from-neutral-950/40 via-transparent to-white dark:to-neutral-950 transition-colors duration-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-white dark:from-neutral-950 via-transparent to-white dark:to-neutral-950 opacity-40 dark:opacity-60 transition-colors duration-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none transition-all duration-700" />

      {/* Animated Grid Lines - Subtler */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none transition-opacity duration-700">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-neutral-900 dark:bg-white" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-neutral-900 dark:bg-white" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-neutral-900 dark:bg-white" />
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-neutral-900 dark:bg-white" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-900 dark:bg-white" />
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-neutral-900 dark:bg-white" />
      </div>
    </div>

  );
};

export default HeroVideo;
