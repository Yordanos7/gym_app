import type { Request, Response } from "express";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/backend";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const handleClerkWebhook = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
    );
  }

  const headers = req.headers as Record<string, string | string[] | undefined>;
  const payload = req.body.toString(); // this is  used for get the body and convert it to string

  const svix_id = headers["svix-id"] as string;
  const svix_timestamp = headers["svix-timestamp"] as string;
  const svix_signature = headers["svix-signature"] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: "Missing svix headers" });
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
    return res.status(400).json({ error: "Invalid signature" });
  }

  console.log("Clerk webhook received.");
  const eventType = evt.type;
  console.log(`Event type: ${eventType}`);

  if (eventType === "user.created") {
    console.log("Processing user.created event.");
    const { id, email_addresses, first_name, last_name } = evt.data;
    console.log("User data from Clerk:", JSON.stringify(evt.data, null, 2));
    try {
      await prisma.user.create({
        data: {
          id,
          email: email_addresses[0].email_address,
          name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
          password: "", // Clerk manages auth
        },
      });
      console.log(`User with ID ${id} created successfully.`);
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Could not create user" });
    }
  }

  return res.status(200).send("");
};
