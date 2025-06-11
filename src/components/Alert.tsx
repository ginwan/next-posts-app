import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

type AlertDemoProps = {
    type: "success" | "error";
    title?: string;
    message: string;
};

export function AlertDemo({ type, title, message }: AlertDemoProps) {
    const icon = type === "success" ? (
        <CheckCircle2Icon className="text-green-600" />
    ) : (
        <XCircleIcon className="text-red-600" />
    );

    const colorClass = type === "success" ? "text-green-600" : "text-red-600";

    return (
        <div className="grid w-full max-w-xl items-start gap-4 top-10 right-10 absolute">
            <Alert className={colorClass}>
                {icon}
                <AlertTitle>{title || (type === "success" ? "Success!" : "Error!")}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        </div>
    );
}
