import Link from "next/link";
import { cookies } from "next/headers";

import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/shad-button";
import { MainNav } from "@/components/modules/site/main-nav";
import Background from "@/components/modules/site/background";
import SiteFooter from "@/components/modules/site/site-footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = async ({ children }) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur-lg">
        <div className="container flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href={user?.id ? "/dashboard" : "/login"}
              className={cn(
                buttonVariants({ size: "lg", variant: "cta" }),
                "rounded-full px-4"
              )}
            >
              {user && user?.id ? "Dashboard" : "Sign in"}
            </Link>
          </nav>
        </div>
      </header>
      <main className="container flex-1">{children}</main>
      <SiteFooter className="mt-[20vh]" />
      <Background />
    </div>
  );
};

export default SiteLayout;
