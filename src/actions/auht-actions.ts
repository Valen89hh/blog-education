"use server"

import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/supabase/table-type";
import { Result } from "@/lib/utils/response";

const supabase = createClient()

export const getProfileById = async(idUser: string): Promise<Result<Profile>>=>{
    const {
        data: profile, 
        error
    } = await supabase
        .from("profiles")
        .select()
        .eq("id", idUser)
        .maybeSingle()

    if(error) return {success: false, error: error.message}
    if(!profile) return {success: false, error: "No se pudo obtener el profile"}

    return {
        success: true,
        data: profile
    }
}