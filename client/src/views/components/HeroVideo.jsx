const HeroVideo = ({ videoUrl = "https://www.pexels.com/download/video/36355454/", className = "" }) => (
  <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
    {/* Dark fallback shown while video loads */}
    <div className="absolute inset-0 bg-[#0a0a0f]" />

    {/* Video — preload=none defers download until browser is idle */}
    <video
      autoPlay loop muted playsInline preload="none"
      className="absolute inset-0 w-full h-full object-cover scale-[1.04]"
      style={{ filter: 'brightness(0.28) saturate(0.7) contrast(1.15)', willChange: 'transform' }}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>

    {/* Overlays — pure CSS, no JS/framer overhead */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/30 via-transparent to-[#0a0a0f]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/60" />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />

    {/* Grid lines */}
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
      {[25, 50, 75].map(p => (
        <div key={`v${p}`} className="absolute top-0 h-full w-[1px] bg-[#00d4ff]" style={{ left: `${p}%` }} />
      ))}
      {[25, 50, 75].map(p => (
        <div key={`h${p}`} className="absolute left-0 w-full h-[1px] bg-[#00d4ff]" style={{ top: `${p}%` }} />
      ))}
    </div>

    {/* Scan line — CSS animation, no JS */}
    <div className="hero-scan-line" />
  </div>
);

export default HeroVideo;
