import { memo, type ComponentProps } from "react";
import { Loader2 } from "lucide-react";

export const BUTTON_VARIANTS = {
    PRIMARY: "PRIMARY",
    SECONDARY: "SECONDARY",
    TERNARY: "TERNARY",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;

const variantStyles: Record<ButtonVariant, string> = {
    [BUTTON_VARIANTS.PRIMARY]: "bg-primary text-primary-content",
    [BUTTON_VARIANTS.SECONDARY]: "bg-secondary text-secondary-content",
    [BUTTON_VARIANTS.TERNARY]: "bg-ternary text-ternary-content",
};

interface ButtonProps extends ComponentProps<"button"> {
    variant?: ButtonVariant;
    loading?: boolean;
}
function Button({
    variant = BUTTON_VARIANTS.PRIMARY,
    loading = false,
    disabled = false,
    type = "submit",
    children,
    className = "",
    ...props
}: ButtonProps) {
    const isDisabled = Boolean(disabled || loading);

    return (
        <button
            tabIndex={0}
            type={type}
            disabled={isDisabled}
            className={`w-fit h-fit rounded-lg px-4 py-2 flex text-sm items-center justify-center gap-2 font-medium cursor-pointer transition-colors hover:brightness-90 active:brightness-75 disabled:opacity-40 disabled:pointer-events-none ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            <>{children}</>
        </button>
    );
}

export default memo(Button);