import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-[#1A1C1C] hover:bg-[#D4D4D4] active:scale-[0.98] transition-all",
  secondary:
    "bg-transparent border border-white/20 text-white hover:border-white/40 active:scale-[0.98] transition-all",
  tertiary:
    "bg-transparent text-white hover:opacity-70 transition-all",
};

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`text-[10px] tracking-[0.2em] uppercase font-body px-8 py-3 font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
