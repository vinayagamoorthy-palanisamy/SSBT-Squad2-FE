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
  