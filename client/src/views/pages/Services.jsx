import React from 'react';
import { SERVICES } from '../../models/data';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Services Header */}
      <section className="container mx-auto px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Expertise & Services</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Specialized editing services tailored to your platform and audience.
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
              className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl hover:border-amber-500/30 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">{service.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">{service.description}</p>
              <div className="flex items-center justify-between pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <span className="text-amber-600 dark:text-amber-500 font-semibold">{service.price}</span>
                <Link to="/contact" className="text-sm font-bold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  Book Now &rarr;
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
