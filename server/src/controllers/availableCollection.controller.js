import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/products.model.js";
import { AvailableCollection } from "../models/availableCollection.model.js";
import mongoose from "mongoose";

// Add Product to Available Collection
const addToAvailableCollection = asyncHandler(async (req, res) => {
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

    // Check if already in collection
    const existingItem = await AvailableCollection.findOne({ productId });
    if (existingItem) {
        throw new ApiError(400, "Product already in available collection");
    }

    // Add to collection
    const collectionItem = await AvailableCollection.create({ productId });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            collectionItem,
            "Product added to available collection successfully"
        ));
});

// Remove Product from Available Collection
const removeFromAvailableCollection = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid collection item ID");
    }

    // Delete from collection
    const deletedItem = await AvailableCollection.findByIdAndDelete(id);

    if (!deletedItem) {
        throw new ApiError(404, "Collection item not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            null,
            "Product removed from available collection successfully"
        ));
});

// Get All Available Collection Products (with product details)
const getAllAvailableCollectionProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        populate: {
            path: 'productId',
            select: 'name priceFixed priceDiscount images category isAvailable'
        }
    };

    const collectionProducts = await AvailableCollection.aggregatePaginate(
        AvailableCollection.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            { $sort: { createdAt: -1 } }
        ]),
        options
    );

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            collectionProducts,
            "Available collection products retrieved successfully"
        ));
});

// Get Available Collection Count
const getAvailableCollectionCount = asyncHandler(async (req, res) => {
    const count = await AvailableCollection.countDocuments();

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { count },
            `Total products in available collection: ${count}`
        ));
});

export {
    addToAvailableCollection,
    removeFromAvailableCollection,
    getAllAvailableCollectionProducts,
    getAvailableCollectionCount
};