import { useQuery, useMutation } from "@tanstack/react-query";
import { Movie, InsertMovie, Girlfriend } from "@shared/schema";
import { api } from "@shared/routes";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMovieSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, Info, ChevronLeft, Edit2, Check } from "lucide-react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function MovieTracker() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editProgress, setEditProgress] = useState<number>(0);

  const { data: movies = [], isLoading: loadingMovies } = useQuery<Movie[]>({
    queryKey: [api.movies.list.path],
  });

  const { data: girlfriend } = useQuery<Girlfriend>({
    queryKey: [api.girlfriend.get.path],
  });

  const createMutation = useMutation({
    mutationFn: async (values: InsertMovie) => {
      await apiRequest("POST", api.movies.create.path, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.movies.list.path] });
      toast({ title: "Movie added!", description: "Enjoy your watch together!" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: number, values: Partial<InsertMovie> }) => {
      await apiRequest("PATCH", `/api/movies/${id}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.movies.list.path] });
      setEditingId(null);
      toast({ title: "Updated!", description: "Movie progress updated." });
    },
  });

  const form = useForm<InsertMovie>({
    resolver: zodResolver(insertMovieSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      type: "movie",
      rating: 5,
      progress: 0,
    },
  });

  const onSubmit = (values: InsertMovie) => {
    createMutation.mutate(values);
    form.reset();
  };

  const latestMovie = movies[0];

  const handlePlayLatest = () => {
    if (latestMovie) {
      if (latestMovie.imageUrl) {
        window.open(latestMovie.imageUrl, '_blank');
      } else {
        toast({ title: "Enjoy!", description: `Starting ${latestMovie.title}...` });
      }
    } else {
      toast({ title: "No movies yet", description: "Add a movie to start watching together!" });
    }
  };

  const totalMovies = movies.length;
  const goal = 100;
  const progressPercent = Math.min(Math.round((totalMovies / goal) * 100), 100);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: latestMovie?.imageUrl ? `url(${latestMovie.imageUrl})` : 'url(https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-16 max-w-4xl">
          <Link href="/">
            <Button variant="ghost" className="mb-4 md:mb-8 text-white hover:bg-white/20 w-fit h-auto py-2">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Love
            </Button>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
            <span className="bg-red-600 text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded">PERSONAL</span>
            <span className="text-gray-400 text-xs md:text-sm font-medium">{latestMovie?.type || 'Avatar'} • Together Forever</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-2 md:mb-4 tracking-tighter uppercase leading-tight">
            {latestMovie?.title || "Movie Nights"}
          </h1>
          
          <p className="text-sm md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl leading-relaxed line-clamp-3 md:line-clamp-none">
            {latestMovie ? `We watched this memory on ${new Date(latestMovie.watchedAt!).toLocaleDateString()}. Dedicated to ${girlfriend?.name || "Us"}.` : "Tracking every laugh, every scare, and every tear we've shared through cinema."}
          </p>

          <div className="flex gap-2 md:gap-4">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 px-4 md:px-8 py-4 md:py-6 text-sm md:text-xl font-bold flex-1 md:flex-none"
              onClick={handlePlayLatest}
            >
              <Play className="mr-2 fill-current h-4 w-4 md:h-6 md:w-6" /> Play Latest
            </Button>
            <Button size="lg" variant="secondary" className="bg-gray-500/50 text-white hover:bg-gray-500/70 px-4 md:px-8 py-4 md:py-6 text-sm md:text-xl font-bold flex-1 md:flex-none">
              <Info className="mr-2 h-4 w-4 md:h-6 md:w-6" /> More Info
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-16 -mt-16 md:-mt-32 relative z-20 pb-20 space-y-8 md:space-y-12">
        {/* Progress Tracker */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-200">Our Journey: {totalMovies} / {goal} Movies</h2>
          <div className="bg-zinc-900/80 backdrop-blur-md p-4 md:p-8 rounded-xl border border-white/10 max-w-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" stroke="#262626" strokeWidth="8"
                  />
                  <motion.circle 
                    cx="50" cy="50" r="45" 
                    fill="none" stroke="url(#gradient)" strokeWidth="8"
                    strokeDasharray="282.7"
                    initial={{ strokeDashoffset: 282.7 }}
                    animate={{ strokeDashoffset: 282.7 - (282.7 * progressPercent) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-black text-white">{progressPercent}%</span>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left space-y-1 md:space-y-2">
                <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">Current Milestone</p>
                <p className="text-xl md:text-3xl font-black text-white leading-tight">Movie Buff Couples</p>
                <p className="text-xs md:text-sm text-gray-500 italic">Next reward: Fancy Dinner Date at 50 movies!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Watchlist Grid */}
        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-200">Our Watchlist</h2>
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/20 hover:bg-white/10 text-xs md:text-sm h-8 md:h-10"
              onClick={() => document.getElementById('add-movie-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Plus className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Add Movie
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                className="relative aspect-[2/3] group cursor-pointer"
              >
                <img 
                  src={movie.imageUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"} 
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-md transition-shadow group-hover:shadow-2xl group-hover:shadow-red-600/20"
                />
                
                {/* Watch Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-zinc-800 rounded-b-md overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${movie.progress}%` }}
                    className="h-full bg-red-600"
                  />
                </div>

                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex flex-col p-2 md:p-4">
                  <div className="flex-1">
                    <p className="font-bold text-xs md:text-sm truncate">{movie.title}</p>
                    <div className="flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1">
                      <span className="text-[8px] md:text-[10px] bg-white/20 px-1 rounded uppercase font-black">{movie.type}</span>
                      <span className="text-[8px] md:text-[10px] text-green-400 font-bold">{movie.rating}/5</span>
                    </div>
                  </div>

                  <div className="mt-auto space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">{movie.progress}% Watched</span>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6 text-white hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(movie.id);
                          setEditProgress(movie.progress);
                        }}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <AnimatePresence>
                      {editingId === movie.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <Slider 
                            value={[editProgress]} 
                            onValueChange={(val) => setEditProgress(val[0])}
                            max={100} 
                            step={1}
                            className="w-full"
                          />
                          <Button 
                            className="w-full h-7 text-[10px] bg-red-600 hover:bg-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateMutation.mutate({ id: movie.id, values: { progress: editProgress } });
                            }}
                          >
                            <Check className="mr-1 h-3 w-3" /> Save
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
            {loadingMovies && Array(6).fill(0).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-md animate-pulse" />
            ))}
          </div>
        </section>

        {/* Add Movie Form */}
        <section id="add-movie-form" className="max-w-xl">
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Add New Memory</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-zinc-800 border-white/10" placeholder="Movie or Series name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poster Image URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ''} className="bg-zinc-800 border-white/10" placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full bg-zinc-800 border-white/10 rounded-md p-2 text-sm">
                              <option value="movie">Movie</option>
                              <option value="series">Series</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="progress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Progress %</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              max="100" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              value={field.value || 0}
                              className="bg-zinc-800 border-white/10" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 font-bold" disabled={createMutation.isPending}>
                    Save Movie Memory
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
