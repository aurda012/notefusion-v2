"use client";

import { AuthUser } from "@supabase/supabase-js";
import { Subscription, User } from "@/lib/supabase/types";
import { createContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUserData, getUserSubscriptionStatus } from "@/lib/supabase/queries";
import { useToast } from "@/components/ui/use-toast";
import db from "@/lib/supabase/db";
import { users } from "../../migrations/schema";
import { eq } from "drizzle-orm";

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: Subscription | null;
  userData: User | null;
};

export const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
  userData: null,
});

interface SupabaseUserProviderProps {
  children: React.ReactNode;
}

export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { toast } = useToast();

  const supabase = createClientComponentClient();

  //Fetch the user details
  //subscrip
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // console.log(user);
        setUser(user);
        const { data: subscriptionData, error: subscriptionError } =
          await getUserSubscriptionStatus(user.id);
        if (subscriptionData) setSubscription(subscriptionData);
        if (subscriptionError) {
          toast({
            title: "Unexpected Error",
            description:
              "Oppse! An unexpected error happened. Try again later.",
          });
        }
        const { data: userData, error: userDataError } = await getUserData(
          user.id
        );
        if (userData) setUserData(userData[0]);
      }
    };
    getUser();
  }, [supabase, toast]);
  return (
    <SupabaseUserContext.Provider value={{ user, subscription, userData }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
