
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const generateData = (days = 7) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sepsis: Math.random() * 0.3 + 0.6,
      respiratory: Math.random() * 0.4 + 0.5,
      cardiac: Math.random() * 0.35 + 0.55,
    });
  }
  
  return data;
};

const PredictionChart = () => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState("7d");
  
  useEffect(() => {
    // Generate data based on selected time range
    const days = timeRange === "7d" ? 7 : timeRange === "14d" ? 14 : 30;
    setData(generateData(days));
  }, [timeRange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-medium">ML Prediction Trends</CardTitle>
              <CardDescription>
                Probability scores from machine learning models
              </CardDescription>
            </div>
            <Select defaultValue="7d" onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="14d">Last 14 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="line" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="area">Area Chart</TabsTrigger>
            </TabsList>
            
            <TabsContent value="line" className="w-full">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                    <Tooltip 
                      formatter={(value) => [`${(value * 100).toFixed(1)}%`, '']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sepsis" 
                      name="Sepsis Risk"
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="respiratory" 
                      name="Respiratory Failure"
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cardiac" 
                      name="Cardiac Event"
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="area" className="w-full">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                    <Tooltip 
                      formatter={(value) => [`${(value * 100).toFixed(1)}%`, '']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sepsis" 
                      name="Sepsis Risk"
                      stroke="#ef4444" 
                      strokeWidth={2}
                      fill="#ef4444"
                      fillOpacity={0.1}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="respiratory" 
                      name="Respiratory Failure"
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fill="#3b82f6"
                      fillOpacity={0.1}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cardiac" 
                      name="Cardiac Event"
                      stroke="#10b981" 
                      strokeWidth={2}
                      fill="#10b981"
                      fillOpacity={0.1}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PredictionChart;
