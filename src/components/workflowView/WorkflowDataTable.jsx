import { MaterialReactTable } from "material-react-table";
import { workflowTable } from "../../data/workflowData";
import { useState } from "react";
import SearchForm from "./SearchForm";
const WorkflowDataTable = () => {
  const columns = [
    { accessorKey: "client", header: "Client" },
    { accessorKey: "workflowName", header: "Workflow Name" },
    { accessorKey: "region", header: "Region" },
    { accessorKey: "effectiveDate", header: "Effective Date" },
    { accessorKey: "stateMonitorStatus", header: "State Monitor Status" },
    { accessorKey: "overallStatus", header: "Overall Status" },
    { accessorKey: "infoCheckStatus", header: "Informative Check Status" },
  ];
  
  return (
    <>
     <SearchForm/>
    <MaterialReactTable
      columns={columns}
      data={workflowTable}
      enableTopToolbar={false}
    />
    </>
  );
};

export default WorkflowDataTable;
