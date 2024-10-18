import { create } from "zustand";

interface ModalShareState{
    stateModalSharePost: boolean,
    closeModalSharePost: ()=>void, 
    openModalSharePost: ()=>void, 
}

export const useModalShareState = create<ModalShareState>(set=>({
    stateModalSharePost: false,
    closeModalSharePost: ()=>set({stateModalSharePost: false}),
    openModalSharePost: ()=>set({stateModalSharePost: true}),
}))
