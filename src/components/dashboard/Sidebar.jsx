
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  BarChart3, 
  Brain, 
  Database, 
  FileText, 
  Home, 
  Layers, 
  Settings, 
  Users 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Patients", path: "/patients" },
  { icon: Activity, label: "Monitoring", path: "/monitoring" },
  { icon: Brain, label: "ML Models", path: "/ml-models" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Database, label: "Data Sources", path: "/data-sources" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Layers, label: "Integrations", path: "/integrations" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (path) => {
    navigate(path);
    toast({
      title: "Navigation",
      description: `Navigating to ${path.replace('/', '').replace('-', ' ')}`,
    });
  };

  const handleDocumentation = () => {
    toast({
      title: "Documentation",
      description: "Opening documentation in a new tab",
    });
    window.open('https://docs.example.com', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background"
        >
          <div className="flex h-16 items-center border-b px-6">
            <h2 className="text-lg font-bold text-primary">ICU ML Dashboard</h2>
          </div>
          <nav className="flex-1 overflow-auto py-4 px-3">
            <ul className="space-y-1.5">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start transition-all duration-200",
                        isActive ? "bg-primary text-primary-foreground" : "",
                        "hover:scale-105"
                      )}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t p-4">
            <div className="rounded-lg bg-primary/10 p-4">
              <h5 className="mb-2 text-sm font-medium">Need Help?</h5>
              <p className="text-xs text-muted-foreground">
                Check our documentation for guides on using ML models in ICU settings.
              </p>
              <Button 
                className="mt-3 w-full text-xs" 
                size="sm"
                onClick={handleDocumentation}
              >
                View Documentation
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
