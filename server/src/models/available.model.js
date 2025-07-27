import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const upcomingSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
},{ timestamps: true });

upcomingSchema.plugin(mongooseAggregatePaginate);

export const Upcoming = model("Upcoming", upcomingSchema);
