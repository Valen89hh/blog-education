import { create } from "zustand";

interface ColorModeState{
    colorMode: "dark" | "light"
    setModeDark: ()=>void
    setModeLight: ()=>void
}

export const useColorModeState = create<ColorModeState>(set=>({
    colorMode: "light",
    setModeDark: ()=>set({colorMode: "dark"}),
    setModeLight: ()=>set({colorMode: "light"}),
}))

interface ModalSearchState{
    stateModalSearch: boolean,
    closeModalSearch: ()=>void
    openModalSearch: ()=>void
}

export const useModalSearchState = create<ModalSearchState>(set=>({
    stateModalSearch: false,
    closeModalSearch: ()=>set({stateModalSearch: false}),
    openModalSearch: ()=>set({stateModalSearch: true}),
}))
