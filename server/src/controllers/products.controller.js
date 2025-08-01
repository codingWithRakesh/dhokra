import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/products.model.js";
import { uploadOnCloudinary, deleteFromCloudinary, getPublicId } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Constants
const MAX_IMAGES_PER_PRODUCT = 5;
const VALID_CATEGORIES = [
    "gi-bengal-dokra", 
    "patina-finish-on-dokra", 
    "wall-hanging", 
    "table-top", 
    "home-decore", 
    "candle-stands"
];

// Helper function to validate category
const isValidCategory = (category) => VALID_CATEGORIES.includes(category);

// Helper function to upload images with validation
const uploadImagesFromMemory = async (files, existingCount = 0) => {
    if (!files) return [];
    
    const filesArray = Array.isArray(files) ? files : [files];
    
    if (existingCount + filesArray.length > MAX_IMAGES_PER_PRODUCT) {
        throw new ApiError(400, `Maximum ${MAX_IMAGES_PER_PRODUCT} images allowed per product`);
    }
    
    const imageUrls = [];
    
    for (const file of filesArray) {
        const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const result = await uploadOnCloudinary(base64Image);
        
        if (!result) {
            // Cleanup on failure
            await Promise.all(imageUrls.map(url => 
                deleteFromCloudinary(getPublicId(url))
            ));
            throw new ApiError(500, "Failed to upload one or more images");
        }
        imageUrls.push(result.secure_url);
    }
    
    return imageUrls;
};

// Create Product
const createProduct = asyncHandler(async (req, res) => {
     const { 
        name, 
        priceFixed, 
        priceDiscount, 
        description, 
        color, 
        size, 
        material, 
        utility, 
        weight,  // Add weight here
        category, 
    } = req.body;

    // Validation
    if ([name, priceFixed, priceDiscount, category].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "Name, priceFixed, priceDiscount and category are required");
    }

    if (!isValidCategory(category)) {
        throw new ApiError(400, `Invalid category. Valid categories: ${VALID_CATEGORIES.join(", ")}`);
    }

    if (!req.files || !req.files.length) {
        throw new ApiError(400, "At least one image is required");
    }

    // Upload images
    const imageUrls = await uploadImagesFromMemory(req.files);

    // Create product
    const product = await Product.create({
        name,
        priceFixed: parseFloat(priceFixed),
        priceDiscount: parseFloat(priceDiscount),
        description,
        color,
        size,
        material,
        utility,
        weight,  // Add weight here
        category,
        images: imageUrls
    });

    return res
        .status(201)
        .json(new ApiResponse(201, product, "Product created successfully"));
});

// Get All Products (with pagination and filters)
const getAllProducts = asyncHandler(async (req, res) => {
    const { 
        category, 
        isUpcoming, 
        search, 
        page = 1, 
        limit = 10 
    } = req.query;

    const matchStage = {};
    
    if (category && isValidCategory(category)) {
        matchStage.category = category;
    }
    
    if (isUpcoming !== undefined) {
        matchStage.isUpcoming = isUpcoming === 'true';
    }
    
    if (search) {
        matchStage.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    const pipeline = [];
    if (Object.keys(matchStage).length) pipeline.push({ $match: matchStage });
    pipeline.push({ $sort: { createdAt: -1 } });

    const options = {
        page: Math.max(1, parseInt(page)),
        limit: Math.min(50, Math.max(1, parseInt(limit)))
    };

    const products = await Product.aggregatePaginate(
        Product.aggregate(pipeline), 
        options
    );

    return res
        .status(200)
        .json(new ApiResponse(200, products, "Products retrieved successfully"));
});

// Get Product by ID
const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product retrieved successfully"));
});


// Get Product by Name
const getProductByName = asyncHandler(async (req, res) => {
    const { name } = req.params;

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Product name is required");
    }

    // Case-insensitive search for the product name
    const product = await Product.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product retrieved successfully"));
});

// Get Available Product by Name
const getAvailableProductByName = asyncHandler(async (req, res) => {
    const { name } = req.params;

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Product name is required");
    }

    // Case-insensitive exact match and must be available
    const product = await Product.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        isAvailable: true
    });

    if (!product) {
        throw new ApiError(404, "Product not found or not available");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Available product retrieved successfully"));
});

// Get Products by Category
const getProductsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    // Validate category
    if (!isValidCategory(category)) {
        throw new ApiError(400, `Invalid category. Valid categories: ${VALID_CATEGORIES.join(", ")}`);
    }

    // Fetch ALL products in this category, newest first
    const products = await Product.find({ category })
        .sort({ createdAt: -1 })  // Newest first
        .select('name priceFixed priceDiscount images category isAvailable createdAt') // Only essential fields
        .lean();                  // Faster JSON conversion

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            products,  // Array of ALL products in this category
            `All products in ${category} category retrieved successfully`
        ));
});

// Get Available Products by Category
const getAvailableProductsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    // Validate category
    const validCategories = ["gi-bengal-dokra", "patina-finish-on-dokra", "wall-hanging", 
                           "table-top", "home-decore", "candle-stands"];
    if (!validCategories.includes(category)) {
        throw new ApiError(400, `Invalid category. Valid categories: ${validCategories.join(", ")}`);
    }

    // Fetch ALL available products in this category
    const products = await Product.find({ 
        category,
        isAvailable: true 
    })
    .sort({ createdAt: -1 })  // Newest first
    .select('name priceFixed priceDiscount images category createdAt') // Essential fields
    .lean();                  // Faster JSON conversion

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            products,  // Array of ALL available products
            `All available products in ${category} category retrieved successfully`
        ));
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    // Find existing product
    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Validate category if being updated
    if (updateData.category && !isValidCategory(updateData.category)) {
        throw new ApiError(400, `Invalid category. Valid categories: ${VALID_CATEGORIES.join(", ")}`);
    }

    // Prepare update fields
    const updateFields = {
        ...(updateData.name && { name: updateData.name }),
        ...(updateData.priceFixed && { priceFixed: parseFloat(updateData.priceFixed) }),
        ...(updateData.priceDiscount && { priceDiscount: parseFloat(updateData.priceDiscount) }),
        ...(updateData.description && { description: updateData.description }),
        ...(updateData.color && { color: updateData.color }),
        ...(updateData.size && { size: updateData.size }),
        ...(updateData.material && { material: updateData.material }),
        ...(updateData.utility && { utility: updateData.utility }),
        ...(updateData.weight && { weight: updateData.weight }), 
        ...(updateData.category && { category: updateData.category }),
    };

    // Handle image updates
    if (req.files && (req.files.length > 0 || req.files.buffer)) {
        const keepExisting = updateData.keepExistingImages !== "false";
        const existingCount = keepExisting ? product.images.length : 0;
        
        const newImageUrls = await uploadImagesFromMemory(req.files, existingCount);
        
        if (keepExisting) {
            updateFields.images = [...product.images, ...newImageUrls];
        } else {
            // Delete old images
            await Promise.all(
                product.images.map(url => 
                    deleteFromCloudinary(getPublicId(url))
                )
            );
            updateFields.images = newImageUrls;
        }
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true, runValidators: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

// Toggle Product Availability
const toggleProductAvailability = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    // Find and update the product
    const product = await Product.findByIdAndUpdate(
        id,
        [
            {
                $set: {
                    isAvailable: { $not: "$isAvailable" }
                }
            }
        ],
        { new: true, runValidators: true }
    );

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200, 
            product, 
            `Product availability set to ${product.isAvailable} successfully`
        ));
});

const getTotalProductsCount = asyncHandler(async (req, res) => {
    const totalCount = await Product.countDocuments({});
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { total: totalCount },
            `Total products: ${totalCount}`
        ));
});

// Get Product Count by Category
const getProductCountByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    // Validate category against enum values
    const validCategories = ["gi-bengal-dokra", "patina-finish-on-dokra", "wall-hanging", "table-top", "home-decore", "candle-stands"];
    
    if (!validCategories.includes(category)) {
        throw new ApiError(400, `Invalid category. Valid categories are: ${validCategories.join(", ")}`);
    }

    // Count products in the specified category
    const count = await Product.countDocuments({ category });

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { 
                category,
                count 
            },
            `Found ${count} products in ${category} category`
        ));
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Delete all images from Cloudinary
    await Promise.all(
        product.images.map(url => 
            deleteFromCloudinary(getPublicId(url))
        )
    );

    // Delete product from database
    await Product.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Product deleted successfully"));
});

// Delete Image from Product
const deleteProductImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { imageUrl } = req.body;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
        throw new ApiError(400, "Valid imageUrl is required");
    }

    // Find the product
    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Check if image exists in product's images
    const imageIndex = product.images.indexOf(imageUrl);
    if (imageIndex === -1) {
        throw new ApiError(404, "Image not found in this product");
    }

    // Delete from Cloudinary
    const publicId = getPublicId(imageUrl);
    const cloudinaryResult = await deleteFromCloudinary(publicId);
    
    if (!cloudinaryResult || cloudinaryResult.result !== 'ok') {
        throw new ApiError(500, "Failed to delete image from Cloudinary");
    }

    // Remove from array and save
    product.images.splice(imageIndex, 1);
    await product.save();

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Image deleted successfully"));
});

export {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getAvailableProductByName,
    getProductsByCategory,
    getAvailableProductsByCategory,
    updateProduct,
    toggleProductAvailability,
    getTotalProductsCount,
    getProductCountByCategory,
    deleteProduct,
    deleteProductImage
};