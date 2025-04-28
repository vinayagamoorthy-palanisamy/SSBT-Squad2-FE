export const coreExtractFields = [
    { label: 'Extract File Format*', type: 'select', options: ['CSV', 'TXT'] },
    { label: 'Extract Tolerance', type: 'select', options: ['Zero_tolerance', 'High'] },
    { label: 'Extract Group', type: 'text', placeholder: 'Group name' },
    { label: 'Warehouse Name', type: 'text', placeholder: 'WH name' },
    { label: 'Data Delimiter*', type: 'select', options: ['space ( )', 'comma ( , )'] },
    { label: 'Header Delimiter', type: 'select', options: ['space ( )'] },
    { label: 'Footer Delimiter', type: 'select', options: ['space ( )'] },
    { label: 'Description', type: 'text', placeholder: 'Enter description', xs: 12 },
    { label: 'Create Custom Extract', type: 'select', options: ['Yes', 'No'], xs: 3 }
  ];
  