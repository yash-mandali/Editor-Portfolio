import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../../models/data';
import { Link } from 'react-router-dom';
import logo from '../../assests/logo-file.png';
import logoGif from '../../assests/logo GIF.gif';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Intro */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-xl">
              <img
                src={logoGif}
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Behind the Timeline</h1>
            <h2 className="text-2xl text-amber-600 dark:text-amber-500 font-semibold mb-6">{PROFILE.tagline}</h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8">
              <p>
                Hello! I'm {PROFILE.name}, a professional video editor with a passion for storytelling.
                I don't just assemble clips; I craft narratives that evoke emotion and drive action.
              </p>
              <p>
                With years of experience working with brands, influencers, and filmmakers, I understand
                the nuances of pacing, rhythm, and visual aesthetics. My goal is to make your content
                look premium, polished, and professional.
              </p>
              <p>
                I work exclusively on paid projects because I believe in delivering value that is worth
                investing in. Whether it's a high-energy reel or a cinematic documentary, I bring the
                same level of dedication to every frame.
              </p>
            </div>
            <Link to="/contact" className="inline-block px-8 py-3 border border-amber-500 text-amber-600 dark:text-amber-500 font-bold rounded-full hover:bg-amber-500 hover:text-black transition-all">
              Work With Me
            </Link>
          </motion.div>
        </div>

        {/* Experience Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white text-center">Experience & Expertise</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Years of Experience */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 dark:border-amber-500/30 hover:border-amber-500/50 transition-all"
            >
              <div className="text-5xl font-bold text-amber-600 dark:text-amber-500 mb-3">5+</div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Years Experience</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Professional video editing with a proven track record of delivering premium content for global clients.</p>
            </motion.div>

            {/* Projects Completed */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 dark:border-amber-500/30 hover:border-amber-500/50 transition-all"
            >
              <div className="text-5xl font-bold text-amber-600 dark:text-amber-500 mb-3">100+</div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Projects Completed</h3>
              <p className="text-neutral-600 dark:text-neutral-400">From Instagram reels to full-length documentaries, I've delivered hundreds of projects with consistent excellence.</p>
            </motion.div>

            {/* Satisfied Clients */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 dark:border-amber-500/30 hover:border-amber-500/50 transition-all"
            >
              <div className="text-5xl font-bold text-amber-600 dark:text-amber-500 mb-3">80+</div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Happy Clients</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Building relationships through exceptional work and delivering results that exceed expectations every time.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Tools & Software Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Professional Tools</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
              I leverage industry-leading software to bring your vision to life with precision and creativity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Adobe After Effects */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/50 transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-6xl font-black text-white mb-2" style={{ fontFamily: 'Impact' }}>Ae</div>
                  <p className="text-white/80 text-sm font-semibold">After Effects</p>
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">After Effects</h3>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Motion Graphics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Visual Effects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Animations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Color Grading
                  </li>
                </ul>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            </motion.div>

            {/* Adobe Premiere Pro */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/50 transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-700 to-pink-700 flex items-center justify-center overflow-hidden">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-6xl font-black text-white mb-2" style={{ fontFamily: 'Impact' }}>Pr</div>
                  <p className="text-white/80 text-sm font-semibold">Premiere Pro</p>
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Premiere Pro</h3>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Professional Editing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Multi-Format Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Sound Design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Workflow Optimization
                  </li>
                </ul>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            </motion.div>

            {/* CapCut */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/50 transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center overflow-hidden">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-5xl mb-2">✂️</div>
                  <p className="text-white font-semibold">CapCut</p>
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">CapCut</h3>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Quick Turnaround
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Social Media Format
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Mobile Optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Trending Effects
                  </li>
                </ul>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            </motion.div>
          </div>

          {/* Additional Tools */}
          <motion.div
            variants={itemVariants}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-neutral-500/5 to-amber-500/10 border border-amber-500/20 dark:border-amber-500/30"
          >
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">Also Proficient In</h3>
            <div className="grid md:grid-cols-2 gap-4 text-neutral-600 dark:text-neutral-400">
              <div className="flex gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>DaVinci Resolve (Color Grading)</span>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>Adobe Audition (Audio Editing)</span>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>Photoshop (Thumbnail Design)</span>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>Figma (Collaboration)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>


      </div>
    </div>
  );
};

export default About;
