/**
 * MODEL LAYER
 * Handles all data definitions and static content.
 */

import { Film, Youtube, Instagram, MonitorPlay, Star, Zap, Clapperboard } from 'lucide-react';
export const PROFILE = {
  name: "CineCraft",
  title: "Premium Video Editor",
  tagline: "Crafting Cinematic Stories for Visionaries",
  description: "I specialize in transforming raw footage into compelling visual narratives. With expertise in Adobe Premiere Pro, After Effects, and CapCut Pro, I deliver high-end edits for creators and brands who value quality.",
  email: "cinecrafteditzz@gmail.com",
  whatsapp: "+91 9574804787",
  socials: {
    instagram: "https://www.instagram.com/phoenixdude28?igsh=aW1xNmZmN3A5aXJz",
    youtube: "https://youtube.com/@phoenixdude28?si=XjhU2JppxWWdTbrh",
    linkedin: "https://www.linkedin.com/in/cinecraft-editz-812437404/"
  }
};


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
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Capcut-icon.svg/1280px-Capcut-icon.svg.png?_=20250728014948y",
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
    icon: "https://www.adobe.com/cc-shared/assets/img/product-icons/svg/audition.svg",
    color: "from-indigo-500 to-purple-600",
    proficiency: "Advanced"
  },
  {
    id: 6,
    name: "Adobe Photoshop",
    description: "Industry-leading image editing and compositing for thumbnails and graphics",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    color: "from-blue-400 to-cyan-600",
    proficiency: "Advanced"
  },
  {
    id: 7,
    name: "Adobe Lightroom",
    description: "Professional photo editing and colour grading for cinematic stills",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg",
    color: "from-sky-400 to-blue-500",
    proficiency: "Advanced"
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
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc"
  },
  {
    id: 2,
    title: "Urban Explorer",
    category: "Vlog",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    description: "Exploring the hidden gems of the city.",
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc"
  },
  {
    id: 3,
    title: "Mountain Heights",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
    description: "A breathtaking journey through the Alps.",
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc"
  },
  {
    id: 4,
    title: "Ocean Breeze",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    description: "Relaxing vibes from the tropical islands.",
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc"
  },
  {
    id: 5,
    title: "Future Tech",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    description: "Showcasing the latest in AI and robotics.",
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc"
  },
  {
    id: 6,
    title: "Gourmet Kitchen",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop",
    description: "A culinary experience like no other.",
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc"
  },
  {
    id: 7,
    title: "Desert Sands",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1000&auto=format&fit=crop",
    description: "The vast beauty of the Sahara.",
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc"
  },
  {
    id: 8,
    title: "Stellar Voyage",
    category: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    description: "A journey beyond the stars.",
    videoUrl: "https://www.youtube.com/watch?v=zF9m02WllZc"
  }
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
