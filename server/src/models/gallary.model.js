import { Schema, model } from "mongoose";

const gallerySchema = new Schema({
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Gallery = model("Gallery", gallerySchema);
