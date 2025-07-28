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
    // 1. Fetch ALL records and populate product details
    const collections = await AvailableCollection.aggregate([
        {
            $lookup: {
                from: 'products',           // Join with Products
                localField: 'productId',    // Match this field...
                foreignField: '_id',        // ...with Product's _id
                as: 'product'               // Store joined data here
            }
        },
        { $unwind: '$product' },        // Convert array to object
        { $sort: { createdAt: -1 } },   // Newest first
        {
            $project: {                   // Only return needed fields
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

    // 2. Send complete list
    return res.status(200).json(
        new ApiResponse(
            200,
            collections, // ALL records (no pagination)
            "All available collection products fetched successfully"
        )
    );
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