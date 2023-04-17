import mongoose from "mongoose";

/**
 * @description - Restaurant Schema
 *  - A restaurant has a name, an address, and a category
 */
const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Nombra tu restaurante."] },
    address: { type: String, required: [true, "Necesitamos tu dirección."] },
    category: { type: String, required: [true, "Necesitamos tu categoría."] },
  },
  {
    timestamps: true,
  }
);

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);