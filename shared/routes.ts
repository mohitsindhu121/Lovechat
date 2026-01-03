import { z } from "zod";
import { insertMessageSchema, messages, insertGirlfriendSchema, girlfriends, insertMovieSchema, movies } from "./schema";

export const api = {
  messages: {
    list: {
      method: "GET" as const,
      path: "/api/messages",
      responses: {
        200: z.array(z.custom<typeof messages.$inferSelect>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/messages",
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
  girlfriend: {
    get: {
      method: "GET" as const,
      path: "/api/girlfriend",
      responses: {
        200: z.custom<typeof girlfriends.$inferSelect>(),
      },
    },
    update: {
      method: "PATCH" as const,
      path: "/api/girlfriend",
      input: insertGirlfriendSchema.partial(),
      responses: {
        200: z.custom<typeof girlfriends.$inferSelect>(),
      },
    },
  },
  movies: {
    list: {
      method: "GET" as const,
      path: "/api/movies",
      responses: {
        200: z.array(z.custom<typeof movies.$inferSelect>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/movies",
      input: insertMovieSchema,
      responses: {
        201: z.custom<typeof movies.$inferSelect>(),
      },
    },
    update: {
      method: "PATCH" as const,
      path: "/api/movies/:id",
      input: insertMovieSchema.partial(),
      responses: {
        200: z.custom<typeof movies.$inferSelect>(),
      },
    },
  },
};
