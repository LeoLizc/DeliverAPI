import mongoose from "mongoose";

/**
 * @description - Restaurant Schema
 *  - A restaurant has a name, an address, and a category
 */
const RestaurantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: [true, "Nombra tu restaurante."] },
    category: { type: String, required: [true, "Necesitamos tu categoría."] },
    address: {
      latitude: {
        type: Number,
        required: [true, "Ingresa la latitud de tu dirección."],
      },
      longitude: {
        type: Number,
        required: [true, "Ingresa la longitud de tu dirección."],
      },
    },
  },
  {
    timestamps: true,
    virtuals: {
      products: {
        ref: "Product",
        localField: "_id",
        foreignField: "restaurant",
        justOne: false,
      },
    },
  }
);

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
export default Restaurant;