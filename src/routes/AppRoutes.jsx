// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SubmitCoreExtract from '../components/SubmitCoreExtract';
import SubmitCustomExtract from '../components/SubmitCustomExtract';
import ExtractCenterTable from '../components/ExtractCenterTable';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/extract-center" replace />} />
      <Route path="/extract-center" element={<ExtractCenterTable />} />
      <Route path="/submit-core-extract" element={<SubmitCoreExtract />} />
      <Route path="/submit-custom-extract" element={<SubmitCustomExtract />} />
    </Routes>
  );
};

export default AppRoutes;
