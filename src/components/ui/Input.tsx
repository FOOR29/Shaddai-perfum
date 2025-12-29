"use client";

import type { InputHTMLAttributes } from "react";

// Tipado simple
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    variant?: "default" | "underline";
};

const baseStyles = "w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DAD8D6] focus:border-[#DAD8D6] transition";

const underlineStyles =
    "w-full border-b border-neutral-400 rounded-none px-1 py-2 bg-transparent focus:border-[#DAD8D6]";

const Input = ({ label, error, variant = "default", className = "", ...props }: InputProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}

            <input
                className={`${variant === "default" ? baseStyles : underlineStyles} ${className}`}
                {...props}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
