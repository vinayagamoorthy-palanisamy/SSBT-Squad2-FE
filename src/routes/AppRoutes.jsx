// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SubmitCoreExtract from '../components/SubmitCoreExtract';
import SubmitCustomExtract from '../components/SubmitCustomExtract';
import ExtractCenterTable from '../components/ExtractCenterTable';
import ViewEditExtractPage from '../components/ViewEditExtractPage';
import MyModal from '../components/CustomModal';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/extract-center" replace />} />
      <Route path="/extract-center" element={<ExtractCenterTable />} />
      <Route path="/submit-core-extract" element={<SubmitCoreExtract />} />
      <Route path="/submit-custom-extract" element={<SubmitCustomExtract />} />
      <Route path="/view-extract" element={<ViewEditExtractPage />} />
      <Route path="/edit-extract" element={<ViewEditExtractPage isEditable/>} />
      <Route path="/modal" element={<MyModal/>} />
    </Routes>
  );
};

export default AppRoutes;
