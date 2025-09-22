const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 7000;
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", message: "User Service is running 🚀" });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
  })
  .catch(err => console.error(err));
