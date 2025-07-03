import { useEffect, useState } from "react";
import useExtractViewDataStore from "../../../store/sla_Tracker/useExtractView"
import { useExtractViewTable } from "../../../hooks/useExtractViewTable";
import { Alert, Box, CircularProgress } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import ExtractViewHeader from "./extractViewHeaders";

const ExtractView = ({
    selectedClient,
    selectedDataService,
    setClientOptions,
    setDataServiceOptions,
}) => {
    const { extractViewData, selectedTableData, loading, error, fetchExtractViewData } = useExtractViewDataStore(state=>state);
    console.log(extractViewData, 'chgchg');
    const { table, selectedRows } = useExtractViewTable(extractViewData?.tableData, selectedClient, selectedDataService);
    useEffect(() => {
        if (extractViewData?.tableData?.length) {
            const clients = new Set();
            const dataServices = new Set();

            extractViewData.tableData.forEach(item => {
                if (item.client) clients.add(item.client);
                if (item.dataService) dataServices.add(item.dataService);
            });

            setClientOptions(["All", ...Array.from(clients)]);
            setDataServiceOptions(["All", ...Array.from(dataServices)]);
        }
    }, [extractViewData?.tableData]);
    useEffect(() => {
        fetchExtractViewData();
    }, [fetchExtractViewData]);
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" minHeight="300px">
            <ExtractViewHeader/>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {loading ? <CircularProgress /> : <MaterialReactTable
             muiTableBodyRowProps={{
    sx: {
      height: '32px', // Reduced row height (default is ~56px)
    },
  }}
  muiTableBodyCellProps={{
    sx: {
      padding: '4px 8px', // Tighter padding helps reduce height too
      fontSize: '12px',    // Optional: smaller font
    },
  }}
  muiTableHeadCellProps={{
    sx: {
      padding: '4px 8px',
      fontSize: '11px',
    },
  }}
            table={table} />}
        </Box>
    )
}

export default ExtractView;
