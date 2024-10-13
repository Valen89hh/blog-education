import { Database } from "./types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export type Role = Database["public"]["Enums"]["Role"]