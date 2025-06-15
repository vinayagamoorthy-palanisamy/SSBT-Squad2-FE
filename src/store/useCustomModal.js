import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCustomModal = create(devtools((set) => ({
    isOpen: false,
    showClose: false,
    content: <>no content to show</>,
    title: 'Dialog',
    fullWidth: true,
    maxWidth: 'sm',
    handleOpenModal: (modalData) => {
        set(state => ({...state, ...modalData}))
    },
    handleCloseModal: () => {
        set(state => ({...state, isOpen: false}))
    },
})));

export default useCustomModal;