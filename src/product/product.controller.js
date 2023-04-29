import Product from "./product.model";

export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ data: product });
  } catch (e) {
    return res.status(400).json({ error: true, message: "Error creando producto" });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      return res.status(404).json({ error: true, message: "Producto no encontrado" });
    }
    return res.status(200).json({ data: product });
  } catch (e) {
    return res.status(400).json({ error: true, message: "Error obteniendo producto" });
  }
}

export async function updateProduct(req, res) {

  const { name, description, price, category } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category },
      { new: true }
    ).exec();

    if (!updatedProduct) {
      return res.status(404).json({ error: true, message: "Producto no encontrado" });
    }

    return res.status(200).json({ data: updatedProduct });
  } catch (e) {
    return res.status(400).json({ error: true, message: "Error actualizando producto" });
  }
}

export async function updateManyProduct(req, res) {
  const products = req.body;

  try {
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const updatedProduct = await Product.findByIdAndUpdate(
          product.id,
          {
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
          },
          { new: true }
        ).exec();
        return updatedProduct;
      })
    );

    return res.status(200).json({ data: updatedProducts });
  } catch (e) {
    return res.status(400).json({ error: true, message: "Error actualizando productos" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: true, message: "Producto no encontrado" });
    }

    const deletedProduct = await product.delete();

    return res.status(200).json({ data: deletedProduct });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: true, message: "Error eliminando producto" });
  }
}

export async function getManyProduct(req, res) {
  const { restaurant_id, category, name } = req.query;

  try {
    const products = await Product.find(
      {
        ...(restaurant_id && { restaurant: restaurant_id }),
        ...(category && { category }),
        ...(name && { name: { $regex: name, $options: "i" } }),
      }
    )

    return res.status(200).json({ data: products });
  } catch (e) {
    return res.status(400).json({ error: true, message: "Error obteniendo productos" });
  }
}