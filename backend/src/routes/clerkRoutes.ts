import express from "express";
import { handleClerkWebhook } from "../controllers/clerkController.ts";

const router = express.Router();

router.post(
  "/webhooks/clerk",
  express.raw({ type: "application/json" }),
  handleClerkWebhook
);

export default router;

// in this code i use express.raw({ type: 'application/json' }) because svix uses unparsed json
