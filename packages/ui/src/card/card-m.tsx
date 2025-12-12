import { PropsWithChildren } from "react";
import { cn } from "@repo/utils";
import { motion } from "../motion";
import { HTMLMotionProps } from "motion/react";

interface CardProps extends PropsWithChildren, HTMLMotionProps<"div"> {
  className?: string;
}

export const CardM = ({ children, className, ...props }: CardProps) => {
  return (
    <motion.div
      className={cn(
        "ui:rounded-2xl ui:bg-neutral-50/80 ui:backdrop-blur-sm ui:backdrop-saturate-150",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
