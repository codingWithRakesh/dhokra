import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { FixImage } from "../models/fiximg.model.js";
import { uploadOnCloudinary, deleteFromCloudinary, getPublicId } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Add Display Image (using memory storage)
const addDisplayImage = asyncHandler(async (req, res) => {
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

    // First, set all other images to not display
    await FixImage.updateMany({}, { $set: { isDisplay: false } });

    // Create display image entry
    const displayImage = await FixImage.create({
        image: result.secure_url,
        isDisplay: true
    });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            displayImage,
            "Display image added successfully"
        ));
});

// Delete Display Image
const deleteDisplayImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid image ID");
    }

    // Find and delete image
    const displayImage = await FixImage.findByIdAndDelete(id);
    if (!displayImage) {
        throw new ApiError(404, "Image not found");
    }

    // Delete from Cloudinary
    const publicId = getPublicId(displayImage.image);
    await deleteFromCloudinary(publicId);

    // If the deleted image was the display image, set another one as display
    if (displayImage.isDisplay) {
        const anotherImage = await FixImage.findOne();
        if (anotherImage) {
            await FixImage.findByIdAndUpdate(anotherImage._id, { isDisplay: true });
        }
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            null,
            "Image deleted successfully"
        ));
});

// Get All Display Images
const getAllDisplayImages = asyncHandler(async (req, res) => {
    // Fetch ALL display images sorted by newest first
    const displayImages = await FixImage.find()
        .sort({ createdAt: -1 })  // Newest first
        .select('image isDisplay createdAt') // Only return image URL, display status and timestamp
        .lean();                  // Convert to plain JS object

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            displayImages,  // Array of all images
            "All display images retrieved successfully"
        ));
});

// Get Current Display Image
const getCurrentDisplayImage = asyncHandler(async (req, res) => {
    // Find the current display image
    const displayImage = await FixImage.findOne({ isDisplay: true });
    if (!displayImage) {
        throw new ApiError(404, "No display image set");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            displayImage,
            "Current display image retrieved successfully"
        ));
});

// Set Display Image
const setDisplayImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid image ID");
    }

    // First, set all images to not display
    await FixImage.updateMany({}, { $set: { isDisplay: false } });

    // Then set the selected image as display
    const displayImage = await FixImage.findByIdAndUpdate(
        id,
        { $set: { isDisplay: true } },
        { new: true }
    );

    if (!displayImage) {
        throw new ApiError(404, "Image not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            displayImage,
            "Display image set successfully"
        ));
});

export {
    addDisplayImage,
    deleteDisplayImage,
    getAllDisplayImages,
    getCurrentDisplayImage,
    setDisplayImage
};