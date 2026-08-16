import { type ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export default function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`w-full h-11 rounded-lg px-3 bg-ternary text-ternary-content ${className}`}
            {...props}
        />
    );
}
