const Order = require('../models/orderModel');
const { getUserById, getProductById } = require('../utils/apiCall');

const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate user
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate products and calculate total price
    let totalPrice = 0;
    for (let item of products) {
      const product = await getProductById(item.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });
      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({ userId, products, totalPrice });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Fetch user and product details
    const user = await getUserById(order.userId);
    const productsDetailed = [];
    for (let item of order.products) {
      const product = await getProductById(item.productId);
      if (product) productsDetailed.push({ ...product, quantity: item.quantity });
    }

    res.json({ order, user, products: productsDetailed });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById };
