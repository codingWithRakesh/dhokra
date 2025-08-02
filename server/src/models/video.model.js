import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    video: {
        type: String,
        required: true
    }
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = model("Video", videoSchema);
