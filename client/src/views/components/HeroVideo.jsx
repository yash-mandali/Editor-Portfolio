import { motion } from 'framer-motion';

const HeroVideo = ({ videoUrl = "https://www.pexels.com/download/video/36355454/", className = "" }) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Dark fallback */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Video */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.04]"
        style={{ filter: 'brightness(0.28) saturate(0.7) contrast(1.15)' }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Bottom gradient — fades into page bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/30 via-transparent to-[#0a0a0f]" />

      {/* Side vignettes */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/60" />

      {/* Cyan tint layer — subtle brand colour wash */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
        {[25, 50, 75].map(p => (
          <div key={p} className="absolute top-0 h-full w-[1px] bg-[#00d4ff]" style={{ left: `${p}%` }} />
        ))}
        {[25, 50, 75].map(p => (
          <div key={p} className="absolute left-0 w-full h-[1px] bg-[#00d4ff]" style={{ top: `${p}%` }} />
        ))}
      </div>

      {/* Animated horizontal scan line */}
      <motion.div
        className="absolute left-0 w-full h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default HeroVideo;
