// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SubmitCoreExtract from '../components/SubmitCoreExtract';
import SubmitCustomExtract from '../components/SubmitCustomExtract';
import ExtractCenterTable from '../components/ExtractCenterTable';
import CoreExtractStepper from '../components/CoreExtractStepper';
import EditableTransferList from '../components/EditableTransferList';

// import ViewExtract from '../components/ViewExtract';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/extract-center" replace />} />
      <Route path="/extract-center" element={<ExtractCenterTable />} />
      <Route path="/create-extract" element={<CoreExtractStepper />} />
      <Route path="/transfer-list" element={<EditableTransferList />} />
      <Route path="/submit-core-extract" element={<SubmitCoreExtract />} />
      <Route path="/submit-custom-extract" element={<SubmitCustomExtract />} />
      {/* <Route path="/view-extract" element={<ViewExtract />} /> */}
      {/* <Route path="/modal" element={<MyModal/>} /> */}
    </Routes>
  );
};

export default AppRoutes;
