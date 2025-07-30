import mongoose, {Schema, model} from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    priceFixed: {
        type : Number,
        required: true,
    },
    priceDiscount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    color : {
        type: String,
    },
    size : {
        type: String,
    },
    material : {
        type: String,
    },
    utility : {
        type: String,
    },
    weight : {
        type: String,
    },
    category: {
        type : String,
        required: true,
        enum: ["gi-bengal-dokra", "patina-finish-on-dokra", "wall-hanging", "table-top", "home-decore", "candle-stands"]
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    images: [{
        type: String,
        required: true
    }]
},{timestamps: true});

productSchema.plugin(mongooseAggregatePaginate);

export const Product = model('Product', productSchema);
