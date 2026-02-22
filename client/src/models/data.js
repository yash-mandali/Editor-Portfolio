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
  whatsapp: "+919574804787",
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
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
    description: "High-retention vertical videos for Instagram Reels, TikTok, and YouTube Shorts. Includes captions, transitions, and dynamic sound design.",
    price: "From $50/video"
  },
  {
    id: 'long-form',
    title: "Long-Form Content",
    icon: Youtube,
    description: "Professional YouTube and extended-form editing with storytelling, b-roll integration, pacing, and audience retention optimization.",
    price: "From $150/video"
  },
  {
    id: 'promotional',
    title: "Promotional Videos",
    icon: MonitorPlay,
    description: "Product promos, brand videos, social media ads, and app promotions designed to drive engagement and conversions.",
    price: "From $300/project"
  },
  {
    id: 'corporate-events',
    title: "Corporate & Events",
    icon: Film,
    description: "Event highlights, corporate presentations, testimonials, and professional coverage for businesses and special occasions.",
    price: "From $400/project"
  },
  {
    id: 'creative',
    title: "Creative & Cinematic",
    icon: Clapperboard,
    description: "Cinematic wedding films, travel edits, music videos, and visually compelling storytelling projects.",
    price: "From $500/project"
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

export const PRICING_TIERS = [
  {
    name: "Essential",
    price: "$200",
    description: "Perfect for getting started with professional quality.",
    features: ["Up to 5 mins footage", "Basic Color Correction", "Standard Transitions", "2 Revisions", "48h Delivery"]
  },
  {
    name: "Professional",
    price: "$500",
    description: "The standard for creators who need polish and retention.",
    features: ["Up to 15 mins footage", "Advanced Color Grading", "Motion Graphics", "Sound Design & Mixing", "Unlimited Revisions", "Priority Support"],
    popular: true
  },
  {
    name: "Cinematic",
    price: "Custom",
    description: "Full-scale production editing for high-end projects.",
    features: ["Unlimited footage", "Cinema-grade Grading", "VFX & Compositing", "Dedicated Sound Engineer", "Director Consultation", "Source File Delivery"]
  }
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
