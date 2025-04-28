import React from 'react';
import DynamicExtractForm from '../components/DynamicExtractForm';
import { customExtractFields } from '../utils/submitCustomExtractConfig';
import DynamicButtonGroup from '../components/DynamicButtonGroup';

const SubmitCustomExtract = () => {

  const handleBack = () => console.log('Back clicked');
  const handleCancel = () => console.log('Cancel clicked');
  const handleSave = () => console.log('Save clicked');
  const handleSubmit = () => console.log('Submit clicked');
  return (
    <div style={{ padding: 24, background: '#fff', height: "500px" }}>
      <DynamicExtractForm title="Submit Custom Extract" fields={customExtractFields} />
      <DynamicButtonGroup
        showBack
        showCancel
        showSave
        showSubmit
        onBack={handleBack}
        onCancel={handleCancel}
        onSave={handleSave}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SubmitCustomExtract;
