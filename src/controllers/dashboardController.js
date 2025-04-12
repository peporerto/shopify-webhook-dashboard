import Order from "../models/Order.js";

export const renderDashboard = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(10);
    res.render("orders", { orders }); 
  } catch (error) {
    res.status(500).send("Error loading dashboard");
  }
};
