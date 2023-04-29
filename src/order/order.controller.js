import Order, { orderStatus, orderStatusChange } from "./order.model";
import { Address } from '../user/user.model'
import Restaurant from "../restaurant/restaurant.model";
import Product from "../product/product.model";
import { PERIODS, compareDates, euclideanDistance } from "../../helpers/utils";

export async function createOrder(req, res) {
  const { products, address: addressId, client, restaurant: restaurantId } = req.body;

  try {
    const address = await Address.findById(addressId);
    const { address: restaurantAddress } = await Restaurant.findById(restaurantId).select(['address']);
    const populatedProducts = await Promise.all(products.map(async (product) => {
      const { name, price } = await Product.findById(product.productId);
      return {
        ...product,
        productName: name,
        price: product.quantity * price,
      };
    }));

    const order = await Order.create({
      client,
      products: populatedProducts,
      restaurant: restaurantId,
      deliveryAddress: addressId,
      deliveryLocation: {
        latitude: address.latitude,
        longitude: address.longitude,
      },
      restaurantAddress: restaurantAddress.address,
      restaurantLocation: {
        latitude: restaurantAddress.latitude,
        longitude: restaurantAddress.longitude,
      },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function updateOrder(req, res) {
  const { id } = req.params;
  const { products, address: addressId } = req.body;

  // start the update
  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== orderStatus.CREADO) {
      return res.status(400).json({ message: 'Order already sent' });
    }

    const address = await Address.findById(addressId);
    const populatedProducts = await Promise.all(products.map(async (product) => {
      const { name, price } = await Product.findById(product.productId);
      return {
        ...product,
        productName: name,
        price: product.quantity * price,
      };
    }));

    order.products = populatedProducts;
    order.deliveryAddress = addressId;
    order.deliveryLocation = {
      latitude: address.latitude,
      longitude: address.longitude,
    };

    await order.save();

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function getManyOrders(req, res) {
  const { status, period } = req.query;
  try {
    let orders = await Order.find({
      ...(status && { status }),
    });

    if (period) {

      if (!Object.values(PERIODS).includes(period)) {
        return res.status(400).json({ message: 'Invalid period' });
      }

      const date = new Date();
      orders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return compareDates[period](orderDate, date);
      });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function updateOrderStatus(req, res) {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === orderStatus.REALIZADO) {
      return res.status(400).json({ message: 'Order already accepted' });
    }

    const newstatus = orderStatusChange[order.status];

    order.status = newstatus;
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function getOrder(req, res) {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function getSentOrders(req, res) {
  const ORDER_BY_OPTIONS = Object.freeze({
    RESTAURANT_DISTANCE: "restaurant_distance",
    CLIENT_DISTANCE: "client_distance",
    AGE: "age"
  });
  const { order_by: orderBy, latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Missing latitude or longitude' });
  }

  try {
    const orders = await Order.find({
      status: orderStatus.ENVIADO,
    });

    if (orderBy) {
      if (!Object.values(ORDER_BY_OPTIONS).includes(orderBy)) {
        return res.status(400).json({ message: 'Invalid order by' });
      }

      orders.sort((a, b) => {
        switch (orderBy) {
          case ORDER_BY_OPTIONS.RESTAURANT_DISTANCE:
            return euclideanDistance(a.restaurantLocation, { latitude, longitude }) - euclideanDistance(b.restaurantLocation, { latitude, longitude });
          case ORDER_BY_OPTIONS.CLIENT_DISTANCE:
            return euclideanDistance(a.deliveryLocation, { latitude, longitude }) - euclideanDistance(b.deliveryLocation, { latitude, longitude });
          case ORDER_BY_OPTIONS.AGE:
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
      })
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}