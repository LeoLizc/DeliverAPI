import { Schema, model } from "mongoose";

const subProductSchema = new Schema(
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
    price: { // The subtotal of the product
      type: Number,
      required: true,
    },
  },
);

const orderStatus = Object.freeze({
  CREADO: 'Creado',
  ENVIADO: 'Enviado',
  ACEPTADO: 'Aceptado',
  RECIBIDO: 'Recibido',
  EN_DIRECCION: 'En dirección',
  REALIZADO: 'Realizado',
});
const OrderSchema = new Schema(
  {
    client: {
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
      enum: Object.values(orderStatus),
      default: orderStatus.CREADO,
    },
    deliveryPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    restaurantLocation: {
      latitude: {
        type: Number,
        required: [true, 'Ingresa la latitud de tu dirección.'],
      },
      longitude: {
        type: Number,
        required: [true, 'Ingresa la longitud de tu dirección.'],
      }
    },
    deliveryLocation: {
      latitude: {
        type: Number,
        required: [true, 'Ingresa la latitud de tu dirección.'],
      },
      longitude: {
        type: Number,
        required: [true, 'Ingresa la longitud de tu dirección.'],
      }
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

export const Order = model("Order", OrderSchema);
export default Order;