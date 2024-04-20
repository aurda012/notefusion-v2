"use client";

import { FC, useEffect } from "react";
import { stagger, useAnimate, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/shad-button";
import { Icons } from "@/components/ui/react-icons";

const OpenSourceSection: FC = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(
        "#reveal-anim",
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, ease: "easeIn", delay: stagger(0.3) }
      );
    }
  }, [animate, isInView]);
  return (
    <section ref={scope} className="relative mt-[10vh] min-h-[30vh]">
      <div className="flex flex-col items-center justify-center space-y-8 py-10">
        <h2
          id="reveal-anim"
          className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl tracking-tight text-transparent md:text-5xl md:leading-snug"
        >
          Proudly open source
        </h2>
        <p
          id="reveal-anim"
          className="max-w-xl text-center text-lg leading-relaxed text-muted-foreground"
        >
          Our source code is available on GitHub - feel free to read, review, or
          contribute to it however you want!
        </p>
        <a
          id="reveal-anim"
          href="https://github.com/aurda012/notefusion-v2"
          className={cn(
            buttonVariants({ size: "lg" }),
            "text- cursor-pointer gap-x-3 bg-secondary-gradient-4 text-white transition-shadow duration-300  hover:shadow-[0px_4px_30px] hover:shadow-[rgb(55_65_81_/_50%)]"
          )}
          target="_blank"
          rel="noreferrer"
        >
          <Icons.GitHub className="h-5 w-5 text-background text-white" /> Github
        </a>
      </div>
    </section>
  );
};

export default OpenSourceSection;
