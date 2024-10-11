import { create } from "zustand";

interface State{
    isOpenModal: boolean,
    closeModal: ()=>void,
    openModal: ()=>void
}

export const useModalMenuState = create<State>(set=>({
    isOpenModal: false,
    closeModal: ()=>set({isOpenModal: false}),
    openModal: ()=>set({isOpenModal: true}),
}))