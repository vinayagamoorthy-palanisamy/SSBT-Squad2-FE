import { useState, useMemo } from "react";
import { useMaterialReactTable } from "material-react-table";

export const useExtractCenterTable = (data = []) => {
  const [selectedRows, setSelectedRows] = useState({});

  const toggleRowSelection = (rowId) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const isRowSelected = (rowId) => !!selectedRows[rowId];

  const columns = useMemo(() => [
    {
      accessorKey: "select",
      header: "Select",
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={isRowSelected(row.id)}
          onChange={() => toggleRowSelection(row.id)}
        />
      ),
      enableColumnFilter: false,
      size: 60,
    },
    {
      accessorKey: "extractName",
      header: "Extract Name",
    },
    {
      accessorKey: "version",
      header: "Version",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "type",
      header: "Extract Type",
    },
    {
      accessorKey: "parameter",
      header: "Extract Parameter",
    },
    {
      accessorKey: "identifier",
      header: "Extract Identifier",
    },
    {
      accessorKey: "format",
      header: "Extract Format",
    },
  ], [selectedRows]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableGlobalFilter: false,
    enableTopToolbar: false,
    enablePagination: true,
    paginationDisplayMode: "pages",
    initialState: {
      showColumnFilters: true,
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
  });

  return {
    table,
    selectedRows,
    setSelectedRows,
    toggleRowSelection,
  };
};
