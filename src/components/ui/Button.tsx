import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
};

const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles = {
    primary: "bg-cta text-cta-text hover:bg-cta-hover",
    secondary: "bg-disponible text-white hover:bg-disponible-text",
    outline: "border border-borde text-titular hover:bg-fondo",
};

const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
};

const Button = ({
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    className = "",
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
