import React from 'react';
import DynamicExtractForm from '../components/DynamicExtractForm';
import { coreExtractFields } from '../utils/submitCoreExtractConfig';
import DynamicButtonGroup from '../components/DynamicButtonGroup';
import { submitExtractButtons } from '../utils/submitCustomExtractConfig';

const SubmitCoreExtract = () => { 
  return (
    <div style={{ padding: 24, background: '#fff', height: "500px" }}>
      <DynamicExtractForm title="Submit Core Extract" fields={coreExtractFields} isTitleAvailable />
      <DynamicButtonGroup buttons={submitExtractButtons} />
    </div>
  );
};

export default SubmitCoreExtract;
