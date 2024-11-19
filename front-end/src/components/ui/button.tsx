import React from "react";

interface ButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center w-48 h-48 rounded-md bg-zinc-100"
        >
            <span className="fixed items-center justify-center text-lg">{icon}</span>
            <span className="text-1xl mt-24">{label}</span>
        </button>
    );
};

export default Button;
