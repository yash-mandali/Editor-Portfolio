import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Video, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../../models/data';
import ThemeToggle from './ThemeToggle';
import Loader from './Loader';

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
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md py-4 border-b border-neutral-200 dark:border-neutral-800 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-neutral-900 dark:text-white flex items-center gap-2">
          <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="flex items-center gap-2">
            <Video className="text-amber-500" />
            <span>CineCraft<span className="text-amber-500">.</span>EDIT</span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-amber-500 ${location.pathname === link.path ? 'text-amber-500' : 'text-neutral-600 dark:text-neutral-300'}`}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700 mx-2"></div>

          <ThemeToggle />

          <Link to="/contact" className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-lg shadow-amber-500/20">
            Hire Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button className="text-neutral-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-neutral-600 dark:text-neutral-300 hover:text-amber-500 font-medium text-lg"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="text-amber-500 font-medium text-lg"
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 pt-20 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              <Video className="text-amber-500" />
              CineCraft<span className="text-amber-500">.</span>EDIT
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-6">
              {PROFILE.tagline}. Delivering premium post-production services for creators and brands worldwide.
            </p>
            <div className="flex gap-4">
              <a href={PROFILE.socials.instagram} className="text-neutral-500 dark:text-neutral-400 hover:text-amber-500 transition-colors"><Instagram size={20} /></a>
              <a href={PROFILE.socials.youtube} className="text-neutral-500 dark:text-neutral-400 hover:text-amber-500 transition-colors"><Youtube size={20} /></a>
              <a href={PROFILE.socials.linkedin} className="text-neutral-500 dark:text-neutral-400 hover:text-amber-500 transition-colors"><Linkedin size={20} /></a>
              <a href={`mailto:${PROFILE.email}`} className="text-neutral-500 dark:text-neutral-400 hover:text-amber-500 transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-neutral-900 dark:text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Instagram Reels</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">YouTube Editing</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Wedding Films</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Commercials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-900 dark:text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Me</Link></li>
              <li><Link to="/portfolio" className="hover:text-amber-500 transition-colors">Portfolio</Link></li>
              <li><Link to="/pricing" className="hover:text-amber-500 transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <p>Designed for Excellence.</p>
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
    // Initial load: show loader briefly
    timerRef.current = setTimeout(() => {
      setShowLoader(false);
      initial.current = false;
    }, 700);
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    // On route change (except the very first render), show loader briefly
    if (initial.current) return;
    setShowLoader(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowLoader(false), 400);
    return () => clearTimeout(timerRef.current);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-amber-500/30 transition-colors duration-300">
      <Navbar />
      {showLoader && <Loader />}
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
