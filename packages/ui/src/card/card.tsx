import { PropsWithChildren } from "react";
import { cn } from "@repo/utils";

interface CardProps extends PropsWithChildren {
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "ui:rounded-2xl ui:bg-neutral-50/80 ui:backdrop-blur-sm ui:backdrop-saturate-150",
        className
      )}
    >
      {children}
    </div>
  );
};
