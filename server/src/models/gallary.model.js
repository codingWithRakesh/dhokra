import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const gallerySchema = new Schema({
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

gallerySchema.plugin(mongooseAggregatePaginate);

export const Gallery = model("Gallery", gallerySchema);
