import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import webhookRoutes from "./routes/webhook.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vistas y EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));


// Middleware para capturar rawBody (para Shopify Webhook)
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Rutas
app.use("/webhook", webhookRoutes);
app.use("/", dashboardRoutes);

export default app;
