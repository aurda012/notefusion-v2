import { useContext } from "react";
import { SubscriptionModalContext } from "@/providers/subscription-modal-provider";

export const useSubscriptionModal = () => {
  return useContext(SubscriptionModalContext);
};
