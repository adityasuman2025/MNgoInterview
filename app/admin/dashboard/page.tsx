"use client";

import { type ChangeEvent, useRef } from "react";
import { Upload } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import AdminAuth from "@/hocs/AdminAuth";
import Button from "@/components/Button";
import { useToast } from "@/context/Toast";
import { uploadHTMLFileAPI } from "@/apis/admin";

function AdminDashboard() {
    const toast = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadMutation = useMutation({
        mutationFn: uploadHTMLFileAPI,
        onSuccess: (resp) => toast.success(resp?.message || "File uploaded successfully!"),
        onError: (err) => toast.error(err.message || "Failed to upload file")
    });

    function handleButtonClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) {
            e.target.value = "";
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        uploadMutation.mutate(formData);
        e.target.value = "";
    }

    return (
        <main className="flex min-h-screen items-center justify-center">
            <input
                ref={fileInputRef}
                type="file"
                accept=".html,text/html"
                className="hidden"
                onChange={handleFileChange}
            />
            <div className="w-48 md:w-64">
                <Button
                    type="button"
                    onClick={handleButtonClick}
                    loading={uploadMutation.isPending}
                    className="flex"
                >
                    <Upload className="w-5 h-5 mr-2" />
                    upload .html file
                </Button>
            </div>
        </main>
    );
}

export default function Page() {
    return (
        <AdminAuth>
            <AdminDashboard />
        </AdminAuth>
    );
}
