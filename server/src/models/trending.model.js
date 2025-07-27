import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const trendingSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
},{ timestamps: true });

trendingSchema.plugin(mongooseAggregatePaginate);

export const Trending = model("Trending", trendingSchema);
