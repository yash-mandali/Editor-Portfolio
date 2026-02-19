import React from 'react';
import { PRICING_TIERS } from '../../models/data';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Pricing = () => {
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
      <section className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Transparent Pricing</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Simple packages for standard projects. Custom quotes available for larger productions.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div 
              key={tier.name} 
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-2xl border flex flex-col transition-transform duration-300 shadow-sm ${
                tier.popular 
                  ? 'bg-neutral-900 border-amber-500 shadow-2xl shadow-amber-900/20 text-white' 
                  : 'bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className={`text-3xl font-bold mb-4 ${tier.popular ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>{tier.price}</div>
              <p className={`text-sm mb-8 ${tier.popular ? 'text-neutral-400' : 'text-neutral-600 dark:text-neutral-400'}`}>{tier.description}</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm ${tier.popular ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-300'}`}>
                    <Check size={16} className="text-amber-500 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact" 
                className={`w-full py-3 rounded-lg font-bold text-center transition-all ${
                  tier.popular 
                    ? 'bg-amber-500 text-black hover:bg-amber-600' 
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                Choose {tier.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">Need something specific?</p>
          <Link to="/contact" className="text-amber-600 dark:text-amber-500 font-semibold hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Contact me for a custom quote &rarr;
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Pricing;
