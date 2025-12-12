import { cn } from "@repo/utils";
import { PropsWithChildren } from "react";

interface TagProps extends PropsWithChildren {
  className?: string;
}

export const Tag = ({ children, className }: TagProps) => {
  return (
    <span
      className={cn(
        "ui:px-2 ui:py-1 ui:text-xs ui:bg-neutral-200/40 ui:rounded ui:text-black/64 ui:text-nowrap",
        className
      )}
    >
      {children}
    </span>
  );
};
