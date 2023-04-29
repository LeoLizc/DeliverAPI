import Restaurant from "./restaurant.model";
import Product from "../product/product.model";
import { PERIODS, sameDay, sameMonth, sameWeek, sameYear } from "../../helpers/utils";

export async function createRestaurant(req, res) {
  let { products, ...restaurantData } = req.body;
  try {
    const restaurant = await Restaurant.create(restaurantData);

    if (products) {
      if (!Array.isArray(products)) {
        products = [products];
      }
      if (products.length > 0) {
        const productsWithRestaurant = products.map(product => ({
          ...product,
          restaurant: restaurant._id,
        }));
        await Product.insertMany(productsWithRestaurant);
      }
    }

    return res.status(201).json({ data: restaurant });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
}

export async function getRestaurantOrders(req, res) {
  const restaurantId = req.params.id;
  const { status, period } = req.query; //* period: today, week, month, year

  try {

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({ message: "Restaurant not found" });
    }

    const orders = (await restaurant.orders).filter(order => {
      if (status && order.status !== status) {
        return false;
      }

      if (period) {

        if (!Object.values(PERIODS).includes(period)) {
          return res.status(400).send({ message: "Invalid period" });
        }

        const orderDate = new Date(order.createdAt);
        const now = new Date();

        if (period === PERIODS.TODAY) {
          return sameDay(orderDate, now);
        }

        if (period === PERIODS.WEEK) {
          return sameWeek(orderDate, now);
        }

        if (period === PERIODS.MONTH) {
          return sameMonth(orderDate, now);
        }

        if (period === PERIODS.YEAR) {
          return sameYear(orderDate, now);
        }
      }
      return true;
    });
    return res.json(orders);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function addProductsToRestaurant(req, res) {
  const restaurantId = req.params.id;
  let products = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({ message: "Restaurant not found" });
    }

    if (!Array.isArray(products)) {
      products = [products];
    }

    if (products.length > 0) {
      const productsWithRestaurant = products.map(product => ({
        ...product,
        restaurant: restaurant._id,
      }));

      await Product.insertMany(productsWithRestaurant);
    }

    return res.status(201).send({ message: "Products added successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function getRestaurantProducts(req, res) {
  const restaurantId = req.params.id;
  const { category, name } = req.query;

  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({ message: "Restaurant not found" });
    }

    const products = await Product.find({
      restaurant: restaurantId,
      ...(category && { category }),
      ...(name && { name: { $regex: name, $options: "i" } }),
    });

    return res.send(products);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function getManyRestaurants(req, res) {
  const { name, category } = req.query;

  try {
    // Restaurants should be sorted by number of orders which is a virtual field
    let restaurants = await Restaurant.find({
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...(category && { category }),
    });

    restaurants = restaurants.map(restaurant => ({
      ...restaurant._doc,
      orders: restaurant.orders.length,
    }));

    restaurants.sort((a, b) => b.orders - a.orders);

    return res.json(restaurants);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function getRestaurant(req, res) {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findById(restaurantId).populate("products");

    if (!restaurant) {
      return res.status(404).send({ message: "Restaurant not found" });
    }

    return res.json({ ...restaurant._doc, products: restaurant.products });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
}

export async function updateRestaurant(req, res) {
  const restaurantId = req.params.id;
  const { name, category, address, products } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({ message: "Restaurant not found" });
    }

    if (name) {
      restaurant.name = name;
    }

    if (category) {
      restaurant.category = category;
    }

    if (address) {
      restaurant.address = address;
    }

    if (products) {
      if (!Array.isArray(products)) {
        products = [products];
      }

      if (products.length > 0) {
        const productsWithRestaurant = products.map(product => ({
          ...product,
          restaurant: restaurant._id,
        }));

        await Product.insertMany(productsWithRestaurant);
      }
    }

    await restaurant.save();

    return res.json(restaurant);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function deleteRestaurant(req, res) {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({ message: "Restaurant not found" });
    }

    await restaurant.delete();

    return res.send({ message: "Restaurant deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}