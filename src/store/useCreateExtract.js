import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCreateExtract = create(devtools((set) => ({
    datasetList: [],
    sqlEditorToggle: [true],
    handleDataset: (DatasetList) => {
        set(state => ({...state, ...DatasetList}))
    },
})));

export default useCreateExtract;