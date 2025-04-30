import {create} from 'zustand';

import {devtools} from 'zustand/middleware'


const useExtractCenterDataStore = create(devtools((set) => ({
    extractCenterData: [],
    loading: false,
    error: null,
    fetchExtractCenterData: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch("http://localhost:3001/extractCenterData");
            if (!response.ok) throw new Error("failed to fetch extract center data");
            const data = await response.json();
            set({ extractCenterData: data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    }
})));

export default useExtractCenterDataStore;
