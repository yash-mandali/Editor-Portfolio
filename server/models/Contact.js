import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
        },
        projectType: {
            type: String,
            enum: {
                values: ['reels', 'youtube', 'wedding', 'commercial', 'other'],
                message: 'Please select a valid project type'
            },
            required: [true, 'Please select a project type']
        },
        budget: {
            type: String,
            enum: {
                values: ['50-200', '200-500', '500-1000', '1000+'],
                message: 'Please select a valid budget range'
            },
            required: [true, 'Please select a budget range']
        },
        message: {
            type: String,
            required: [true, 'Please provide project details'],
            minlength: [10, 'Message must be at least 10 characters'],
            maxlength: [2000, 'Message cannot exceed 2000 characters']
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'in-progress', 'completed', 'rejected'],
            default: 'new'
        },
        ipAddress: String,
        userAgent: String
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

// Index for faster queries
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });

export default mongoose.model('Contact', contactSchema);
