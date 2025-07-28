import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/products.model.js";
import { Trending } from "../models/trending.model.js";
import mongoose from "mongoose";

// Add Product to Trending
const addToTrending = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Check if already in trending
    const existingTrending = await Trending.findOne({ productId });
    if (existingTrending) {
        throw new ApiError(400, "Product already in trending list");
    }

    // Add to trending
    const trendingProduct = await Trending.create({ productId });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            trendingProduct,
            "Product added to trending successfully"
        ));
});

// Remove Product from Trending
const removeFromTrending = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid trending item ID");
    }

    // Delete from trending
    const deletedItem = await Trending.findByIdAndDelete(id);

    if (!deletedItem) {
        throw new ApiError(404, "Trending item not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            null,
            "Product removed from trending successfully"
        ));
});

// Get All Trending Products (with product details)
const getAllTrendingProducts = asyncHandler(async (req, res) => {
    // Fetch ALL trending products with product details
    const trendingProducts = await Trending.aggregate([
        {
            $lookup: {
                from: 'products',          // Join with products collection
                localField: 'productId',   // Match this field
                foreignField: '_id',       // With product's _id
                as: 'product'             // Store as 'product'
            }
        },
        { $unwind: '$product' },           // Convert array to object
        { $sort: { createdAt: -1 } },      // Newest first
        {
            $project: {                    // Only return needed fields
                'product.name': 1,
                'product.priceFixed': 1,
                'product.priceDiscount': 1,
                'product.images': 1,
                'product.category': 1,
                'product.isAvailable': 1,
                createdAt: 1
            }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            trendingProducts,  // Array of ALL trending products with details
            "All trending products retrieved successfully"
        ));
});

// Get Trending Product Count
const getTrendingCount = asyncHandler(async (req, res) => {
    const count = await Trending.countDocuments();

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { count },
            `Total trending products: ${count}`
        ));
});

export {
    addToTrending,
    removeFromTrending,
    getAllTrendingProducts,
    getTrendingCount
};