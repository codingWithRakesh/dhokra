import mongoose, { Schema, model } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { categorys } from "../constants.js"

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    priceFixed: {
        type: Number,
        required: true,
    },
    priceDiscount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
    material: {
        type: String,
    },
    utility: {
        type: String,
    },
    weight: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: categorys
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    images: [{
        type: String,
        required: true
    }]
}, { timestamps: true });

productSchema.plugin(mongooseAggregatePaginate);

export const Product = model('Product', productSchema);
