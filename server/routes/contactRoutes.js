import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   POST /api/contacts
// @desc    Create a new contact form submission
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, projectType, budget, message } = req.body;

        // Validation
        if (!name || !email || !projectType || !budget || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Create new contact document
        const contact = new Contact({
            name,
            email,
            projectType,
            budget,
            message,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        // Save to database
        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: {
                id: contact._id,
                email: contact.email,
                submittedAt: contact.createdAt
            }
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error submitting contact form'
        });
    }
});

// @route   GET /api/contacts
// @desc    Get all contact submissions (Admin only)
// @access  Private
router.get('/', async (req, res) => {
    try {
        const { status, projectType, sort } = req.query;
        const query = {};

        if (status) query.status = status;
        if (projectType) query.projectType = projectType;

        const contacts = await Contact.find(query)
            .sort(sort === 'asc' ? { createdAt: 1 } : { createdAt: -1 })
            .limit(100);

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts'
        });
    }
});

// @route   GET /api/contacts/:id
// @desc    Get a specific contact submission
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Get contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact'
        });
    }
});

// @route   PATCH /api/contacts/:id
// @desc    Update contact status
// @access  Private
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a status'
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact status updated',
            data: contact
        });
    } catch (error) {
        console.error('Update contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating contact'
        });
    }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact submission
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Delete contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting contact'
        });
    }
});

export default router;
