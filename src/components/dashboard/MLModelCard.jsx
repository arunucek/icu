
import React from "react";
import { motion } from "framer-motion";
import { Brain, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MLModelCard = ({ model }) => {
  // Default model if none provided
  const defaultModel = {
    id: "sepsis-pred-v2",
    name: "Sepsis Prediction Model",
    description: "Early detection of sepsis using vital signs and lab values",
    accuracy: 92,
    status: "active",
    lastRun: "2 hours ago",
    predictions: 128,
    alerts: 3
  };

  const data = model || defaultModel;
  
  const statusColors = {
    active: "text-green-500",
    training: "text-blue-500",
    error: "text-red-500",
    inactive: "text-gray-500"
  };
  
  const StatusIcon = () => {
    switch(data.status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "training": return <Clock className="h-4 w-4 text-blue-500" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden card-hover">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              {data.name}
            </CardTitle>
            <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full text-xs">
              <StatusIcon />
              <span className="capitalize">{data.status}</span>
            </div>
          </div>
          <CardDescription className="text-blue-100 mt-2">
            {data.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Model Accuracy</span>
              <span className="text-sm font-semibold">{data.accuracy}%</span>
            </div>
            <Progress value={data.accuracy} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-xs text-blue-500 mb-1">Predictions</div>
              <div className="text-xl font-bold">{data.predictions}</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <div className="text-xs text-amber-500 mb-1">Alerts</div>
              <div className="text-xl font-bold">{data.alerts}</div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground">
            Last run: {data.lastRun}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MLModelCard;
