import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Zap, Award } from 'lucide-react';
import { PROFILE, WHY_CHOOSE_ME } from '../../models/data';
import VideoModal from '../components/VideoModal';
import { useVideoController } from '../../controllers/useVideoController';
import Videos from './Videos';

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { filteredItems } = useVideoController();

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      text: "Transformed our videos from amateur to professional. Our engagement tripled!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "YouTube Channel Owner",
      text: "Best investment for my channel. The editing quality is outstanding.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "Brand Manager",
      text: "Delivers on time, every time. Consistent professional quality.",
      rating: 5
    }
  ];

  const services = [
    { icon: "🎬", title: "Video Editing", desc: "Professional cuts, transitions, effects" },
    { icon: "✨", title: "Color Grading", desc: "Cinematic color correction & grading" },
    { icon: "🔊", title: "Audio Mix", desc: "Clean audio, music integration" },
    { icon: "⚡", title: "Motion Graphics", desc: "Dynamic titles & animations" },
    { icon: "👀", title: "Visual FX", desc: "Professional effects & overlays" },
    { icon: "📱", title: "Multi-Format", desc: "YouTube, TikTok, Instagram ready" }
  ];

  return (
    <div className="overflow-hidden bg-black text-white">
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
      />

      {/* HERO - KILLER FIRST IMPRESSION */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-gradient-to-b from-neutral-900 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Dynamic background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl"
            animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-amber-700/15 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="container max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-sm font-bold uppercase tracking-wider mb-6">
              🎬 Professional Video Editing
            </span>

            <motion.h1
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Your Content
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500"
                animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Deserves Premium
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Elevate your videos with professional editing that impresses, engages, and converts your audience into loyal fans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-lg font-bold text-lg shadow-xl transition-all">
                  Get Started
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/portfolio" className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-lg font-bold text-lg backdrop-blur transition-all">
                  <Play size={20} className="fill-current" />
                  View Portfolio
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, staggerChildren: 0.1 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { num: "5+", label: "Years" },
                { num: "100+", label: "Projects" },
                { num: "80+", label: "Clients" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-black text-amber-400">{stat.num}</div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-center">
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">See my work</div>
            <svg className="w-6 h-6 mx-auto text-amber-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* FEATURED WORK - PORTFOLIO FIRST */}
      <motion.section
        className="py-32 bg-black border-y border-white/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Featured Work</h2>
            <p className="text-neutral-400 text-lg">Projects that showcase quality & precision</p>
          </motion.div>

          <Videos />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/portfolio" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-bold rounded-lg transition-all group">
              View All Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* SERVICES - WHAT I DO */}
      <motion.section
        className="py-32 bg-gradient-to-b from-black to-neutral-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">What I Offer</h2>
            <p className="text-neutral-400 text-lg">Complete video editing solutions</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-3 gap-6"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-neutral-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* WHY CHOOSE ME */}
      <motion.section
        className="py-32 bg-black relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/30 rounded-full blur-3xl"
          />
        </div>

        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why Choose Me</h2>
            <p className="text-neutral-400 text-lg">Professional quality that delivers results</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-3 gap-8"
          >
            {WHY_CHOOSE_ME.map((item, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-amber-500/50 backdrop-blur transition-all"
              >
                <motion.div
                  className="w-14 h-14 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 10 }}
                >
                  <item.icon size={28} />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        className="py-32 bg-gradient-to-b from-black to-neutral-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Client Love</h2>
            <p className="text-neutral-400 text-lg">What creators say about my work</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        className="py-32 bg-black relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-transparent to-amber-600/10"
            animate={{ backgroundPosition: ["0% center", "100% center"] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          />
        </div>

        <div className="container max-w-3xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Elevate?</h2>
            <p className="text-xl text-neutral-300 mb-10 leading-relaxed">
              Let's transform your raw footage into content that captivates and converts.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-lg font-black text-xl shadow-2xl transition-all">
                Start Your Project
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={24} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
