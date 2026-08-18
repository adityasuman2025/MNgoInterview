import { memo, type SubmitEvent } from "react";
import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import Modal from "@/components/shared/Modal";
import Button, { BUTTON_VARIANTS } from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Tabs from "@/components/shared/Tabs";
import GoogleButton from "@/components/shared/GoogleButton";
import { useToast } from "@/context/ToastContext";
import { userLoginApi, userSignupApi, googleAuthApi } from "@/apis/user";
import type { UserType } from "@/apis/types";

const AUTH_TABS = {
    LOGIN: "LOGIN",
    SIGNUP: "SIGNUP",
} as const;

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess?: (token: string, user: UserType) => void;
}
function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
    const toast = useToast();

    const loginMutation = useMutation({
        mutationFn: userLoginApi,
        onSuccess: (resp) => {
            const { token, user } = resp?.data || {};
            if (token) handleLoginSuccess(token, user)
            else toast.error("Token is missing in response");
        },
        onError: (err: Error) => toast.error(err.message),
    });

    const signupMutation = useMutation({
        mutationFn: userSignupApi,
        onSuccess: (resp) => {
            const { token, user } = resp?.data || {};
            if (token) handleLoginSuccess(token, user)
            else toast.success("Account created! Please log in.");
        },
        onError: (err: Error) => toast.error(err.message),
    });

    function handleLoginSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = (formData.get("email") as string)?.trim();
        const password = (formData.get("password") as string)?.trim();

        if (!email || !password) return toast.error("Please enter email and password");
        if (!validator.isEmail(email)) return toast.error("Please enter a valid email");

        loginMutation.mutate({ email, password });
    }

    function handleSignupSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = (formData.get("name") as string)?.trim();
        const email = (formData.get("email") as string)?.trim();
        const password = (formData.get("password") as string)?.trim();
        const confirmPassword = (formData.get("confirmPassword") as string)?.trim();

        if (!name || !email || !password || !confirmPassword) return toast.error("Please fill in all fields");
        if (!validator.isEmail(email)) return toast.error("Please enter a valid email");
        if (password !== confirmPassword) return toast.error("Passwords do not match");

        signupMutation.mutate({ name, email, password });
    }

    function handleLoginSuccess(token: string, user: UserType) {
        onLoginSuccess?.(token, user);
        toast.success("logged in successfully");
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Tabs defaultTabId={AUTH_TABS.LOGIN}>
                <Modal.Header>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-ternary rounded-xl mb-4">
                        <Tabs.Tab id={AUTH_TABS.LOGIN}>
                            {(isActive) => (
                                <Button
                                    variant={BUTTON_VARIANTS.SECONDARY}
                                    className={`w-full py-2 font-semibold text-sm transition-all ${isActive
                                        ? "!bg-secondary !text-secondary-content shadow-sm"
                                        : "!bg-transparent text-secondary-content/60 hover:text-secondary-content"
                                        }`}
                                >
                                    Login
                                </Button>
                            )}
                        </Tabs.Tab>
                        <Tabs.Tab id={AUTH_TABS.SIGNUP}>
                            {(isActive) => (
                                <Button
                                    variant={BUTTON_VARIANTS.SECONDARY}
                                    className={`w-full py-2 font-semibold text-sm transition-all ${isActive
                                        ? "!bg-secondary !text-secondary-content shadow-sm"
                                        : "!bg-transparent text-secondary-content/60 hover:text-secondary-content"
                                        }`}
                                >
                                    Sign Up
                                </Button>
                            )}
                        </Tabs.Tab>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <Tabs.Panel tabId={AUTH_TABS.LOGIN}>
                        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                            <Input name="email" type="text" placeholder="Email" autoFocus required />
                            <Input name="password" type="password" placeholder="Password" required />

                            <Button type="submit" loading={loginMutation.isPending} className="w-full mt-2">
                                Login
                            </Button>
                        </form>
                    </Tabs.Panel>

                    <Tabs.Panel tabId={AUTH_TABS.SIGNUP}>
                        <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                            <Input name="name" type="text" placeholder="Full Name" autoFocus required />
                            <Input name="email" type="text" placeholder="Email" required />
                            <Input name="password" type="password" placeholder="Password" required />
                            <Input name="confirmPassword" type="password" placeholder="Confirm Password" required />

                            <Button type="submit" loading={signupMutation.isPending} className="w-full mt-2">
                                Sign Up
                            </Button>
                        </form>
                    </Tabs.Panel>

                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-base-3" />
                        <span className="text-xs uppercase text-secondary-content/50 font-medium">or</span>
                        <div className="flex-1 h-px bg-base-3" />
                    </div>

                    <GoogleButton mutationFunction={googleAuthApi} onSuccess={handleLoginSuccess} />
                </Modal.Body>
            </Tabs>
        </Modal>
    );
}

export default memo(LoginModal);