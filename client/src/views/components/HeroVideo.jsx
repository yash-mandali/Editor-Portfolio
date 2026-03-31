import { motion } from 'framer-motion';

const HeroVideo = ({ videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-city-lights-at-night-reflected-in-a-river-4435-large.mp4", className = "" }) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Fallback Background / Loading State */}
      <div className="absolute inset-0 bg-neutral-950" />

      {/* Video Element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        style={{ filter: 'brightness(0.3) saturate(0.8) contrast(1.2)' }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Animated Overlays */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none" />

      {/* Animated Grid Lines - Subtler */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white" />
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-white" />
      </div>
    </div>
  );
};

export default HeroVideo;
