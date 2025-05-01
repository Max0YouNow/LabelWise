
import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const minimalCardVariants = cva(
  "rounded-2xl backdrop-blur-md transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card/90 shadow-sm border border-white/10",
        filled: "bg-primary/20 shadow-sm border border-primary/20",
        outline: "bg-transparent border border-primary/30",
        glass: "glassmorphism",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MinimalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof minimalCardVariants> {}

const MinimalCard = React.forwardRef<HTMLDivElement, MinimalCardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(minimalCardVariants({ variant, size, className }))}
      {...props}
    />
  )
);
MinimalCard.displayName = "MinimalCard";

const MinimalCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
MinimalCardHeader.displayName = "MinimalCardHeader";

const MinimalCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-medium text-primary tracking-wide", className)}
    {...props}
  />
));
MinimalCardTitle.displayName = "MinimalCardTitle";

const MinimalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
MinimalCardDescription.displayName = "MinimalCardDescription";

const MinimalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-4", className)} {...props} />
));
MinimalCardContent.displayName = "MinimalCardContent";

const MinimalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
MinimalCardFooter.displayName = "MinimalCardFooter";

export {
  MinimalCard,
  MinimalCardHeader,
  MinimalCardFooter,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
};
