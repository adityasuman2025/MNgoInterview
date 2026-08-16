import { memo, type ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`w-full h-11 rounded-lg px-3 bg-ternary text-ternary-content ${className}`}
            {...props}
        />
    );
}

export default memo(Input);
