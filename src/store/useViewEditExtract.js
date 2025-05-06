import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useViewEditExtract = create(devtools((set) => ({
    isEditable: false,
    setIsEditableTrue: () => {
        set({isEditable: true})
    },
    setIsEditableFalse: () => {
        set({isEditable: false});
    }
})));

export default useViewEditExtract;