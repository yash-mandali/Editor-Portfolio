import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Instagram, Youtube, Linkedin, Mail, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../../models/data';
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

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-xl py-4 border-b border-white/5 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="relative group z-50">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="h-16 w-auto invert drop-shadow-[0_0_10px_rgba(0,212,255,0.4)] transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:text-[#00d4ff] ${location.pathname === link.path ? 'text-[#00d4ff]' : 'text-neutral-400'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-8 py-3 text-black text-[10px] font-black uppercase tracking-[0.3em] transition-colors overflow-hidden"
              style={{ background: '#00d4ff' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f59e0b'}
              onMouseLeave={e => e.currentTarget.style.background = '#00d4ff'}
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile hamburger — always on top */}
          <button
            className="md:hidden relative z-[60] flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-[2px] bg-white origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[2px] bg-white origin-center"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-[2px] bg-white origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu — full-screen overlay, z-[55] so it's above content but below hamburger */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] flex flex-col"
            style={{ background: '#0a0a0f' }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(226,176,46,0.06) 0%, transparent 70%)' }} />

            <motion.div
              className="absolute left-0 w-full h-[1px] pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(226,176,46,0.3), transparent)' }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Nav links — centered */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8 relative z-10">
              {/* Index numbers + links */}
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-xs"
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-4 py-4 border-b border-white/[0.06] w-full"
                  >
                    <span className="text-[11px] font-black text-[#00d4ff]/40 tabular-nums w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-2xl font-black uppercase tracking-[0.15em] transition-colors duration-200 ${location.pathname === link.path
                        ? 'text-[#00d4ff]'
                        : 'text-white group-hover:text-[#00d4ff]'
                        }`}
                    >
                      {link.name}
                    </span>
                    {location.pathname === link.path && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45 }}
                className="w-full max-w-xs mt-6"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-4 text-black font-black uppercase tracking-[0.3em] text-sm"
                  style={{ background: '#00d4ff', boxShadow: '0 0 30px rgba(0,212,255,0.2)' }}
                >
                  Hire Me
                </Link>
              </motion.div>
            </div>

            {/* Bottom socials strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 flex items-center justify-center gap-8 pb-10 pt-4 border-t border-white/[0.06]"
            >
              {[
                { icon: Instagram, url: PROFILE.socials.instagram },
                { icon: Youtube, url: PROFILE.socials.youtube },
                { icon: Linkedin, url: PROFILE.socials.linkedin },
                { icon: Mail, url: `mailto:${PROFILE.email}` },
              ].map((s, i) => (
                <a key={i} href={s.url} className="text-neutral-500 hover:text-[#00d4ff] transition-colors">
                  <s.icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-32 pb-16 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full transition-colors" />
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
                  target="_blank"
                  rel="noreferrer"
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
                {[
                  { label: 'Instagram', url: PROFILE.socials.instagram, icon: Instagram },
                  { label: 'YouTube', url: PROFILE.socials.youtube, icon: Youtube },
                  { label: 'LinkedIn', url: PROFILE.socials.linkedin, icon: Linkedin },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-neutral-500 text-sm hover:text-cyan-400 transition-colors group"
                    >
                      {/* <item.icon size={14} className="group-hover:text-cyan-400 transition-colors" /> */}
                      {item.label}
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
    }, 250);
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (initial.current) return;
    setShowLoader(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowLoader(false), 200);
    return () => clearTimeout(timerRef.current);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-neutral-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <div className="film-grain" />
      <div className="scanlines" />
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        {showLoader && <Loader />}
      </AnimatePresence>
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};
