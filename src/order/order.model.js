import mongoose from "mongoose";

const subProductSchema = new mongoose.Schema(
  {
    productId: {// The id of the product
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {// The name of the product
      type: String,
      required: true,
    },
    quantity: {// The quantity of the product bought by the user
      type: Number,
      required: true,
    },
    price: { // The price of the product
      type: Number,
      required: true,
    },
  },
);

const orderStatus = [
  'Creado',
  'Enviado',
  'Aceptado',
  'Recibido',
  'En dirección',
  'Realizado',
]
const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    products: [
      subProductSchema
    ],
    status: {
      type: String,
      enum: orderStatus,
      default: "pending",
    },
    deliveryPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    virtuals: {
      total: {
        get() {
          return this.products.reduce((acc, product) => {
            return acc + product.price * product.quantity;
          }, 0);
        },
      },
    }
  }
);

export default mongoose.model("Order", OrderSchema);