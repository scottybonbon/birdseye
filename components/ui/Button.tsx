import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  // Primary — electric blue used sparingly, this is the only place it earns
  // full saturation on dark sections.
  primary:
    "bg-birdseye-electric text-birdseye-cream hover:bg-birdseye-electric/90 active:bg-birdseye-blue shadow-glow",
  // Secondary — outlined cream pill on dark sections
  secondary:
    "bg-transparent text-birdseye-cream border border-birdseye-border hover:bg-birdseye-cream/[0.06] hover:border-birdseye-cream/30",
  ghost: "text-birdseye-cream/75 hover:text-birdseye-cream hover:bg-birdseye-cream/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] rounded-pill",
  md: "h-11 px-5 text-[14px] rounded-pill",
  lg: "h-12 px-6 text-[15px] rounded-pill",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-birdseye-navy",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
