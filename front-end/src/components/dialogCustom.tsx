import React from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

type DialogCustomProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    children?: React.ReactNode;
}

export function DialogCustom({ isOpen, onOpenChange, title, children }: DialogCustomProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {
                        children
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
