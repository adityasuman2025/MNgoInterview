import { memo, useState, type SubmitEvent } from "react";
import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import Modal from "./shared/Modal";
import Button, { BUTTON_VARIANTS } from "./shared/Button";
import Input from "./shared/Input";
import GoogleButton from "./shared/GoogleButton";
import { useToast } from "@/context/ToastContext";
import { userLoginApi, userSignupApi } from "@/apis/user";
import type { UserType } from "@/apis/user";

type AuthTab = "LOGIN" | "SIGNUP";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess?: (token: string, user: UserType) => void;
}
function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
    const [activeTab, setActiveTab] = useState<AuthTab>("LOGIN");
    const toast = useToast();

    const loginMutation = useMutation({
        mutationFn: userLoginApi,
        onSuccess: (resp) => {
            const { token, user } = resp?.data || {};
            if (token) {
                onLoginSuccess?.(token, user);
                toast.success("Logged in successfully");
                onClose();
            } else {
                toast.error("Token is missing in response");
            }
        },
        onError: (err: Error) => toast.error(err.message),
    });

    const signupMutation = useMutation({
        mutationFn: userSignupApi,
        onSuccess: (resp) => {
            const { token, user } = resp?.data || {};
            if (token) {
                onLoginSuccess?.(token, user);
                toast.success("Account created successfully");
                onClose();
            } else {
                toast.success("Account created! Please log in.");
                setActiveTab("LOGIN");
            }
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

    function handleGoogleLogin() {
        console.log("Continue with Google clicked");
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.ModalHeader>
                <div className="grid grid-cols-2 gap-2 p-1 bg-ternary rounded-xl mb-4">
                    <Button
                        type="button"
                        variant={BUTTON_VARIANTS.SECONDARY}
                        onClick={() => setActiveTab("LOGIN")}
                        className={`w-full py-2 font-semibold text-sm transition-all ${activeTab === "LOGIN"
                            ? "!bg-secondary !text-secondary-content shadow-sm"
                            : "!bg-transparent text-secondary-content/60 hover:text-secondary-content"
                            }`}
                    >
                        Login
                    </Button>
                    <Button
                        type="button"
                        variant={BUTTON_VARIANTS.SECONDARY}
                        onClick={() => setActiveTab("SIGNUP")}
                        className={`w-full py-2 font-semibold text-sm transition-all ${activeTab === "SIGNUP"
                            ? "!bg-secondary !text-secondary-content shadow-sm"
                            : "!bg-transparent text-secondary-content/60 hover:text-secondary-content"
                            }`}
                    >
                        Sign Up
                    </Button>
                </div>
            </Modal.ModalHeader>

            <Modal.ModalBody>
                {activeTab === "LOGIN" ? (
                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                        <Input name="email" type="text" placeholder="Email" autoFocus required />
                        <Input name="password" type="password" placeholder="Password" required />

                        <Button type="submit" loading={loginMutation.isPending} className="w-full mt-2">
                            Login
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                        <Input name="name" type="text" placeholder="Full Name" autoFocus required />
                        <Input name="email" type="text" placeholder="Email" required />
                        <Input name="password" type="password" placeholder="Password" required />
                        <Input name="confirmPassword" type="password" placeholder="Confirm Password" required />

                        <Button type="submit" loading={signupMutation.isPending} className="w-full mt-2">
                            Sign Up
                        </Button>
                    </form>
                )}

                <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-base-3" />
                    <span className="text-xs uppercase text-secondary-content/50 font-medium">or</span>
                    <div className="flex-1 h-px bg-base-3" />
                </div>

                <GoogleButton onClick={handleGoogleLogin} />
            </Modal.ModalBody>
        </Modal>
    );
}

export default memo(LoginModal);