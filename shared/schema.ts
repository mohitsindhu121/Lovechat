import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  sender: text("sender").notNull(),
  senderAvatar: text("sender_avatar"),
  content: text("content"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export const girlfriends = pgTable("girlfriends", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
});

export const insertGirlfriendSchema = createInsertSchema(girlfriends).omit({
  id: true,
});

export type Girlfriend = typeof girlfriends.$inferSelect;
export type InsertGirlfriend = z.infer<typeof insertGirlfriendSchema>;

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url"),
  type: text("type").notNull().default("movie"), // 'movie' or 'series'
  watchedAt: timestamp("watched_at").defaultNow(),
  rating: integer("rating"),
  progress: integer("progress").notNull().default(0), // percentage 0-100
});

export const insertMovieSchema = createInsertSchema(movies).omit({
  id: true,
  watchedAt: true,
});

export type Movie = typeof movies.$inferSelect;
export type InsertMovie = z.infer<typeof insertMovieSchema>;
