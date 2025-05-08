
import React from "react";
import { motion } from "framer-motion";

const Monitoring = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-4">Patient Monitoring</h1>
      <p>Real-time patient monitoring interface will be displayed here.</p>
    </motion.div>
  );
};

export default Monitoring;
