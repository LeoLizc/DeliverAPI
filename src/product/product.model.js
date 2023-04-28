import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ingresa el nombre del producto.']
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Ingresa el precio del producto.']
    },
    category: {
      type: String,
      required: [true, 'Ingresa la categoría del producto.']
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', ProductSchema);
export default Product;