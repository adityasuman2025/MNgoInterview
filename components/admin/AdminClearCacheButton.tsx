"use client";

import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/shared/Button";
import { useToast } from "@/context/ToastContext";
import { clearRedisCacheApi } from "@/apis/admin";

export default function AdminClearCacheButton() {
    const toast = useToast();

    const clearCacheMutation = useMutation({
        mutationFn: clearRedisCacheApi,
        onSuccess: (resp) => toast.success(resp?.message || "Redis cache cleared successfully!"),
        onError: (err) => toast.error(err.message || "Failed to clear Redis cache")
    });

    return (
        <Button
            type="button"
            variant="SECONDARY"
            onClick={() => clearCacheMutation.mutate({})}
            loading={clearCacheMutation.isPending}
            className="flex text-rose-500 border border-rose-500/30 hover:bg-rose-500/10"
        >
            <Trash2 className="w-5 h-5 mr-2" />
            Clear Redis Cache
        </Button>
    );
}
