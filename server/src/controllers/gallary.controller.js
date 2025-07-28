import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Gallery } from "../models/gallary.model.js";
import { uploadOnCloudinary, deleteFromCloudinary, getPublicId } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Add Image to Gallery (using memory storage)
const addGalleryImage = asyncHandler(async (req, res) => {
    // Check if image file is provided
    if (!req.file) {
        throw new ApiError(400, "Image file is required");
    }

    // Convert buffer to base64 for Cloudinary
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // Upload image to Cloudinary
    const result = await uploadOnCloudinary(base64Image);
    if (!result) {
        throw new ApiError(500, "Failed to upload image");
    }

    // Create gallery entry
    const galleryImage = await Gallery.create({
        image: result.secure_url
    });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            galleryImage,
            "Image added to gallery successfully"
        ));
});

// Delete Image from Gallery
const deleteGalleryImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid image ID");
    }

    // Find and delete image
    const galleryImage = await Gallery.findByIdAndDelete(id);
    if (!galleryImage) {
        throw new ApiError(404, "Image not found in gallery");
    }

    // Delete from Cloudinary
    const publicId = getPublicId(galleryImage.image);
    await deleteFromCloudinary(publicId);

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            null,
            "Image deleted from gallery successfully"
        ));
});

// Get All Gallery Images
const getAllGalleryImages = asyncHandler(async (req, res) => {
    // Fetch ALL gallery images sorted by newest first
    const galleryImages = await Gallery.find()
        .sort({ createdAt: -1 })  // Newest first
        .select('image createdAt') // Only return image URL and timestamp
        .lean();                  // Convert to plain JS object

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            galleryImages,  // Array of all images
            "All gallery images retrieved successfully"
        ));
});

// Get Gallery Image by ID
const getGalleryImageById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid image ID");
    }

    // Find image
    const galleryImage = await Gallery.findById(id);
    if (!galleryImage) {
        throw new ApiError(404, "Image not found in gallery");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            galleryImage,
            "Gallery image retrieved successfully"
        ));
});

export {
    addGalleryImage,
    deleteGalleryImage,
    getAllGalleryImages,
    getGalleryImageById
};