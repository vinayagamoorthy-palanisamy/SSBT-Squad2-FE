import useCustomModal from "../store/useCustomModal";

const {handleCloseModal} = useCustomModal;

export const customExtractFields = [
    { label: 'Extract File Format', type: 'select', required: true, options: ['CSV'] },
    { label: 'Extract File Name Format', type: 'text', placeholder: 'App Code_Extract_Name...' },
    { label: 'Extract File Name Date Format', type: 'text' },
    { label: 'Header Date Format', type: 'text' },
    { label: 'Footer Date Format', type: 'text' },
    { label: 'Data Delimiter', type: 'select', options: ['space ( )'] },
    { label: 'Header Delimiter', type: 'select', options: ['space ( )'] },
    { label: 'Footer Delimiter', type: 'select', options: ['space ( )'] },
    { label: 'Extract Tolerance', type: 'select', options: ['Zero_tolerance'] },
    { label: 'Extract Group', type: 'text' },
    { label: 'Warehouse Name', type: 'text' },
    { label: 'Extract Transmission Channel', type: 'text', required: true },
    { label: 'Extract Staging Location', type: 'text' },
    { label: 'Description', type: 'textarea' },
  ];
  
  export const viewExtractSQL1 = [
    {label: "Dataset", type: "dataValue", defaultValue: "FADS_Holdings"},
    {label: "Column Selection", type: "dataValue", defaultValue: "Fund, Fund Name, Asset Class"},
  ];

  export const viewExtractSQL2 = [
    {label: "Clause", type: "dataValue", defaultValue: "WHERE"},
    {label: "Column", type: "dataValue", defaultValue: "Fund"},
    {label: "Condition", type: "dataValue", defaultValue: "equal(=)"},
    {label: "Value", type: "dataValue", defaultValue: `"AN1L"`},
    {label: "Operator", type: "dataValue", defaultValue: "operator"},
  ];

  export const SQLQueryParam = [
    {label: "Header SQL", type: "text", placeholder: "SELECT *FROM users where user_id!='1' AND fast_name LIKE '%asim%'OR last_"},
    {label: "Footer SQL", type: "text", placeholder: "SELECT *FROM users where user_id!='1' AND fast_name LIKE '%asim%'OR last_"},
    {label: "Session SQL", type: "text", placeholder: "SELECT *FROM users where user_id!='1' AND fast_name LIKE '%asim%'OR last_"}
  ];

  export const tableParameters = [
    { name: "P_IN_CLIENT_ID_VALUE", value: "1918976543" },
    { name: "P_IN_EFFECTIVE_DATE_VALUE", value: "1345672354" },
    { name: "P_IN_ENTITY_ID_VALUE", value: "3489723458" },
  ];

  export const submitExtractButtons = [
    {seq: 1, label: 'Back', variant:'outlined', onClick: () => console.log('Back clicked')},
    {seq: 2, label: 'Cancel', variant:'outlined', onClick: () => console.log('Cancel clicked')},
    {seq: 3, label: 'Save', color:'primary', onClick: () => console.log('Save clicked')},
    {seq: 4, label: 'Submit', color:'primary', onClick: () => console.log('Submit clicked')}
  ];

  export const aprvRjctModalButtons = [
    {seq: 9, label: 'No', color: 'dark', variant: 'outlined', onClick: () => handleCloseModal()},
    {seq: 9, label: 'Yes', color: 'dark', onClick: () => handleCloseModal()}
  ];

  