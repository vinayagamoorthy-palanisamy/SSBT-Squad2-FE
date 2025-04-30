import React from 'react';
import DynamicExtractForm from '../components/DynamicExtractForm';
import { customExtractFields, submitExtractButtons } from '../utils/submitCustomExtractConfig';
import DynamicButtonGroup from '../components/DynamicButtonGroup';

const SubmitCustomExtract = () => {

  return (
    <div style={{ padding: 24, background: '#fff', height: "500px" }}>
      <DynamicExtractForm title="Submit Custom Extract" fields={customExtractFields} isTitleAvailable/>
      <DynamicButtonGroup  buttons={submitExtractButtons} />
    </div>
  );
};

export default SubmitCustomExtract;
