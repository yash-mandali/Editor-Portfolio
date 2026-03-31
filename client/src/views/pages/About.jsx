import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE, TOOLS, EXPERIENCE, WORKING_TOOLS } from '../../models/data';
import { Link } from 'react-router-dom';
import { ArrowRight, Disc, Terminal, Zap, Shield, Sparkles, Briefcase, CheckCircle2 } from 'lucide-react';
import logoGif from '../../assests/logo GIF.gif';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500 relative overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-orange-600/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-48">
        {/* Intro - Cinematic Split Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-5/12 relative group flex-shrink-0"
          >
            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500 z-10" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500 z-10" />
            <div className="absolute -inset-3 border border-black/5 dark:border-amber-500/15 group-hover:border-amber-500/30 transition-colors" />

            {/* Image container — square, reduced size */}
            <div className="relative w-full max-w-[340px] mx-auto aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5">
              <img
                src={logoGif}
                alt="Profile"
                className="w-full h-full object-contain object-center transition-all duration-700 group-hover:scale-105"
                style={{ imageRendering: 'auto' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 dark:from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <Terminal size={12} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">System.Identity</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 text-neutral-950 dark:text-white tracking-tighter leading-none transition-colors">
              THE MAN <br /> <span className="text-neutral-400 dark:text-neutral-500 transition-colors">BEHIND THE EDIT</span>
            </h1>

            <div className="space-y-6 text-neutral-500 dark:text-neutral-400 text-lg font-light leading-relaxed mb-12 max-w-xl transition-colors">
              <p>
                I am <span className="text-neutral-950 dark:text-white font-bold transition-colors">{PROFILE.name}</span>, a post-production specialist dedicated to the art of cinematic storytelling. I don't just assemble clips; I architect emotional journeys.
              </p>
              <p>
                With half a decade in the industry, I've mastered the balance between high-energy pacing and atmospheric tension. Every project is a new canvas for visual innovation.
              </p>
              <p>
                Collaborating with world-class creators and disruptive brands, I bring a premium, polished aesthetic to every frame I touch.
              </p>
            </div>

            <Link to="/contact" className="group relative inline-flex items-center gap-4 px-10 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-amber-500 dark:hover:bg-amber-500 transition-colors">
              Initiate Collaboration <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Stats Section - Data Visualisation */}
        <div className="grid md:grid-cols-3 gap-6 mb-40">
          {[
            { value: "05+", label: "Years in Field", icon: Zap },
            { value: "100+", label: "Masterpieces", icon: Shield },
            { value: "85%", label: "Retention Rate", icon: Sparkles }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative p-12 bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-amber-500/30 transition-all group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-100 group-hover:text-amber-500 transition-all">
                <stat.icon size={40} />
              </div>
              <div className="text-6xl font-black text-neutral-950 dark:text-white mb-2 tracking-tighter group-hover:text-amber-500 transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── EXPERIENCE TIMELINE ── */}
        <section className="mb-40">
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#00d4ff] font-black tracking-[0.4em] uppercase text-xs mb-3"
            >
              Career Journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.65 }}
              className="text-4xl md:text-5xl font-black text-neutral-950 dark:text-white tracking-tighter"
            >
              EXPERIENCE <span className="text-neutral-400 dark:text-neutral-600">TIMELINE</span>
            </motion.h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00d4ff]/60 via-[#00d4ff]/20 to-transparent" />

            <div className="space-y-12">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-20 md:pl-24 group"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[18px] md:left-[26px] top-6 w-4 h-4 rounded-full border-2 border-[#00d4ff] bg-white dark:bg-[#0a0a0f] dot-pulse z-10" />

                  {/* Year badge */}
                  <div className="absolute left-0 top-[52px] hidden md:block">
                    <span className="text-[9px] font-black tracking-[0.2em] text-[#00d4ff]/60 uppercase whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      {exp.year}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="relative p-8 bg-white dark:bg-[#111118] border border-black/[0.06] dark:border-white/[0.05] group-hover:border-[#00d4ff]/30 transition-all duration-400 overflow-hidden">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#00d4ff] group-hover:w-full transition-all duration-500" />

                    {/* Year pill — mobile */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full mb-4 md:hidden">
                      <span className="text-[9px] font-black tracking-[0.25em] text-[#00d4ff] uppercase">{exp.year}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-black text-neutral-950 dark:text-white tracking-tight">{exp.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase size={12} className="text-[#00d4ff]" />
                          <span className="text-sm font-semibold text-neutral-500 dark:text-[#6b6b80]">{exp.company}</span>
                        </div>
                      </div>
                      {/* Year badge desktop */}
                      <span className="hidden md:inline-flex items-center px-3 py-1 bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[9px] font-black tracking-[0.25em] text-[#00d4ff] uppercase whitespace-nowrap">
                        {exp.year}
                      </span>
                    </div>

                    <p className="text-neutral-500 dark:text-[#6b6b80] text-sm leading-relaxed mb-5">{exp.description}</p>

                    {exp.achievements?.length > 0 && (
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {exp.achievements.map((ach, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                            <CheckCircle2 size={13} className="text-[#00d4ff] mt-0.5 flex-shrink-0" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS SECTION ── */}
        <section className="mb-40">
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#00d4ff] font-black tracking-[0.4em] uppercase text-xs mb-3"
            >
              Arsenal
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.65 }}
              className="text-4xl md:text-5xl font-black text-neutral-950 dark:text-white tracking-tighter"
            >
              WORK <span className="text-neutral-400 dark:text-neutral-600">TOOLS</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {WORKING_TOOLS.map((tool, i) => {
              const badgeStyle = tool.proficiency === 'Expert'
                ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/25'
                : tool.proficiency === 'Advanced'
                  ? 'bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/25'
                  : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700/40 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600';

              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="group relative bg-white dark:bg-[#111118] border border-black/[0.06] dark:border-white/[0.05] overflow-hidden hover:border-[#00d4ff]/35 transition-all duration-400"
                >
                  {/* Gradient top strip */}
                  <div className={`h-[3px] w-full bg-gradient-to-r ${tool.color}`} />

                  <div className="p-6">
                    {/* Icon + name row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-sm flex items-center justify-center text-2xl bg-gradient-to-br ${tool.color} shadow-md`}>
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-neutral-900 dark:text-white leading-tight tracking-tight">{tool.name}</h3>
                        <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm ${badgeStyle}`}>
                          {tool.proficiency}
                        </span>
                      </div>
                    </div>

                    <p className="text-neutral-500 dark:text-[#6b6b80] text-xs leading-relaxed">{tool.description}</p>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Professional Tools - Tech Stack Dashboard */}
        <section className="mb-40">

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center bg-neutral-900 dark:bg-neutral-900 p-20 border border-neutral-800 relative overflow-hidden transition-colors"
          >
            <div className="absolute inset-0 opacity-5 transition-opacity">
              <Disc className="w-full h-full scale-150 animate-spin-slow text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase relative z-10">
              Let's create something <br /> <span className="text-amber-500">unforgettable.</span>
            </h2>
            <Link to="/contact" className="relative z-10 inline-block px-12 py-5 bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-white transition-all">
              Open Connection
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
