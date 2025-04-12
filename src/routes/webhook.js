import express from "express";
import { receiveOrderWebhook } from "../controllers/webhookController.js";

const router = express.Router();

router.post("/order", receiveOrderWebhook);

export default router;
