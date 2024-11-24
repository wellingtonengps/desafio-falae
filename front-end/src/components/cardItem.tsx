import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Substitua pelos seus componentes Dialog

interface CardItemProps {
    id: number;
    name: string;
    category: string;
    price: number;
    description?: string;
    imageUrl?: string;
    onQuantityChange: (quantity: number) => void;
}

export function CardItem({ name, category, price, description, imageUrl, onQuantityChange }: CardItemProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);


    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };


    return (
        <>
            <div
                className="border rounded-lg p-4 shadow-md flex flex-col h-[200px] w-[180px] items-center hover:shadow-lg transition cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-32 h-32 object-cover rounded-md"
                    />
                ) : (
                    <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-md">
                        <span className="text-gray-500 text-2xl">📦</span>
                    </div>
                )}
                <h3 className="mt-2 text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-600">{category}</p>
                <p className="text-sm font-bold text-green-600">R$ {price.toFixed(2)}</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-[300px] max-h-[500px]">
                    <div className="flex flex-col items-center">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={name}
                                className="w-64 h-64 object-cover rounded-md"
                            />
                        ) : (
                            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-md">
                                <span className="text-gray-500 text-4xl">📦</span>
                            </div>
                        )}
                        <h2 className="mt-4 text-xl font-bold">{name}</h2>
                        <p className="text-sm text-gray-500 mb-2">{category}</p>
                        <p className="text-base text-gray-700 text-center px-4">{description}</p>
                        <p className="mt-4 text-lg font-bold text-green-600">
                            Preço: R$ {price.toFixed(2)}
                        </p>

                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                                className="px-3 py-1 bg-red rounded-md hover:bg-gray-300"
                            >
                                -
                            </button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(quantity + 1)}
                                className="px-3 py-1 bg-red rounded-md hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => setIsDialogOpen(false)}
                            className="mt-6 bg-green text-black w-40 px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                           Escolher
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
