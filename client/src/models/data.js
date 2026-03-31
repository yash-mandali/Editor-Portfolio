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

export const EXPERIENCE = [
  {
    id: 1,
    year: "2023 - Present",
    title: "Senior Video Editor",
    company: "Freelance & Independent Projects",
    description: "Leading video editing projects for major brands, influencers, and production companies. Specializing in cinematic storytelling and high-conversion promotional content.",
    achievements: [
      "Delivered 200+ professional video projects",
      "Achieved 300%+ engagement growth for clients",
      "Mastered advanced color grading techniques",
      "Collaborated with top-tier production teams"
    ]
  },
  {
    id: 2,
    year: "2021 - 2023",
    title: "Video Content Creator",
    company: "Digital Media Agency",
    description: "Created compelling video content for social media platforms, focusing on short-form content that drives audience engagement and brand awareness.",
    achievements: [
      "Produced 500+ viral short-form videos",
      "Increased client follower counts by 150%",
      "Pioneered trending editing styles",
      "Managed end-to-end content production"
    ]
  },
  {
    id: 3,
    year: "2019 - 2021",
    title: "Junior Video Editor",
    company: "Creative Production Studio",
    description: "Started professional journey in video editing, learning industry-standard workflows and developing expertise in Adobe Creative Suite.",
    achievements: [
      "Completed 100+ editing projects",
      "Learned advanced post-production techniques",
      "Built foundation in cinematic storytelling",
      "Earned recognition for creative editing style"
    ]
  }
];

export const WORKING_TOOLS = [
  {
    id: 1,
    name: "Adobe Premiere Pro",
    description: "Industry-standard video editing software for professional post-production",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
    color: "from-blue-500 to-blue-700",
    proficiency: "Expert"
  },
  {
    id: 2,
    name: "Adobe After Effects",
    description: "Powerful motion graphics and visual effects compositing software",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
    color: "from-purple-500 to-purple-700",
    proficiency: "Advanced"
  },
  {
    id: 3,
    name: "CapCut Pro",
    description: "Professional mobile and desktop video editing with AI-powered features",
    icon: "https://commons.wikimedia.org/wiki/File:Capcut-icon.svg",
    color: "from-green-500 to-green-700",
    proficiency: "Expert"
  },
  {
    id: 4,
    name: "DaVinci Resolve",
    description: "Professional color grading and finishing software",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
    color: "from-orange-500 to-red-600",
    proficiency: "Intermediate"
  },
  {
    id: 5,
    name: "Adobe Audition",
    description: "Professional audio editing and sound design software",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/da/Adobe_Audition_CC_icon.svg",
    color: "from-indigo-500 to-purple-600",
    proficiency: "Advanced"
  },
  {
    id: 6,
    name: "Final Cut Pro",
    description: "Apple's professional video editing software for Mac",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Final_Cut_Pro_Icon.svg",
    color: "from-gray-600 to-gray-800",
    proficiency: "Intermediate"
  }
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
