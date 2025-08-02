import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const fixImageSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    isDisplay: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

fixImageSchema.plugin(mongooseAggregatePaginate);

export const FixImage = model("FixImage", fixImageSchema);