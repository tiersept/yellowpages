"use client";

import { AnimatePresence } from "motion/react";
import { useLayoutNavigation } from "../../hooks/use-layout-navigation";
import { useEffect } from "react";
import { DEFAULT_SPRING } from "@repo/ui/constants/animation";
import { CardM } from "@repo/ui/card/index";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, open, setIsOpen, setAnimatingId } = useLayoutNavigation();

  useEffect(() => {
    open();

    return () => {
      setIsOpen(false);
      setAnimatingId(null);
    };
  }, [setIsOpen, setAnimatingId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <CardM
          layoutId="card-modal"
          transition={DEFAULT_SPRING}
          className="absolute p-6 top-6 left-6 max-w-96 z-50"
          onLayoutAnimationComplete={() => {
            setAnimatingId(null);
          }}
        >
          {children}
        </CardM>
      )}
    </AnimatePresence>
  );
};
