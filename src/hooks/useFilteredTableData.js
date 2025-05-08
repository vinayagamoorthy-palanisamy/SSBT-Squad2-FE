import { useEffect, useState } from "react";

const useFilteredTableData = (tableData, selectedClient, selectedDataService) => {
  const [filteredTableData, setFilteredTableData] = useState([]);

  useEffect(() => {
    const filteredData = tableData?.filter(item => {
      return (selectedClient === "All" || item.client === selectedClient) &&
             (selectedDataService === "All" || item.dataService === selectedDataService);
    }) || [];
    setFilteredTableData(filteredData);
  }, [tableData, selectedClient, selectedDataService]);

  return filteredTableData;
};

export default useFilteredTableData;
