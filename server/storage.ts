import { type Message, type InsertMessage, type Girlfriend, type InsertGirlfriend, type Movie, type InsertMovie } from "@shared/schema";

export interface IStorage {
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  getGirlfriend(): Promise<Girlfriend | null>;
  updateGirlfriend(girlfriend: Partial<InsertGirlfriend>): Promise<Girlfriend>;
  getMovies(): Promise<Movie[]>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  updateMovie(id: number, movie: Partial<InsertMovie>): Promise<Movie>;
  deleteMovie(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, Message>;
  private girlfriends: Map<number, Girlfriend>;
  private movies: Map<number, Movie>;
  private currentId: number;

  constructor() {
    this.messages = new Map();
    this.girlfriends = new Map();
    this.movies = new Map();
    this.currentId = 1;

    // Default girlfriend
    this.girlfriends.set(1, { id: 1, name: "My Girlfriend", avatarUrl: null });
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeA - timeB;
    });
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentId++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      senderAvatar: insertMessage.senderAvatar ?? null,
      content: insertMessage.content ?? null,
      imageUrl: insertMessage.imageUrl ?? null,
    };
    this.messages.set(id, message);
    return message;
  }

  async getGirlfriend(): Promise<Girlfriend | null> {
    return this.girlfriends.get(1) ?? null;
  }

  async updateGirlfriend(update: Partial<InsertGirlfriend>): Promise<Girlfriend> {
    const existing = await this.getGirlfriend();
    const updated = {
      ...(existing || { id: 1, name: "My Girlfriend", avatarUrl: null }),
      ...update,
    };
    this.girlfriends.set(1, updated);
    return updated;
  }

  async getMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values()).sort((a, b) => {
      const timeA = a.watchedAt ? new Date(a.watchedAt).getTime() : 0;
      const timeB = b.watchedAt ? new Date(b.watchedAt).getTime() : 0;
      return timeB - timeA;
    });
  }

  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const id = this.currentId++;
    const movie: Movie = {
      ...insertMovie,
      id,
      watchedAt: new Date(),
      type: insertMovie.type ?? "movie",
      imageUrl: insertMovie.imageUrl ?? null,
      rating: insertMovie.rating ?? null,
      progress: insertMovie.progress ?? 0,
    };
    this.movies.set(id, movie);
    return movie;
  }

  async updateMovie(id: number, update: Partial<InsertMovie>): Promise<Movie> {
    const existing = this.movies.get(id);
    if (!existing) throw new Error("Movie not found");
    const updated = { ...existing, ...update };
    this.movies.set(id, updated);
    return updated;
  }

  async deleteMovie(id: number): Promise<void> {
    this.movies.delete(id);
  }
}

export const storage = new MemStorage();
