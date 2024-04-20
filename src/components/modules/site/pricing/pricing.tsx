"use client";

import { FC, useEffect } from "react";
import Link from "next/link";
import { stagger, useAnimate, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/shad-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/ui/react-icons";

interface PricingProps {}

const pricingItems = [
  {
    id: "free",
    plan: "Free",
    tagline:
      "Experience the joy of journaling for free with NoteFusion's essential features and intuitive interface",
    price: "$0",
    period: "",
    features: [
      {
        id: "starter-1",
        text: "3 Folders",
        footnote:
          "Only 3 folders are allowed in the free plan, upgrade to pro for unlimited entries",
      },
      {
        id: "starter-2",
        text: "Support",
        footnote:
          "Not getting the support you need? Upgrade to pro for priority support",
      },
      {
        id: "starter-3",
        text: "Live Collaboration",
        footnote: "Collaborate with your friends and family in real-time",
      },
      {
        id: "starter-4",
        text: "Limited File Uploads",
        negative: true,
      },
      {
        id: "starter-5",
        text: "Invite 2 Collaborators",
        negative: true,
      },
    ],
  },
  {
    id: "pro",
    plan: "Pro",
    tagline:
      "Upgrade to NoteFusion Pro for an enhanced journaling experience with exclusive benefits.",
    price: "$12.99",
    period: "/month",
    features: [
      {
        id: "pro-1",
        text: "Unlimited Entries",
        footnote: "Unlimited entries are allowed in the pro plan.",
      },
      {
        id: "pro-2",
        text: "Priority Support",
        footnote: "Get priority support from our team of experts.",
      },
      {
        id: "pro-3",
        text: "Live Collaboration",
        footnote: "Collaborate with your friends and family in real-time",
      },
      {
        id: "pro-4",
        text: "100 GB Storage",
      },
      {
        id: "pro-5",
        text: "Unlimited Collaborators",
      },
    ],
  },
];

const Pricing: FC<PricingProps> = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(
        "#reveal-anim",
        { opacity: [0, 1], y: [15, 0] },
        { duration: 0.5, ease: "easeIn", delay: stagger(0.3) }
      );
    }
  }, [animate, isInView]);
  return (
    <div
      ref={scope}
      className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:max-w-4xl justify-center mx-auto"
    >
      {pricingItems.map((item) => (
        <Card key={item.id} id="reveal-anim">
          <CardHeader>
            <CardTitle className="text-2xl font-bold md:text-3xl lg:text-4xl">
              {item.plan}
            </CardTitle>
            <CardDescription>{item.tagline}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <h3 className="lg:text-5x text-2xl font-bold md:text-3xl">
              {item.price}{" "}
              <span className="inline-block align-baseline text-base font-normal text-muted-foreground">
                {item.period}{" "}
                <span className="ml-2 inline-block rounded-lg border p-1 text-base">
                  {item.plan}
                </span>
              </span>
            </h3>
            <Link
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-gradient-to-tr from-blue-600 to-cyan-600 text-white"
              )}
              href="/sign-up"
            >
              Get Started
            </Link>
            <div className="space-y-5">
              <p className="text-lg">Includes</p>

              {item.features.map((feature) => (
                <div key={feature.id} className="flex items-center gap-x-5">
                  {!feature.negative ? (
                    <Icons.checkCircle className="text-green-500" />
                  ) : (
                    <Icons.xCircle className="text-gray-500" />
                  )}
                  <div className="flex items-center gap-x-2">
                    <p
                      className={cn(
                        !feature.negative
                          ? "text-muted-foreground"
                          : "text-gray-500"
                      )}
                    >
                      {feature.text}
                    </p>
                    {feature.footnote && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs bg-muted p-5 text-center">
                            <p className="text-foreground">
                              {feature.footnote}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Pricing;
