import {model, Schema} from "mongoose";

const reviewSchema = new Schema({
    review : String,
    rating : Number,
    productId : {
        type : Schema.Types.ObjectId,
        ref : "Product",
    },
    reviewerId : {
        type : Schema.Types.ObjectId,
        ref: "User",
    }
})

export const reviewModel = model("Review" , reviewSchema );