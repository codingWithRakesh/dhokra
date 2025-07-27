import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const availableCollectionSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
},{ timestamps: true });

availableCollectionSchema.plugin(mongooseAggregatePaginate);

export const AvailableCollection = model("AvailableCollection", availableCollectionSchema);
