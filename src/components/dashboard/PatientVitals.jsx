
import React from "react";
import { motion } from "framer-motion";
import { Activity, Heart, Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const VitalSign = ({ icon: Icon, label, value, unit, progress, color }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className={`p-2 rounded-full bg-${color}-100 text-${color}-500`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-semibold">
            {value} {unit}
          </span>
        </div>
        <Progress value={progress} className={`h-2 bg-${color}-100`} />
      </div>
    </div>
  );
};

const PatientVitals = ({ patientData }) => {
  // Default data if none provided
  const data = patientData || {
    heartRate: 82,
    bloodPressure: "120/80",
    temperature: 37.2,
    oxygenSaturation: 98,
    respiratoryRate: 16
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/10 pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Patient Vital Signs
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <VitalSign
            icon={Heart}
            label="Heart Rate"
            value={data.heartRate}
            unit="bpm"
            progress={data.heartRate}
            color="red"
          />
          <VitalSign
            icon={Activity}
            label="Blood Pressure"
            value={data.bloodPressure}
            unit="mmHg"
            progress={75}
            color="blue"
          />
          <VitalSign
            icon={Thermometer}
            label="Temperature"
            value={data.temperature}
            unit="°C"
            progress={(data.temperature / 40) * 100}
            color="yellow"
          />
          <VitalSign
            icon={Droplets}
            label="Oxygen Saturation"
            value={data.oxygenSaturation}
            unit="%"
            progress={data.oxygenSaturation}
            color="green"
          />
          <VitalSign
            icon={Wind}
            label="Respiratory Rate"
            value={data.respiratoryRate}
            unit="bpm"
            progress={data.respiratoryRate * 3}
            color="purple"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PatientVitals;
