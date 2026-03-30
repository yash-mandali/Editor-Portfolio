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

        {/* Stats Section - Ultra Professional */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-32 py-20"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { number: "5+", label: "Years Experience", desc: "Crafting premium content" },
              { number: "100+", label: "Projects Delivered", desc: "100% Client Satisfaction" },
              { number: "80+", label: "Happy Clients", desc: "Industry Leaders Trust Me" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-amber-500/0 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 border border-amber-500/30 hover:border-amber-500/60 transition-all">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.15 + 0.2, type: "spring" }}
                    className="text-5xl md:text-6xl font-black text-amber-500 mb-4"
                  >
                    {stat.number}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
                  <p className="text-amber-500/70">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Tools - Ultra Visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-8"
            />
            <h2 className="text-5xl md:text-6xl font-black text-neutral-900 dark:text-white mb-4">
              My Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Arsenal</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xl max-w-2xl mx-auto">Industry-leading tools wielded by a master craftsman to transform your vision into reality</p>
          </motion.div>

          {/* Main Tools Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* After Effects */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/30 group-hover:border-blue-500/60 transition-all p-8">
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="mb-6 h-24 flex items-center justify-center"
                >
                  <div className="text-7xl font-black text-blue-500" style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}>Ae</div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">After Effects</h3>
                <p className="text-neutral-300 mb-6 leading-relaxed">Master of motion graphics, visual effects, and cinematic animations that bring stories to life.</p>
                <div className="space-y-2">
                  {["Motion Graphics", "VFX Compositing", "Color Grading"].map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-2 text-blue-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Premiere Pro */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 group-hover:border-purple-500/60 transition-all p-8">
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="mb-6 h-24 flex items-center justify-center"
                >
                  <div className="text-7xl font-black text-purple-500" style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}>Pr</div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Premiere Pro</h3>
                <p className="text-neutral-300 mb-6 leading-relaxed">Professional editing powerhouse for every format, from shorts to full-length cinematic productions.</p>
                <div className="space-y-2">
                  {["Professional Editing", "Multi-Format Support", "Sound Design"].map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-2 text-purple-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CapCut */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-orange-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 group-hover:border-amber-500/60 transition-all p-8">
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="mb-6 h-24 flex items-center justify-center"
                >
                  <div className="text-6xl" style={{ textShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}>✂️</div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">CapCut</h3>
                <p className="text-neutral-300 mb-6 leading-relaxed">Lightning-fast social media editing that captures trends, goes viral, and converts viewers to clients.</p>
                <div className="space-y-2">
                  {["Rapid Turnaround", "Social Optimization", "Trending Effects"].map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-2 text-amber-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Professional Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 p-12 rounded-3xl bg-gradient-to-r from-neutral-900/50 via-amber-500/10 to-neutral-900/50 border border-amber-500/20 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Also Master</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { tool: "DaVinci Resolve", specialty: "Color Grading", icon: "🎨" },
                { tool: "Adobe Audition", specialty: "Audio Design", icon: "🎧" },
                { tool: "Photoshop", specialty: "Thumbnails", icon: "🖼️" },
                { tool: "Figma", specialty: "Collaboration", icon: "✨" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.08 }}
                  className="p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 hover:border-amber-500/50 transition-all text-center group cursor-pointer"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="font-bold text-white mb-1">{item.tool}</h4>
                  <p className="text-amber-500/70 text-sm">{item.specialty}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Call To Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center py-20"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-12"
          />
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-6">Ready to Elevate Your Content?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-xl mb-8 max-w-2xl mx-auto">Let's transform your footage into a masterpiece that captivates, engages, and converts.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="inline-block px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-full text-lg shadow-lg shadow-amber-500/30 transition-all">
              Start Your Project Now
            </Link>
          </motion.div>
        </motion.div>


      </div>
    </div>
  );
};

export default About;
