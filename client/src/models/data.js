/**
 * MODEL LAYER
 * Handles all data definitions and static content.
 */

import { Film, Youtube, Instagram, MonitorPlay, Star, Zap, Clapperboard } from 'lucide-react';

export const PROFILE = {
  name: "Yash Mandali",
  title: "Premium Video Editor",
  tagline: "Crafting Cinematic Stories for Visionaries",
  description: "I specialize in transforming raw footage into compelling visual narratives. With expertise in Adobe Premiere Pro, After Effects, and CapCut Pro, I deliver high-end edits for creators and brands who value quality.",
  email: "contact@alexsterling.edit",
  whatsapp: "+91 9574804787",
  socials: {
    instagram: "https://www.instagram.com/phoenixdude28?igsh=aW1xNmZmN3A5aXJz",
    youtube: "https://youtube.com/@phoenixdude28?si=XjhU2JppxWWdTbrh",
    linkedin: "https://linkedin.com"
  }
};

export const TOOLS = [
  { name: "Adobe Premiere Pro", level: "Expert" },
  { name: "Adobe After Effects", level: "Advanced" },
  { name: "CapCut Pro", level: "Expert" },
  { name: "DaVinci Resolve", level: "Intermediate" }
];

export const SERVICES = [
  {
    id: 'short-form',
    title: "Short-Form Content",
    icon: Instagram,
    description: "High-retention vertical videos for Instagram Reels, TikTok, and YouTube Shorts. Includes captions, transitions, and dynamic sound design."
  },
  {
    id: 'long-form',
    title: "Long-Form Content",
    icon: Youtube,
    description: "Professional YouTube and extended-form editing with storytelling, b-roll integration, pacing, and audience retention optimization."
  },
  {
    id: 'promotional',
    title: "Promotional Videos",
    icon: MonitorPlay,
    description: "Product promos, brand videos, social media ads, and app promotions designed to drive engagement and conversions."
  },
  {
    id: 'corporate-events',
    title: "Corporate & Events",
    icon: Film,
    description: "Event highlights, corporate presentations, testimonials, and professional coverage for businesses and special occasions."
  },
  {
    id: 'creative',
    title: "Creative & Cinematic",
    icon: Clapperboard,
    description: "Cinematic wedding films, travel edits, music videos, and visually compelling storytelling projects."
  }
];


export const PORTFOLIO = [
  {
    id: 1,
    title: "Neon City Nightlife",
    category: "Cinematic",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
    description: "A mood-driven cinematic sequence showcasing urban nightlife.",
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc" // Standard Watch Link
  },
];

export const VIDEOS = [
  {
    id: 1,
    title: "Cinematic Introduction",
    category: "Music & Cinematic",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
    description: "A beautifully shot cinematic introduction showcasing professional filmmaking techniques.",
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc"
  },
];

export const WHY_CHOOSE_ME = [
  {
    title: "Premium Quality",
    description: "I don't just cut video; I craft experiences. Every frame is polished to perfection.",
    icon: Star
  },
  {
    title: "Fast Turnaround",
    description: "Deadlines are sacred. Get your first draft within 48 hours for most projects.",
    icon: Zap
  },
  {
    title: "Storytelling First",
    description: "Technical skills are a given. My focus is on engaging your audience emotionally.",
    icon: MonitorPlay
  }
];
