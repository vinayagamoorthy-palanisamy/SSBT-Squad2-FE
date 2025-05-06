import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCustomModal = create(devtools((set) => ({
    isOpen: false,
    showClose: false,
    content: <></>,
    handleOpenModal: (modalData) => {
        set({...modalData})
    },
    handleCloseModal: () => {
        set({showClose: false, isOpen: false})
    },
})));

export default useCustomModal;