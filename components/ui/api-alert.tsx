"use client";
import toast from "react-hot-toast";
import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlerProps {
    title: string;
    description: string;
    variant: "public" | "admin";
}

const textMap: Record<ApiAlerProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
};
const variantMap: Record<ApiAlerProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
};

export const ApiAlert = ({
    title,
    description,
    variant = "public",
}: ApiAlerProps) => {
    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description);
        toast.success("API route copied to clipboard");
    };
    return (
        <Alert>
            <Server className=" h-4 w-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>

            <AlertDescription className="F-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onCopy(description)}
                >
                    <Copy />
                </Button>
            </AlertDescription>
        </Alert>
    );
};
