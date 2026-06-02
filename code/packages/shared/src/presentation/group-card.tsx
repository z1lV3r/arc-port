import * as React from "react";

import { cn } from "../lib/utils";

function GroupCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="group-card"
      className={cn(
        "bg-card text-card-foreground relative mt-3 rounded-xl border shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function GroupCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="group-card-header"
      className={cn(
        "bg-card text-card-foreground rounded-xl border absolute -top-2 left-4 px-2",
        className,
      )}
      {...props}
    />
  );
}

function GroupCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="group-card-title"
      className={cn(
        "text-sm font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function GroupCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="group-card-content"
      className={cn("p-6", className)}
      {...props}
    />
  );
}

export { GroupCard, GroupCardHeader, GroupCardTitle, GroupCardContent };
