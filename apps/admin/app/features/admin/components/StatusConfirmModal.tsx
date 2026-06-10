import React from 'react';
import { AlertCircle } from 'lucide-react';

type Status = 'published' | 'draft' | 'archived';

interface StatusConfirmModalProps {
    isOpen: boolean;
    currentStatus: Status;
    newStatus: Status;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function StatusConfirmModal({
    isOpen,
    currentStatus,
    newStatus,
    onConfirm,
    onCancel,
    isLoading = false,
}: StatusConfirmModalProps) {
    if (!isOpen) return null;

    const messages = {
        published: 'This blog will be visible to everyone.',
        draft: 'This blog will be saved as a draft and not visible.',
        archived: 'This blog will be archived and hidden.',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-card rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
                <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h2 className="text-lg font-semibold text-card-foreground">
                            Change Status to {newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}?
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {messages[newStatus]}
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Updating...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}
