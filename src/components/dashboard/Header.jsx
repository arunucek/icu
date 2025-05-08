
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Menu, Moon, Search, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    
    toast({
      title: `${newMode ? "Dark" : "Light"} mode activated`,
      description: `Dashboard theme has been switched to ${newMode ? "dark" : "light"} mode.`,
      duration: 2000,
    });
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4"
    >
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2 md:hidden"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-primary">Medical ICU ML Dashboard</h1>
        </div>
      </div>
      
      <div className="flex-1 mx-4 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients, metrics, or ML models..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleDarkMode}
          className="text-muted-foreground hover:text-foreground"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground hover:text-foreground relative"
          onClick={() => {
            toast({
              title: "Notifications",
              description: "You have 3 unread notifications",
            });
          }}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground">MD</AvatarFallback>
        </Avatar>
      </div>
    </motion.header>
  );
};

export default Header;
