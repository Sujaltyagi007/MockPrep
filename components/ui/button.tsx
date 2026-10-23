import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-navy-900 text-white hover:bg-navy-800",
  success: "bg-leaf-600 text-white hover:bg-leaf-700",
  outline: "border border-slate-300 bg-white text-navy-900 hover:bg-slate-50",
  ghost: "text-slate-600 hover:text-navy-950",
} as const;

const sizes = {
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6",
} as const;

const shapes = {
  rounded: "rounded-xl",
  pill: "rounded-full",
} as const;

export type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  shape?: keyof typeof shapes;
};

export function buttonStyles({ variant = "primary", size = "lg", shape = "rounded" }: ButtonStyleProps = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
    variants[variant], sizes[size], shapes[shape],
  );
}

export function Button({ variant, size, shape, className, type = "button", ...props }: ButtonStyleProps & ComponentProps<"button">) {
  return <button type={type} className={cn(buttonStyles({ variant, size, shape }), className)} {...props} />;
}

export function ButtonLink({ variant, size, shape, className, ...props }: ButtonStyleProps & ComponentProps<typeof Link>) {
  return <Link className={cn(buttonStyles({ variant, size, shape }), className)} {...props} />;
}
