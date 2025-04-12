import crypto from "crypto";
import Order from "../models/Order.js";
import dotenv from "dotenv";
dotenv.config();

export const receiveOrderWebhook = async (req, res) => {
  try {
    const hmac = req.headers["x-shopify-hmac-sha256"];
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

    const hash = crypto
      .createHmac("sha256", secret)
      .update(req.rawBody, "utf8")
      .digest("base64");

    if (hash !== hmac) {
      return res.status(401).send("Unauthorized");
    }

    const data = req.body;

    const order = new Order({
      orderId: data.id,
      email: data.email,
      totalPrice: data.total_price,
      currency: data.currency,
      createdAt: new Date(data.created_at)
    });

    await order.save();

    res.status(200).send("Order saved");
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).send("Internal Server Error");
  }
};
