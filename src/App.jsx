
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/components/dashboard/Dashboard';
import Patients from '@/views/Patients';
import Monitoring from '@/views/Monitoring';
import MLModels from '@/views/MLModels';
import Analytics from '@/views/Analytics';
import DataSources from '@/views/DataSources';
import Reports from '@/views/Reports';
import Integrations from '@/views/Integrations';
import Settings from '@/views/Settings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="ml-models" element={<MLModels />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="data-sources" element={<DataSources />} />
          <Route path="reports" element={<Reports />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
