import { useMessages, useCreateMessage } from "@/hooks/use-messages";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";
import { Send, Heart, User, Camera, LogOut, ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const STORAGE_KEY_NAME = "chat_user_name";
const STORAGE_KEY_AVATAR = "chat_user_avatar";

export function ChatBox() {
  const { data: messages = [] } = useMessages();
  const createMessage = useCreateMessage();
  
  const [content, setContent] = useState("");
  const [sender, setSender] = useState(() => localStorage.getItem(STORAGE_KEY_NAME) || "");
  const [avatar, setAvatar] = useState(() => localStorage.getItem(STORAGE_KEY_AVATAR) || "");
  const [hasJoined, setHasJoined] = useState(() => !!localStorage.getItem(STORAGE_KEY_NAME));
  const [messageImage, setMessageImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if ((!content.trim() && !messageImage) || !sender.trim()) return;
    
    createMessage.mutate({
      sender,
      senderAvatar: avatar || null,
      content: content.trim(),
      imageUrl: messageImage || null,
    });
    setContent("");
    setMessageImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMessageImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (sender.trim()) {
      localStorage.setItem(STORAGE_KEY_NAME, sender);
      if (avatar) localStorage.setItem(STORAGE_KEY_AVATAR, avatar);
      setHasJoined(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY_NAME);
    localStorage.removeItem(STORAGE_KEY_AVATAR);
    setSender("");
    setAvatar("");
    setHasJoined(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!hasJoined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex items-center justify-center"
      >
        <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur border-2 border-primary/20 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-heading text-primary mb-4">Join the Love Chat</h2>
            
            {/* Profile Picture Upload Section */}
            <div className="mb-6">
              <input 
                ref={imageInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange}
                className="hidden"
                data-testid="input-avatar-upload"
              />
              <div 
                onClick={() => imageInputRef.current?.click()}
                className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary relative group cursor-pointer hover:bg-primary/20 transition-colors border-2 border-dashed border-primary/30 hover:border-primary/60"
              >
                {avatar ? (
                  <img src={avatar} alt="Preview" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Camera className="w-8 h-8 text-primary/60" />
                    <span className="text-[10px] text-primary/50 font-semibold">Add Photo</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Click above to upload your photo</p>
            </div>
            
            <p className="text-muted-foreground mb-4">Set your profile and start chatting</p>
          </div>
          
          <form onSubmit={handleJoin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <Input
                placeholder="Your name..."
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="pl-9 h-12 bg-white border-primary/20 focus:border-primary focus:ring-primary/20 text-lg"
                autoFocus
                data-testid="input-user-name"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl transition-all hover:-translate-y-0.5"
              disabled={!sender.trim()}
              data-testid="button-start-chat"
            >
              Start Chatting
            </Button>
          </form>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="h-[600px] flex flex-col"
    >
      <Card className="flex-1 flex flex-col overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl shadow-primary/5">
        {/* Chat Header */}
        <div className="p-4 border-b border-primary/10 bg-primary/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-primary/20 shadow-md">
              {avatar ? <AvatarImage src={avatar} /> : null}
              <AvatarFallback className="bg-gradient-to-br from-primary to-rose-400 text-white">
                <Heart className="w-5 h-5 fill-white/50" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-serif font-bold text-lg text-primary-foreground/80 dark:text-primary">Love Chat</h3>
              <p className="text-xs text-primary/60 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live as <span className="font-semibold">{sender}</span>
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden relative">
          <div 
            ref={scrollRef}
            className="absolute inset-0 overflow-y-auto p-4 space-y-4 scrollbar-thin"
          >
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-primary/30 space-y-2">
                  <Heart className="w-12 h-12" />
                  <p className="font-heading text-2xl">No messages yet...</p>
                  <p className="text-sm">Be the first to say something sweet!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.sender === sender;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <Avatar className="w-8 h-8 flex-shrink-0 mt-auto mb-1 border border-primary/10 shadow-sm">
                        {msg.senderAvatar ? <AvatarImage src={msg.senderAvatar} /> : null}
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                          {msg.sender.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`
                          max-w-[75%] rounded-2xl px-4 py-3 shadow-sm relative group
                          ${isMe 
                            ? "bg-gradient-to-br from-primary to-rose-500 text-white rounded-br-none" 
                            : "bg-white border border-primary/10 text-foreground rounded-bl-none"}
                        `}
                      >
                        {!isMe && (
                          <p className="text-xs font-bold text-primary mb-1">{msg.sender}</p>
                        )}
                        {msg.imageUrl && (
                          <img 
                            src={msg.imageUrl} 
                            alt="Message image" 
                            className="max-w-full rounded-lg mb-2 max-h-64 object-cover"
                            data-testid={`img-message-${msg.id}`}
                          />
                        )}
                        {msg.content && (
                          <p className="leading-relaxed break-words">{msg.content}</p>
                        )}
                        <span className={`text-[10px] mt-1 block opacity-70 ${isMe ? "text-white/80" : "text-muted-foreground"}`}>
                          {msg.createdAt ? format(new Date(msg.createdAt), "h:mm a") : "Just now"}
                        </span>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-primary/10 space-y-3">
          {messageImage && (
            <div className="relative inline-block">
              <img src={messageImage} alt="Preview" className="max-h-40 rounded-xl border border-primary/20" />
              <button
                onClick={() => setMessageImage(null)}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <input 
              ref={imageInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="hidden"
              data-testid="input-image-upload"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => imageInputRef.current?.click()}
              className="text-primary hover:bg-primary/10"
              data-testid="button-image-upload"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type a lovely message..."
              className="flex-1 bg-secondary/30 border-primary/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl"
              data-testid="input-message"
            />
            <Button 
              type="submit" 
              disabled={createMessage.isPending || (!content.trim() && !messageImage)}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl w-12 h-10 p-0 shadow-lg shadow-primary/20 transition-transform active:scale-95"
              data-testid="button-send-message"
            >
              {createMessage.isPending ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}
