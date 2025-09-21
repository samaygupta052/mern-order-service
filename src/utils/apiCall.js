const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5000/api/users';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:6001/api/products';

async function getUserById(userId) {
  try {
    const res = await axios.get(`${USER_SERVICE_URL}/${userId}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching user:', err.message);
    return null;
  }
}

async function getProductById(productId) {
  try {
    const res = await axios.get(`${PRODUCT_SERVICE_URL}/${productId}`);
    return res.data.product || null;
  } catch (err) {
    console.error('Error fetching product:', err.message);
    return null;
  }
}

module.exports = { getUserById, getProductById };
