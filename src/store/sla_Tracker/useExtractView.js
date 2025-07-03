import {create} from 'zustand';

import {devtools} from 'zustand/middleware'


const useExtractViewDataStore = create(devtools((set) => ({
    extractViewData: [],
    selectedTableData: [],
    loading: false,
    error: null,
    fetchExtractViewData: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch("http://localhost:3001/extractViewData");
            if (!response.ok) throw new Error("failed to fetch extract center data");
            const data = await response.json();
            set({ extractViewData: data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    handleSelectedRowsData: (rowsData) => {
        set((state) => ({ ...state, selectedTableData: rowsData }))
    }
})));

export default useExtractViewDataStore;
