"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import SubscriptionModal from "@/components/common/subscription-modal";
import { ProductWithPrice } from "@/lib/supabase/types";

type SubscriptionModalContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const SubscriptionModalContext =
  createContext<SubscriptionModalContextType>({
    open: false,
    setOpen: () => {},
  });

export const SubscriptionModalProvider = ({
  children,
  products,
}: {
  children: React.ReactNode;
  products: ProductWithPrice[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <SubscriptionModalContext.Provider value={{ open, setOpen }}>
      {children}
      <SubscriptionModal products={products} />
    </SubscriptionModalContext.Provider>
  );
};
