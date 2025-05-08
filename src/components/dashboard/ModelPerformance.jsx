
import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const performanceData = [
  { name: "Sepsis Model", accuracy: 92, precision: 88, recall: 90, f1: 89 },
  { name: "Respiratory", accuracy: 89, precision: 85, recall: 87, f1: 86 },
  { name: "Cardiac", accuracy: 91, precision: 89, recall: 86, f1: 87 },
  { name: "Kidney", accuracy: 87, precision: 84, recall: 82, f1: 83 },
  { name: "Mortality", accuracy: 85, precision: 81, recall: 79, f1: 80 },
];

const ModelPerformance = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">ML Model Performance</CardTitle>
          <CardDescription>
            Performance metrics for deployed machine learning models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="accuracy" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
              <TabsTrigger value="precision">Precision</TabsTrigger>
              <TabsTrigger value="recall">Recall</TabsTrigger>
              <TabsTrigger value="f1">F1 Score</TabsTrigger>
            </TabsList>
            
            {["accuracy", "precision", "recall", "f1"].map((metric) => (
              <TabsContent key={metric} value={metric} className="w-full">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, metric.charAt(0).toUpperCase() + metric.slice(1)]}
                      />
                      <Legend />
                      <Bar 
                        dataKey={metric} 
                        name={metric.charAt(0).toUpperCase() + metric.slice(1)} 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="mb-2">
                    {metric === "accuracy" && "Accuracy measures the proportion of correct predictions among the total number of cases examined."}
                    {metric === "precision" && "Precision measures the proportion of positive identifications that were actually correct."}
                    {metric === "recall" && "Recall measures the proportion of actual positives that were correctly identified."}
                    {metric === "f1" && "F1 Score is the harmonic mean of precision and recall, providing a balance between the two metrics."}
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModelPerformance;
