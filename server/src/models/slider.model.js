import { Schema, model } from "mongoose";

const sliderSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const Slider = model("Slider", sliderSchema);
