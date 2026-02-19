import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

// helper for cleaning up video URLs (Google Drive -> preview link)
function normalizeVideoUrl(url) {
    if (!url || typeof url !== 'string') return url;
    try {
        const u = new URL(url);
        if (u.hostname.includes('drive.google.com')) {
            let id = '';
            if (u.pathname.includes('/file/d/')) {
                id = u.pathname.split('/file/d/')[1].split('/')[0];
            } else if (u.searchParams.has('id')) {
                id = u.searchParams.get('id');
            }
            if (id) return `https://drive.google.com/file/d/${id}/preview`;
        }
    } catch (e) { }
    return url;
}



// @route POST /api/videos
// @desc  Create video (URL only)
router.post('/', async (req, res) => {
    try {
        const { title, category, image, description, videoUrl } = req.body;
        if (!title || !category) {
            return res.status(400).json({ success: false, message: 'Title and category are required' });
        }

        const data = { title, category, image, description };

        // only URL-based videos supported
        if (videoUrl) {
            data.videoUrl = normalizeVideoUrl(videoUrl);
        } else {
            return res.status(400).json({ success: false, message: 'Video URL is required' });
        }

        const video = await Video.create(data);
        res.status(201).json({ success: true, data: video });
    } catch (err) {
        console.error('Create video error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route GET /api/videos
router.get('/', async (req, res) => {
    try {
        const items = await Video.find({ published: true }).sort({ createdAt: -1 }).limit(200);
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (err) {
        console.error('Get videos error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route GET /api/videos/all/list (admin - all including unpublished)
router.get('/all/list', async (req, res) => {
    try {
        const items = await Video.find().sort({ createdAt: -1 }).limit(200);
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (err) {
        console.error('Get all videos error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route PUT /api/videos/:id
// @desc  Update video (URL only)
router.put('/:id', async (req, res) => {
    try {
        const { title, category, image, description, videoUrl } = req.body;

        // Get existing video to handle file replacement
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        const data = { title, category, image, description };

        // only URL-based video source
        if (videoUrl) {
            data.videoUrl = normalizeVideoUrl(videoUrl);
        }

        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id,
            { ...data, published: req.body.published !== undefined ? req.body.published : video.published },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedVideo });
    } catch (err) {
        console.error('Update video error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route DELETE /api/videos/:id
router.delete('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }



        await video.deleteOne();
        res.status(200).json({ success: true, message: 'Video deleted' });
    } catch (err) {
        console.error('Delete video error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
