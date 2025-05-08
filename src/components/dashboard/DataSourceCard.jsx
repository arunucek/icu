
import React from "react";
import { motion } from "framer-motion";
import { Database, RefreshCw, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DataSourceCard = ({ source }) => {
  const { toast } = useToast();
  
  // Default source if none provided
  const defaultSource = {
    id: "ehr-data",
    name: "EHR System",
    description: "Electronic Health Records data source",
    status: "connected",
    lastSync: "10 minutes ago",
    recordCount: 1458,
    hasErrors: false
  };

  const data = source || defaultSource;
  
  const handleRefresh = () => {
    toast({
      title: "Syncing data",
      description: `Refreshing data from ${data.name}...`,
    });
    
    // Simulate refresh
    setTimeout(() => {
      toast({
        title: "Sync complete",
        description: `Successfully synced data from ${data.name}`,
        variant: "default",
      });
    }, 2000);
  };
  
  const handleError = () => {
    toast({
      title: "Error details",
      description: "Connection timeout when accessing EHR database. Please check network settings.",
      variant: "destructive",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden card-hover">
        <CardHeader className={`${data.hasErrors ? 'bg-red-50' : 'bg-green-50'} pb-2`}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center">
              <Database className="mr-2 h-5 w-5" />
              {data.name}
            </CardTitle>
            <div className={`px-2 py-1 rounded-full text-xs ${
              data.status === 'connected' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {data.status}
            </div>
          </div>
          <CardDescription className="mt-2">
            {data.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Last synced</div>
              <div className="font-medium">{data.lastSync}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Records</div>
              <div className="font-medium">{data.recordCount.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleRefresh}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            
            {data.hasErrors && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleError}
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                View Errors
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataSourceCard;
