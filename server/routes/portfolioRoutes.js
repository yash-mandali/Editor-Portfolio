import express from 'express';
import Portfolio from '../models/Portfolio.js';

const router = express.Router();

// helper to normalize certain video URLs (e.g. convert Google Drive share links to an embeddable preview URL)
function normalizeVideoUrl(url) {
    if (!url || typeof url !== 'string') return url;
    try {
        const u = new URL(url);
        // Google Drive links can come in multiple forms
        if (u.hostname.includes('drive.google.com')) {
            let id = '';
            // /file/d/FILEID/view or /file/d/FILEID/preview
            if (u.pathname.includes('/file/d/')) {
                id = u.pathname.split('/file/d/')[1].split('/')[0];
            } else if (u.searchParams.has('id')) {
                id = u.searchParams.get('id');
            }
            if (id) {
                return `https://drive.google.com/file/d/${id}/preview`;
            }
        }
    } catch (e) {
        // if parsing fails just return original
    }
    return url;
}



// @route POST /api/portfolio
// @desc  Create portfolio item with optional video file upload
router.post('/', async (req, res) => {
    try {
        const { title, category, image, description, videoUrl } = req.body;
        if (!title || !category) {
            return res.status(400).json({ success: false, message: 'Title and category are required' });
        }

        const data = { title, category, image, description };

        // only URL-based video sources are supported
        if (videoUrl) {
            data.videoUrl = normalizeVideoUrl(videoUrl);
        } else {
            return res.status(400).json({ success: false, message: 'Video URL is required' });
        }

        const portfolio = await Portfolio.create(data);
        res.status(201).json({ success: true, data: portfolio });
    } catch (err) {
        console.error('Create portfolio error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route GET /api/portfolio
router.get('/', async (req, res) => {
    try {
        const items = await Portfolio.find({ published: true }).select('-videoBinary').sort({ createdAt: -1 }).limit(200);
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (err) {
        console.error('Get portfolio error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route GET /api/portfolio/all (admin - all including unpublished)
router.get('/all/list', async (req, res) => {
    try {
        const items = await Portfolio.find().select('-videoBinary').sort({ createdAt: -1 }).limit(200);
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (err) {
        console.error('Get all portfolio error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Note: video streaming from DB removed. Uploaded files are served statically via /uploads

// @route PUT /api/portfolio/:id
// @desc  Update portfolio item (URL only)
router.put('/:id', async (req, res) => {
    try {
        const { title, category, image, description, videoUrl } = req.body;

        // Get existing portfolio to handle file replacement
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ success: false, message: 'Portfolio item not found' });
        }

        const data = { title, category, image, description };

        // only URL-based video source
        if (videoUrl) {
            data.videoUrl = normalizeVideoUrl(videoUrl);
        }

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            { ...data, published: req.body.published !== undefined ? req.body.published : portfolio.published },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedPortfolio });
    } catch (err) {
        console.error('Update portfolio error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route DELETE /api/portfolio/:id
router.delete('/:id', async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ success: false, message: 'Portfolio item not found' });
        }



        await portfolio.deleteOne();
        res.status(200).json({ success: true, message: 'Portfolio item deleted' });
    } catch (err) {
        console.error('Delete portfolio error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
