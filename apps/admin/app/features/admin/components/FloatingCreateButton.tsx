import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingCreateButtonProps {
    onClick: () => void;
}

const FloatingCreateButton: React.FC<FloatingCreateButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-40"
            aria-label="Create new blog"
        >
            <Plus size={24} />
        </button>
    );
};

export default FloatingCreateButton;
