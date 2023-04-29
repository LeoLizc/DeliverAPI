import mongoose from "mongoose";
import Order from "../order/order.model";
import Product from "../product/product.model";

/**
 * @description - Restaurant Schema
 *  - A restaurant has a name, an address, and a category
 */
const RestaurantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: [true, "Nombra tu restaurante."] },
    category: { type: String, required: [true, "Necesitamos tu categoría."] },
    address: {
      address: {
        type: String,
        required: [true, "Ingresa la dirección de tu restaurante."],
      },
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
      orders: {
        get() {
          return Order.find({ restaurant: this._id });
        }
      }
    },
  }
);

RestaurantSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "restaurant",
  justOne: false,
});

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
export default Restaurant;