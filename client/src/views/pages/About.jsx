import React from 'react';
import { TOOLS, PROFILE } from '../../models/data';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
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
                src="../src/assests/IMG20231017214759.jpg"  
                alt="Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
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

        {/* Tools & Skills */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-10 text-center text-neutral-900 dark:text-white"
          >
            My Arsenal
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {TOOLS.map((tool) => (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl text-center hover:border-amber-500/50 transition-colors shadow-sm"
              >
                <h3 className="font-bold text-neutral-900 dark:text-white mb-2">{tool.name}</h3>
                <p className="text-sm text-neutral-500 uppercase tracking-wider">{tool.level}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
