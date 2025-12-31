import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.messages.list.path, async (_req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      console.log("Received message create request:", {
        ...req.body,
        senderAvatar: req.body.senderAvatar ? "base64..." : null,
        imageUrl: req.body.imageUrl ? "base64..." : null
      });
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      console.error("Error creating message:", err);
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message, details: err.errors });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

  return httpServer;
}
