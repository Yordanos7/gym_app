import type { Request, Response } from "express"; // Import types for Request and Response
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/clerk-sdk-node";
import { PrismaClient } from "@prisma/client";
import express from "express"; // Import express for express.raw

const prisma = new PrismaClient();

export const handleClerkWebhook = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headers = req.headers as Record<string, string | string[] | undefined>; // Explicitly cast headers
  const payload = req.body;

  const svix_id = headers["svix-id"] as string;
  const svix_timestamp = headers["svix-timestamp"] as string;
  const svix_signature = headers["svix-signature"] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: "Error occured -- no svix headers" });
  }

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ Error: err });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      await prisma.user.create({
        data: {
          id,
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name}`,
          password: "", // Not needed when using Clerk for authentication
        },
      });
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Could not create user" });
    }
  }

  return res.status(200).send("");
};
