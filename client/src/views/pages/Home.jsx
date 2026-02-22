import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { PROFILE, WHY_CHOOSE_ME } from '../../models/data';
import VideoModal from '../components/VideoModal';
import { usePortfolioController } from '../../controllers/usePortfolioController';
import { useVideoController } from '../../controllers/useVideoController';
import Videos from './Videos';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { filteredItems } = useVideoController()

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="overflow-hidden">
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
      />

      {/* Hero Section */}
      <AnimatedSection className="relative min-h-[90vh] flex items-center justify-center px-6">
        {/* Background Gradients - Adaptive */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-200/50 via-neutral-50 to-neutral-50 dark:from-neutral-800/20 dark:via-neutral-950 dark:to-neutral-950 z-0 transition-colors duration-500" />
        <div className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1699025726754-8da11fa3fb58?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-5 dark:opacity-10 z-0 mix-blend-overlay" />

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 text-sm font-semibold tracking-wide mb-6"
            >
              PREMIUM VIDEO EDITING
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight"
            >
              Transforming Footage Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-600">Masterpieces</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {PROFILE.description}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-full transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/20">
                Start Your Project
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/portfolio" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2">
                <Play size={18} className="fill-current" />
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Why Choose Me */}
      <AnimatedSection className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Why Creators Choose Me</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">I deliver more than just cuts. I deliver engagement, retention, and quality.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {WHY_CHOOSE_ME.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Featured Work Preview */}
      <AnimatedSection className="py-24 bg-neutral-100/50 dark:bg-neutral-900/30 border-y border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-neutral-900 dark:text-white">Featured Projects</h2>
              <p className="text-neutral-600 dark:text-neutral-400">A glimpse into my recent edits.</p>
            </motion.div>
            <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
              View All Work <ArrowRight size={16} />
            </Link>
          </div>
          <Videos></Videos>

          {/* <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedVideo(item)}
                className="group relative aspect-video rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 cursor-pointer shadow-lg"
              >
                <img loading="lazy" decoding="async" src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4">
                  <span className="text-amber-500 text-xs font-bold tracking-wider uppercase mb-2">{item.category}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg shadow-amber-500/20">
                    <Play size={20} className="fill-current ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div> */}

          <div className="mt-8 text-center md:hidden">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium">
              View All Work <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 relative overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-300">
        <div className="absolute inset-0 bg-amber-500/5" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="container mx-auto px-6 relative z-10 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Ready to elevate your content?</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
            Join the list of creators and brands who trust me with their vision.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xl">
              Get a Chance
            </Link>
          </motion.div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
};

export default Home;
