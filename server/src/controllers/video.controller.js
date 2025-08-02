import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary, deleteFromCloudinary, getPublicId } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Add Video 
const addVideo = asyncHandler(async (req, res) => {
    // Check if video file is provided
    if (!req.file) {
        throw new ApiError(400, "Video file is required");
    }

    // Check file size (e.g., limit to 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (req.file.size > maxSize) {
        throw new ApiError(400, "Video file is too large (max 100MB)");
    }

    // Check MIME type for video
    const allowedMimeTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
        throw new ApiError(400, "Invalid video format. Supported formats: MP4, MOV, AVI, MKV");
    }

    // Convert buffer to base64 for Cloudinary
    const base64Video = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // Upload video to Cloudinary (specify resource_type as 'video')
    const result = await uploadOnCloudinary(base64Video, 'video');
    if (!result) {
        throw new ApiError(500, "Failed to upload video");
    }

    // Create video entry
    const video = await Video.create({
        video: result.secure_url
    });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            video,
            "Video uploaded successfully"
        ));
});

// Delete Video
const deleteVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid video ID");
    }

    // Find and delete video
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // Delete from Cloudinary (specify resource_type as 'video')
    const publicId = getPublicId(video.video);
    await deleteFromCloudinary(publicId, 'video');

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            null,
            "Video deleted successfully"
        ));
});

// Get All Videos
const getAllVideos = asyncHandler(async (req, res) => {
    // Fetch ALL videos sorted by newest first
    const videos = await Video.find()
        .sort({ createdAt: -1 })  // Newest first
        .select('video createdAt') // Only return video URL and timestamp
        .lean();                  // Convert to plain JS object

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            videos,  // Array of all videos
            "All videos retrieved successfully"
        ));
});

// Get Video by ID
const getVideoById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid video ID");
    }

    // Find video
    const video = await Video.findById(id);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            video,
            "Video retrieved successfully"
        ));
});

export {
    addVideo,
    deleteVideo,
    getAllVideos,
    getVideoById
};