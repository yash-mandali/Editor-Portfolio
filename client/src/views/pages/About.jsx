import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE, TOOLS } from '../../models/data';
import { Link } from 'react-router-dom';
import { ArrowRight, Disc, Terminal, Zap, Shield, Sparkles } from 'lucide-react';
import logoGif from '../../assests/logo GIF.gif';

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-orange-600/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-32">
        {/* Intro - Cinematic Split Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="absolute -inset-4 border border-amber-500/20 group-hover:border-amber-500/40 transition-colors" />
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500" />
            
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5">
              <img
                src={logoGif}
                alt="Profile"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
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
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tighter leading-none">
              THE MAN <br /> <span className="text-white/20">BEHIND THE EDIT</span>
            </h1>
            
            <div className="space-y-6 text-neutral-400 text-lg font-light leading-relaxed mb-12 max-w-xl">
              <p>
                I am <span className="text-white font-bold">{PROFILE.name}</span>, a post-production specialist dedicated to the art of cinematic storytelling. I don't just assemble clips; I architect emotional journeys.
              </p>
              <p>
                With half a decade in the industry, I've mastered the balance between high-energy pacing and atmospheric tension. Every project is a new canvas for visual innovation.
              </p>
              <p>
                Collaborating with world-class creators and disruptive brands, I bring a premium, polished aesthetic to every frame I touch.
              </p>
            </div>

            <Link to="/contact" className="group relative inline-flex items-center gap-4 px-10 py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-amber-500 transition-colors">
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
              className="relative p-12 bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-amber-500 transition-all">
                <stat.icon size={40} />
              </div>
              <div className="text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-amber-500 transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Professional Tools - Tech Stack Dashboard */}
        <section className="mb-40">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              TECH <span className="text-white/20">STACK</span>
            </h2>
            <div className="w-12 h-[2px] bg-amber-500 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-8 bg-neutral-900 border border-white/5 text-center group hover:border-amber-500/50 transition-all"
              >
                <div className="text-white font-black uppercase tracking-[0.2em] text-xs mb-2 group-hover:text-amber-500 transition-colors">
                  {tool.name}
                </div>
                <div className="text-[8px] font-black uppercase tracking-[0.3em] text-neutral-600">
                  {tool.level}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center bg-white/5 p-20 border border-white/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
            <Disc className="w-full h-full scale-150 animate-spin-slow" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase relative z-10">
            Let's create something <br /> <span className="text-amber-500">unforgettable.</span>
          </h2>
          <Link to="/contact" className="relative z-10 inline-block px-12 py-5 bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-white transition-all">
            Open Connection
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
