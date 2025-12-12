import { memo, PropsWithChildren } from "react";
import { cn } from "@repo/utils";

interface ListItemProps extends PropsWithChildren {
  className?: string;
}

export const ListItem = memo(function ListItem({
  children,
  className,
}: ListItemProps) {
  return (
    <div
      className={cn(
        "ui:rounded-2xl ui:px-5 ui:py-4 ui:transition-colors ui:group:",
        className
      )}
    >
      {children}
    </div>
  );
});
