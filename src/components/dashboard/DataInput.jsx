
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const DataInput = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientId: "",
    age: "",
    temperature: "",
    heartRate: "",
    bloodPressure: "",
    oxygenSaturation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate data
    if (!formData.patientId || !formData.age) {
      toast({
        title: "Validation Error",
        description: "Patient ID and Age are required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate data saving
    toast({
      title: "Saving data...",
      description: "Please wait while we process your input",
    });

    setTimeout(() => {
      toast({
        title: "Data saved successfully",
        description: `Patient data for ID: ${formData.patientId} has been recorded`,
        variant: "default",
      });

      // Clear form
      setFormData({
        patientId: "",
        age: "",
        temperature: "",
        heartRate: "",
        bloodPressure: "",
        oxygenSaturation: "",
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden gradient-border card-hover">
        <CardHeader className="gradient-bg text-white">
          <CardTitle className="text-lg font-medium flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Patient Data Input
          </CardTitle>
          <CardDescription className="text-white/80">
            Enter new patient vital signs and measurements
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  name="patientId"
                  placeholder="Enter patient ID"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  className="input-gradient"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="input-gradient"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  name="temperature"
                  type="number"
                  step="0.1"
                  placeholder="Enter temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  className="input-gradient"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  name="heartRate"
                  type="number"
                  placeholder="Enter heart rate"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  className="input-gradient"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  name="bloodPressure"
                  placeholder="e.g., 120/80"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  className="input-gradient"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
                <Input
                  id="oxygenSaturation"
                  name="oxygenSaturation"
                  type="number"
                  max="100"
                  placeholder="Enter SpO2"
                  value={formData.oxygenSaturation}
                  onChange={handleInputChange}
                  className="input-gradient"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    patientId: "",
                    age: "",
                    temperature: "",
                    heartRate: "",
                    bloodPressure: "",
                    oxygenSaturation: "",
                  });
                }}
                className="w-full sm:w-auto"
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto gradient-bg hover:opacity-90"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Data
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataInput;
