import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Youtube, Linkedin, Mail, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../../models/data';
// ThemeToggle removed for cinematic dark-only experience
import Loader from './Loader';
import logo from '../../assests/logo-file.png';
import CustomCursor from './CustomCursor';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-xl py-4 border-b border-white/5 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="relative group">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto invert drop-shadow-[0_0_10px_rgba(0,212,255,0.4)] transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]"
              />
            </div>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:text-cyan-400 ${location.pathname === link.path ? 'text-cyan-400' : 'text-neutral-500'}`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-6 ml-4">
            <Link to="/contact" className="relative px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-cyan-500 transition-colors overflow-hidden group">
              <span className="relative z-10">Get In Touch</span>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-6">
          <button className="text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-8 right-8 text-white p-2" onClick={() => setIsOpen(false)}>
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-3xl font-black uppercase tracking-[0.2em] text-white/60 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="text-3xl font-black uppercase tracking-[0.2em] text-cyan-400"
            >
              Hire Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-32 pb-16 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full transition-colors" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-10 group">
              <img
                src={logo}
                alt="Logo"
                className="h-16 w-auto invert opacity-80 group-hover:opacity-100 transition-all duration-500"
              />
            </Link>
            <p className="text-neutral-500 text-lg font-light leading-relaxed mb-10 max-w-sm">
              {PROFILE.tagline}. Orchestrating high-impact visual narratives for the modern digital landscape.
            </p>
            <div className="flex gap-8">
              {[
                { icon: Instagram, url: PROFILE.socials.instagram },
                { icon: Youtube, url: PROFILE.socials.youtube },
                { icon: Linkedin, url: PROFILE.socials.linkedin },
                { icon: Mail, url: `mailto:${PROFILE.email}` }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className="text-neutral-400 hover:text-cyan-400 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8 transition-colors">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'About', 'Portfolio', 'Services'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8 transition-colors">Socials</h4>
              <ul className="space-y-4">
                {['Instagram', 'YouTube', 'LinkedIn', 'Vimeo'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8 transition-colors">Direct</h4>
              <a href={`mailto:${PROFILE.email}`} className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors break-all">
                {PROFILE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 transition-colors">
          <p>&copy; {new Date().getFullYear()} {PROFILE.name}. SYSTEM_ALL_RIGHTS_RESERVED.</p>
          <div className="flex items-center gap-2">
            <Disc size={12} className="animate-spin-slow text-cyan-400" />
            <span>Premium Post-Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const initial = useRef(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShowLoader(false);
      initial.current = false;
    }, 1000);
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (initial.current) return;
    setShowLoader(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowLoader(false), 600);
    return () => clearTimeout(timerRef.current);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500/30 transition-colors duration-500 overflow-x-hidden">
      {/* Cinematic Overlays */}
      <div className="film-grain" />
      <div className="scanlines" />

      {/* Custom Cursor */}
      <CustomCursor />

      <Navbar />

      <AnimatePresence mode="wait">
        {showLoader && <Loader />}
      </AnimatePresence>

      <main className="relative z-10 transition-colors duration-500">
        {children}
      </main>

      <Footer />
    </div>
  );
};
