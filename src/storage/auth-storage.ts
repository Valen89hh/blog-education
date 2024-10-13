import { Profile } from "@/lib/supabase/table-type";
import { create } from "zustand";

interface ProfileState{
    profile: Profile | null,
    loadingProfile: boolean
    setLoadingProfile: (state: boolean)=>void
    setProfile: (pr: Profile | null)=>void
}

export const useProfileState = create<ProfileState>(set=>({
    profile: null,
    setProfile: (pr)=>set({profile: pr}),
    loadingProfile: false,
    setLoadingProfile: (st)=>set({loadingProfile: st})
}))