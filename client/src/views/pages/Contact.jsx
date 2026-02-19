import React from 'react';
import { Mail, MessageCircle, MapPin, Send, Loader2 } from 'lucide-react';
import { useContactController } from '../../controllers/useContactController';
import { PROFILE } from '../../models/data';
import { motion } from 'framer-motion';

const Contact = () => {
  const { formData, handleChange, handleSubmit, isSubmitting, submitted, error } = useContactController();

  return (
    <div className="min-h-screen py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Let's Create Something Amazing</h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-12">
              Ready to take your content to the next level? Fill out the form or reach out directly.
              Please note: I only accept paid projects to ensure the highest quality of service.
            </p>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Email Me</h3>
                  <a href={`mailto:${PROFILE.email}`} className="text-neutral-600 dark:text-neutral-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">{PROFILE.email}</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">WhatsApp</h3>
                  <a href={`https://wa.me/${PROFILE.whatsapp}`} className="text-neutral-600 dark:text-neutral-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">Chat on WhatsApp</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Location</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Remote Worldwide / Based in India</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl shadow-lg dark:shadow-none"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-neutral-600 dark:text-neutral-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-8 text-amber-600 dark:text-amber-500 font-medium hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                    {error}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option value="reels">Instagram Reels</option>
                      <option value="youtube">YouTube Video</option>
                      <option value="wedding">Wedding Film</option>
                      <option value="commercial">Commercial/Brand</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Budget Range (USD)</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="">Select budget</option>
                      <option value="50-200">$50 - $200</option>
                      <option value="200-500">$200 - $500</option>
                      <option value="500-1000">$500 - $1000</option>
                      <option value="1000+">$1000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Project Details</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    placeholder="Tell me about your vision, deadline, and raw footage..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Send Inquiry'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
