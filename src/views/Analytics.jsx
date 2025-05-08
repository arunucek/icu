
import React from "react";
import { motion } from "framer-motion";

const Analytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <p>Analytics and reporting interface will be displayed here.</p>
    </motion.div>
  );
};

export default Analytics;
