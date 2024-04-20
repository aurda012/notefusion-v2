import { useContext } from "react";
import { AppStateContext } from "@/providers/state-provider";

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
