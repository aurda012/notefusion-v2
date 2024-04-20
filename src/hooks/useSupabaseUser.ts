import { useContext } from "react";
import { SupabaseUserContext } from "@/providers/supabase-user-provider";

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};
