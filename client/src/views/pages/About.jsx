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
          className="mb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">Experience</h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              origin="left"
              className="h-1 w-20 bg-gradient-to-r from-amber-500 to-amber-600 mt-4"
            />
          </motion.div>

          <div className="space-y-8">
            {/* Experience Item 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="group relative pl-8 border-l-2 border-neutral-300 dark:border-neutral-700 hover:border-amber-500 transition-colors"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-amber-500 border-4 border-neutral-50 dark:border-neutral-950"
              />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">5+ Years of Professional Editing</h3>
                <span className="inline-block w-fit px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-600 dark:text-amber-500 text-sm font-semibold">2019 - Present</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                Crafting premium video content for global clients. Specializing in storytelling through motion, color, and sound design.
              </p>
            </motion.div>

            {/* Experience Item 2 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group relative pl-8 border-l-2 border-neutral-300 dark:border-neutral-700 hover:border-amber-500 transition-colors"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-amber-500 border-4 border-neutral-50 dark:border-neutral-950"
              />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">100+ Projects Delivered</h3>
                <span className="inline-block w-fit px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-600 dark:text-amber-500 text-sm font-semibold">Verified Track Record</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                From Instagram reels to cinematic documentaries. Every project polished, every deadline met, every client satisfied.
              </p>
            </motion.div>

            {/* Experience Item 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="group relative pl-8 border-l-2 border-neutral-300 dark:border-neutral-700 hover:border-amber-500 transition-colors"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-amber-500 border-4 border-neutral-50 dark:border-neutral-950"
              />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">80+ Happy Clients</h3>
                <span className="inline-block w-fit px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-600 dark:text-amber-500 text-sm font-semibold">5-Star Rating</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                Building lasting relationships through exceptional work. Clients return because results speak louder than promises.
              </p>
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">Professional Arsenal</h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              origin="left"
              className="h-1 w-20 bg-gradient-to-r from-amber-500 to-amber-600 mt-4"
            />
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-lg">Industry-leading tools for industry-leading results</p>
          </motion.div>

          <div className="space-y-6">
            {/* After Effects */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="group relative pl-8 border-l-2 border-neutral-300 dark:border-neutral-700 hover:border-blue-500 transition-all overflow-hidden"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-blue-600 border-4 border-neutral-50 dark:border-neutral-950 flex items-center justify-center text-white font-bold text-xs"
              >
                Ae
              </motion.div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Adobe After Effects</h3>
                <span className="inline-block w-fit px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-semibold">Expert Level</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-3 text-lg">Motion Graphics • Visual Effects • Animations • Color Grading</p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                origin="left"
                className="h-0.5 w-full bg-gradient-to-r from-blue-500/50 to-transparent"
              />
            </motion.div>

            {/* Premiere Pro */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group relative pl-8 border-l-2 border-neutral-300 dark:border-neutral-700 hover:border-purple-500 transition-all overflow-hidden"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-purple-600 border-4 border-neutral-50 dark:border-neutral-950 flex items-center justify-center text-white font-bold text-xs"
              >
                Pr
              </motion.div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Adobe Premiere Pro</h3>
                <span className="inline-block w-fit px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold">Expert Level</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-3 text-lg">Professional Editing • Multi-Format • Sound Design • Workflow</p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                origin="left"
                className="h-0.5 w-full bg-gradient-to-r from-purple-500/50 to-transparent"
              />
            </motion.div>

            {/* CapCut */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="group relative pl-8 border-l-2 border-neutral-300 dark:border-neutral-700 hover:border-gray-500 transition-all overflow-hidden"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-gray-800 border-4 border-neutral-50 dark:border-neutral-950 flex items-center justify-center text-white text-lg"
              >
                ✂️
              </motion.div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">CapCut</h3>
                <span className="inline-block w-fit px-4 py-2 bg-gray-500/10 border border-gray-500/30 rounded-full text-gray-600 dark:text-gray-400 text-sm font-semibold">Expert Level</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-3 text-lg">Fast Turnaround • Social Media • Mobile Optimization • Trends</p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                origin="left"
                className="h-0.5 w-full bg-gradient-to-r from-gray-500/50 to-transparent"
              />
            </motion.div>

            {/* Additional Skills */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 pt-8 border-t-2 border-neutral-300 dark:border-neutral-700"
            >
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl font-bold text-neutral-900 dark:text-white mb-6"
              >
                Also Proficient In
              </motion.h3>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                className="grid md:grid-cols-2 gap-4"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 rounded-lg bg-neutral-100/50 dark:bg-neutral-900/30 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="text-amber-500 text-2xl">▸</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">DaVinci Resolve</span>
                  <span className="text-neutral-500 ml-auto text-sm">Color Grading</span>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 rounded-lg bg-neutral-100/50 dark:bg-neutral-900/30 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="text-amber-500 text-2xl">▸</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">Adobe Audition</span>
                  <span className="text-neutral-500 ml-auto text-sm">Audio Editing</span>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 rounded-lg bg-neutral-100/50 dark:bg-neutral-900/30 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="text-amber-500 text-2xl">▸</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">Photoshop</span>
                  <span className="text-neutral-500 ml-auto text-sm">Thumbnail Design</span>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 rounded-lg bg-neutral-100/50 dark:bg-neutral-900/30 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="text-amber-500 text-2xl">▸</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">Figma</span>
                  <span className="text-neutral-500 ml-auto text-sm">Collaboration</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default About;
