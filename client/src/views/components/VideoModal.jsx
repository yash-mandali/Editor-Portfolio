import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://editor-portfolio-back.vercel.app';

const VideoModal = ({ isOpen, onClose, video }) => {
  const [mounted, setMounted] = useState(false);

  // Ensure we only render the portal after the component has mounted on the client
  useEffect(() => {
    setMounted(true);
    // console.log('🎬 VideoModal component mounted');
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Resolve video source: supports object (item) or string URL
  const getVideoUrl = (v) => {
    if (!v) return '';
    if (typeof v === 'string') return v;
    if (v.videoUrl) {
      return v.videoUrl;
    }
    return '';
  };

  // Helper to construct the correct Embed URL using URL object for safety
  const getEmbedUrl = (url) => {
    if (!url) return '';

    // For relative URLs (local files) or non-http URLs, use HTML5 video player
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return '';
    }

    try {
      const urlObj = new URL(url);
      let videoId = '';

      // Handle Google Drive share links by converting to preview mode
      if (urlObj.hostname.includes('drive.google.com')) {
        // look for /file/d/ID or id= parameter
        if (urlObj.pathname.includes('/file/d/')) {
          videoId = urlObj.pathname.split('/file/d/')[1].split('/')[0];
        } else if (urlObj.searchParams.has('id')) {
          videoId = urlObj.searchParams.get('id');
        }
        if (videoId) {
          return `https://drive.google.com/file/d/${videoId}/preview`;
        }
      }

      // Handle standard YouTube domains
      if (urlObj.hostname.includes('youtube.com')) {
        if (urlObj.pathname.includes('/watch')) {
          videoId = urlObj.searchParams.get('v');
        } else if (urlObj.pathname.includes('/embed/')) {
          videoId = urlObj.pathname.split('/embed/')[1];
        } else if (urlObj.pathname.includes('/shorts/')) {
          videoId = urlObj.pathname.split('/shorts/')[1];
        }
      }
      // Handle shortened youtu.be domain
      else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      }

      // If we found an ID, construct the clean embed URL
      if (videoId) {
        // Clean up any trailing query params or slashes from the ID extraction
        videoId = videoId.split('?')[0].split('&')[0].split('/')[0];

        const origin = window.location.origin;
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1&origin=${origin}`;
      }

      // Fallback: If parsing failed but it looks like an embed link, try to append params
      if (url.includes('embed')) {
        return `${url}${url.includes('?') ? '&' : '?'}autoplay=1&mute=1`;
      }

      return '';
    } catch (e) {
      console.error("Error parsing video URL:", e);
      return '';
    }
  };

  const resolvedUrl = getVideoUrl(video);
  const embedSrc = getEmbedUrl(resolvedUrl);

  // Debug logging
  useEffect(() => {
    if (isOpen && video) {
      // console.log('🎬 VideoModal opened');
      // console.log('Video object:', video);
      // console.log('Resolved URL:', resolvedUrl);
      // console.log('Embed Src:', embedSrc);
      // console.log('API_URL:', API_URL);
    }
  }, [isOpen, video, resolvedUrl, embedSrc]);

  // Don't render anything if not mounted (SSR safety)
  if (!mounted) return null;

  // Use createPortal to render the modal outside the DOM hierarchy of the parent component
  // This avoids z-index and overflow issues caused by parent containers
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-amber-500 text-white hover:text-black rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Close Video"
            >
              <X size={24} />
            </button>

            {resolvedUrl ? (
              embedSrc ? (
                <iframe
                  src={embedSrc}
                  title="YouTube Video Player"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                // Display HTML5 video player for uploaded files or direct links
                <video
                  src={resolvedUrl}
                  title="Video Player"
                  className="w-full h-full bg-black"
                  controls
                  autoPlay
                  controlsList="nodownload"
                  style={{ display: 'block' }}
                />
              )
            ) : (
              // Error state when no URL is available
              <div className="w-full h-full flex items-center justify-center bg-red-900/20 text-neutral-300 flex-col gap-4 p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold mb-4 text-red-400">⚠️ Video Error</p>
                  <p className="text-lg font-semibold mb-2">Video could not be loaded</p>
                  <p className="text-sm font-mono bg-neutral-800 p-3 rounded mb-2" style={{ wordBreak: 'break-all' }}>
                    URL: {video?.videoUrl || 'No URL provided'}
                  </p>
                  <p className="text-xs text-neutral-400">Please check the video URL and try again</p>
                </div>
                <button onClick={onClose} className="px-4 py-2 bg-amber-500 text-black hover:bg-amber-600 rounded font-medium transition">Close</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default VideoModal;
