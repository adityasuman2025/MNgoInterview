"use client";

import { type ChangeEvent, useRef } from "react";
import { Upload } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/shared/Button";
import { useToast } from "@/context/ToastContext";
import { uploadHTMLFileAPI } from "@/apis/admin";

export default function AdminUploadDataForm() {
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

        <div className="w-48 md:w-64">
            <input ref={fileInputRef} type="file" accept=".html,text/html" className="hidden" onChange={handleFileChange} />

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

    );
}
