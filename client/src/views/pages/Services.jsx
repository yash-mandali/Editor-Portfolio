import React from 'react';
import { SERVICES } from '../../models/data';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen py-48 bg-white dark:bg-neutral-950 transition-colors duration-500 relative overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-orange-600/5 blur-[100px] rounded-full" />
      </div>

      {/* Services Header */}
      <section className="container mx-auto px-6 mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
            <Sparkles size={12} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Solutions.Architect</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-neutral-950 dark:text-white tracking-tighter leading-none transition-colors">
            EXPERTISE & <br /> <span className="text-neutral-900/10 dark:text-white/20 transition-colors">SERVICES</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg font-light transition-colors">
            Specialized editing services tailored to your platform and audience. Orchestrating high-impact visual narratives.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-neutral-900/50 backdrop-blur-xl border border-black/5 dark:border-neutral-800 p-10 rounded-none hover:border-amber-500/30 transition-all group shadow-sm hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <service.icon size={120} />
              </div>
              
              <div className="w-14 h-14 rounded-none bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-black mb-10 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                <service.icon size={24} />
              </div>
              
              <h3 className="text-3xl font-black mb-4 text-neutral-950 dark:text-white tracking-tighter transition-colors uppercase">{service.title}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-10 leading-relaxed font-light transition-colors">{service.description}</p>
              
              <div className="pt-8 border-t border-black/5 dark:border-neutral-800">
                <Link to="/contact" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950 dark:text-white hover:text-amber-500 dark:hover:text-amber-500 transition-all">
                  Initiate Booking <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
