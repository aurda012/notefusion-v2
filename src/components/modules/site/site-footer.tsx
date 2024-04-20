import { FC } from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Image from "next/image";

interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const SiteFooter: FC<SiteFooterProps> = ({ className }) => {
  return (
    <footer
      className={cn(
        "min-h-[30vh] w-full border-t bg-background py-10 text-foreground",
        className
      )}
    >
      <div className="container space-y-10 ">
        <div className="space-y-8 xl:col-span-2">
          <div className="space-y-10">
            <div className="flex items-center gap-x-2">
              <Image
                src={"/cypresslogo.svg"}
                alt="cypress Logo"
                width={28}
                height={28}
              />
              <h3 className="text-md text-muted-foreground lg:text-lg">
                NoteFusion
              </h3>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3>Product</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href="#features"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href="#pricing"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3>Company</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href="#pricing"
                    >
                      About us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3>Developers</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href={siteConfig.links.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3>Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href=""
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href="#"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t  pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} NoteFusion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
