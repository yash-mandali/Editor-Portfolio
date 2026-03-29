import React from 'react';
import { motion } from 'framer-motion';
import { TOOLS, PROFILE, EXPERIENCE, WORKING_TOOLS } from '../../models/data';
import { Link } from 'react-router-dom';
import logo from '../../assests/logo-file.png';
import About3D from '../components/About3D';

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
      <About3D />
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white"
            >
              Professional Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
            >
              Years of crafting visual stories and pushing creative boundaries in the world of video production
            </motion.p>
          </div>

          <div className="space-y-8">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-start gap-8 p-8 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {exp.year.split(' ')[0]}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-amber-600 dark:text-amber-500 font-semibold text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-semibold">
                        {exp.year}
                      </span>
                    </div>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-3">
                    {exp.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (i * 0.1) }}
                        className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Working Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white"
            >
              Professional Toolkit
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
            >
              Industry-leading software and tools I use to create cinematic masterpieces
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {WORKING_TOOLS.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {tool.icon}
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${tool.color} text-white text-xs font-bold rounded-full`}>
                        {tool.proficiency}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Animated border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Working Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center text-neutral-900 dark:text-white"
          >
            My Creative Arsenal
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {WORKING_TOOLS.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                className={`relative group overflow-hidden bg-gradient-to-br ${tool.color} p-8 rounded-2xl text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-white/5 transform rotate-12 scale-150"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-5xl mr-4 transform group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{tool.name}</h3>
                      <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {tool.proficiency}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/90 leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  {/* Proficiency indicator */}
                  <div className="flex items-center">
                    <div className="flex-1 bg-white/20 rounded-full h-2 mr-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: tool.proficiency === 'Expert' ? '95%' : tool.proficiency === 'Advanced' ? '85%' : '75%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="bg-white h-2 rounded-full"
                      ></motion.div>
                    </div>
                    <span className="text-sm font-medium">
                      {tool.proficiency === 'Expert' ? '95%' : tool.proficiency === 'Advanced' ? '85%' : '75%'}
                    </span>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Animated border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 via-white to-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
