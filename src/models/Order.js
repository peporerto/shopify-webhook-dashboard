import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: Number,
  email: String,
  totalPrice: String,
  currency: String,
  createdAt: Date
});

export default mongoose.model("Order", orderSchema);