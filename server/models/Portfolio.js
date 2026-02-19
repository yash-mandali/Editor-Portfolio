import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        image: { type: String, trim: true },
        description: { type: String, trim: true },
        // External URL (YouTube or hosted file)
        videoUrl: { type: String, trim: true },
        // If admin uploads a file, store a URL path to the file under /uploads/portfolio/
        // (we store files on disk instead of binary in DB)
        published: { type: Boolean, default: true }
    },
    { timestamps: true }
);

portfolioSchema.index({ title: 'text', category: 1 });

export default mongoose.model('Portfolio', portfolioSchema);
