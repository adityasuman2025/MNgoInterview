import { memo, useCallback } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/context/ToastContext";
import Button, { BUTTON_VARIANTS } from "@/components/shared/Button";
import type { UserType, AuthResponse } from "@/apis/types";

interface GoogleButtonProps {
    onSuccess?: (token: string, user: UserType) => void;
    mutationFunction: (data: { idToken: string }) => Promise<AuthResponse>;
}
function GoogleButton({ onSuccess, mutationFunction }: GoogleButtonProps) {
    const toast = useToast();

    const googleMutation = useMutation({
        mutationFn: mutationFunction,
        onSuccess: (resp) => {
            const { token, user } = resp?.data || {};
            if (token) onSuccess?.(token, user);
            else toast.error("Token is missing in Google auth response");
        },
        onError: (err: Error) => toast.error(err.message || "Google authentication failed"),
    });

    const handleGoogleSuccess = useCallback((credentialResponse: CredentialResponse) => {
        const idToken = credentialResponse.credential;
        if (idToken) googleMutation.mutate({ idToken });
        else toast.error("Google ID token not received");
    }, [googleMutation, toast]);

    const handleGoogleError = useCallback(() => {
        toast.error("Google login failed");
    }, [toast]);

    return (
        <div className="w-full flex items-center justify-center min-h-[40px]">
            {googleMutation.isPending ? (
                <Button
                    type="button"
                    variant={BUTTON_VARIANTS.SECONDARY}
                    loading={true}
                    disabled={true}
                    className="w-full flex items-center justify-center"
                >
                    Signing in...
                </Button>
            ) : (
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap={false}
                    shape="pill"
                    text="continue_with"
                    width="100%"
                />
            )}
        </div>
    );
}

export default memo(GoogleButton);
