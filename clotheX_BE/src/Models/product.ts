import { model, Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type : String,
    require : true,
  },
  price: Number,
  description: String,
  clothingType: String,
  category: String,
  tags: [String],
  images: [String],
  sizes: [String],
  rating: Number,
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});


export const productModel = model ("Product" , productSchema);